import { NextResponse } from "next/server";
import { ensurePollingStarted } from "../bot/route";

// Зберігаємо ordersStore у globalThis для збереження контексту при гарячому перезавантаженні Next.js
const globalForOrders = globalThis as unknown as {
  ordersStore?: Map<string, { name: string; phone: string; email: string; createdAt: Date; status: string }>;
};

export const ordersStore = globalForOrders.ordersStore || new Map<string, { name: string; phone: string; email: string; createdAt: Date; status: string }>();
globalForOrders.ordersStore = ordersStore;

export async function POST(request: Request) {
  try {
    ensurePollingStarted();
    const body = await request.json();
    const { name, phone, email } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Будь ласка, вкажіть ваше ім'я та телефон" },
        { status: 400 }
      );
    }

    // Генеруємо унікальний токен замовлення
    const orderId = `ord_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    
    // Зберігаємо замовлення
    ordersStore.set(orderId, {
      name,
      phone,
      email: email || "",
      createdAt: new Date(),
      status: "pending",
    });

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    // Відправляємо сповіщення в спільну Telegram-групу про створення замовлення
    if (botToken && adminChatId) {
      try {
        const safeName = name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safePhone = phone.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeEmail = (email || "не вказано").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const messageText = 
          `📥 <b>Нове замовлення на сайті!</b>\n\n` +
          `👤 <b>Ім'я:</b> ${safeName}\n` +
          `📞 <b>Телефон:</b> ${safePhone}\n` +
          `✉️ <b>Email:</b> ${safeEmail}\n\n` +
          `⏳ <b>Статус:</b> Клієнта перенаправлено в бота для оплати...`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: adminChatId,
            text: messageText,
            parse_mode: "HTML",
          }),
        });
      } catch (tgError) {
        console.error("Помилка відправки сповіщення в Telegram:", tgError);
      }
    }

    // Посилання на бота з глибоким параметром /start ord_xxx
    const botLink = `https://t.me/PsyBlogGuideTestBot?start=${orderId}`;

    return NextResponse.json({ success: true, botLink, orderId });
  } catch (error) {
    console.error("Помилка при створенні замовлення:", error);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}
