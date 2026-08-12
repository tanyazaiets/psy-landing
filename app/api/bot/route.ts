import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ordersStore } from "../order/route";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

// Унікальний ID поточного запуску модуля (запобігає дублюванню при гарячому перезавантаженні)
const RUN_ID = Math.random();

// Зберігаємо сесії користувачів у globalThis для стабільності
const globalForSessions = globalThis as unknown as {
  userSessions?: Map<number, { orderId?: string; name?: string; phone?: string; email?: string }>;
  processedUpdates?: Set<number>;
  processedCallbacks?: Set<string>;
  lastUpdateId?: number;
  currentRunId?: number;
};

export const userSessions = globalForSessions.userSessions || new Map<number, { orderId?: string; name?: string; phone?: string; email?: string }>();
globalForSessions.userSessions = userSessions;

const processedUpdates = globalForSessions.processedUpdates || new Set<number>();
globalForSessions.processedUpdates = processedUpdates;

const processedCallbacks = globalForSessions.processedCallbacks || new Set<string>();
globalForSessions.processedCallbacks = processedCallbacks;

let isPollingInThisInstance = false;

// Запуск Polling для локальної розробки
export function ensurePollingStarted() {
  if (!BOT_TOKEN) return;

  // Оновлюємо глобальний ID активного запуску
  globalForSessions.currentRunId = RUN_ID;

  // Якщо цей конкретний модуль вже запустив опитування, повторно не запускаємо
  if (isPollingInThisInstance) return;
  isPollingInThisInstance = true;

  (async () => {
    // При першому запуску зчитуємо останній оновлений ID, щоб не брати стару чергу
    try {
      const initRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=-1`);
      const initData = await initRes.json();
      if (initData.ok && Array.isArray(initData.result) && initData.result.length > 0) {
        globalForSessions.lastUpdateId = initData.result[0].update_id;
      }
    } catch (e) {
      console.error("Init update offset error:", e);
    }

    // Працює тільки найсвіжіший потік коду
    while (globalForSessions.currentRunId === RUN_ID) {
      try {
        const offset = (globalForSessions.lastUpdateId || 0) + 1;
        const response = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=5`
        );
        const data = await response.json();

        if (data.ok && Array.isArray(data.result)) {
          for (const update of data.result) {
            globalForSessions.lastUpdateId = update.update_id;
            if (!processedUpdates.has(update.update_id)) {
              processedUpdates.add(update.update_id);
              await handleTelegramUpdate(update);
            }
          }
        }
      } catch {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  })();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleTelegramUpdate(update: any) {
  try {
    // 1. Обробка повідомлень від покупців
    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const chatType = msg.chat.type;
      const text = msg.text || "";

      if (chatType !== "private") {
        return;
      }

      // /start або /start ord_xxx
      if (text.startsWith("/start")) {
        const parts = text.split(" ");
        const orderId = parts[1];

        const orderData = orderId ? ordersStore.get(orderId) : null;

        if (orderData) {
          userSessions.set(chatId, {
            orderId,
            name: orderData.name,
            phone: orderData.phone,
            email: orderData.email,
          });
        }

        // Привітання бота беремо ЛИШЕ з профілю Telegram (або просто "Вітаю!")
        const tgName = msg.from?.first_name ? escapeHtml(msg.from.first_name) : "";
        const greetingLine = tgName ? `<b>Вітаю, ${tgName}!</b>\n\n` : `<b>Вітаю!</b>\n\n`;

        // Видаляємо кнопки зі всіх старих повідомлень у цьому чаті (5 останніх)
        // щоб не лишалась «приведена» кнопка «Надіслати квитанцію» від попередніх версій бота
        try {
          await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=-1&allowed_updates=["message"]`
          );
        } catch { }

        const usdRate = await getUsdToUahRate();
        // Рахуємо суму в грн: 9 USD * курс і округлюємо до найближчої гривні
        const uahPrice = Math.round(9 * usdRate);

        const welcomeText =
          greetingLine +
          `Дякуємо за замовлення <b>Практичного посібника для психологів</b>.\n\n` +
          `💳 <b>Реквізити для оплати (9 $ / ${uahPrice} грн):</b>\n` +
          `• <b>Картка:</b> <code>4323407004609409</code>\n` +
          `• <b>Отримувач:</b> Заєць В.М.\n` +
          `⚠️ <b>Важливо:</b> у призначенні платежу нічого не писати.\n` +
          `<i>(натисніть на номер картки, щоб скопіювати)</i>\n\n\n\n` +
          `📍 <b>Після здійснення переказу надішліть, будь ласка, скріншот або PDF-файл квитанції прямо сюди у чат 👇</b>`;

        const welcomeKeyboard = {
          inline_keyboard: [
            [
              { text: "💬 Задати питання", url: "https://t.me/TanyaaZaec" }
            ]
          ]
        };

        await sendTelegramMessage(chatId, welcomeText, welcomeKeyboard);
        return;
      }

      // Квитанція (фото чи файл)
      if (msg.photo || msg.document) {

        await sendTelegramMessage(
          chatId,
          "<b>Дякуємо!</b> Квитанцію отримано та передано на перевірку.\nОчікуйте на підтвердження (зазвичай це займає 3–10 хвилин)."
        );

        const caption =
          `🧾 <b>НОВА КВИТАНЦІЯ ПРО ОПЛАТУ!</b>\n\n` +
          `Перевірте платіж у банкінгу та натисніть підтвердження 👇`;

        const keyboard = {
          inline_keyboard: [
            [
              { text: "✅ Підтвердити оплату", callback_data: `approve_${chatId}` },
              { text: "❌ Відхилити", callback_data: `reject_${chatId}` }
            ]
          ]
        };

        if (msg.photo) {
          const fileId = msg.photo[msg.photo.length - 1].file_id;
          await sendTelegramPhoto(ADMIN_CHAT_ID!, fileId, caption, keyboard);
        } else if (msg.document) {
          const fileId = msg.document.file_id;
          await sendTelegramDocument(ADMIN_CHAT_ID!, fileId, caption, keyboard);
        }

        return;
      }
    }

    // 2. Обробка натискання кнопок адміном (Callback Queries)
    if (update.callback_query) {
      const callback = update.callback_query;
      const callbackId = callback.id;

      if (processedCallbacks.has(callbackId)) {
        return;
      }
      processedCallbacks.add(callbackId);

      const data = callback.data || "";
      const adminName = callback.from?.first_name || "Адмін";

      if (data.startsWith("approve_")) {
        const buyerChatId = data.replace("approve_", "");

        await answerCallbackQuery(callback.id, "✅ Оплату підтверджено!");

        const originalCaption = callback.message?.caption || "";
        await editMessageCaption(
          callback.message.chat.id,
          callback.message.message_id,
          `${originalCaption}\n\n✅ <b>ОПЛАТУ ПІДТВЕРДЖЕНО (Адмін: ${escapeHtml(adminName)})</b>`
        );

        // Перевіряємо наявність файла Практичний посібник для психологів.pdf, posibnyk_psychology.pdf або guide.pdf у папці public
        const pdfFileNames = ["Практичний посібник для психологів.pdf", "posibnyk_psychology.pdf", "guide.pdf"];
        let foundPdfPath = "";

        for (const fileName of pdfFileNames) {
          const checkPath = path.join(process.cwd(), "public", fileName);
          if (fs.existsSync(checkPath)) {
            foundPdfPath = checkPath;
            break;
          }
        }

        if (foundPdfPath) {
          const fileBuffer = fs.readFileSync(foundPdfPath);
          const fileName = path.basename(foundPdfPath);
          const formData = new FormData();
          formData.append("chat_id", buyerChatId);
          formData.append("document", new Blob([fileBuffer], { type: "application/pdf" }), fileName);
          formData.append("caption", "🎉 <b>Оплату успішно підтверджено!</b>\n\nВаш «Практичний посібник для психологів» у прикріпленому файлі вище.\n\nБажаємо натхнення та приємного читання! ✨");
          formData.append("parse_mode", "HTML");

          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
            method: "POST",
            body: formData,
          });
        } else {
          const guideMessage =
            `🎉 <b>Оплату успішно підтверджено!</b>\n\n` +
            `Ваш «Практичний посібник для психологів» доступний за посиланням нижче:\n\n` +
            `📥 <a href="https://tanyazaiets.com.ua/%D0%9F%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%BD%D0%B8%D0%B9%20%D0%BF%D0%BE%D1%81%D1%96%D0%B1%D0%BD%D0%B8%D0%BA%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D0%B2.pdf">Завантажити посібник (PDF)</a>\n\n` +
            `Бажаємо натхнення та приємного читання! ✨`;

          await sendTelegramMessage(buyerChatId, guideMessage);
        }
        return;
      }

      if (data.startsWith("reject_")) {
        const buyerChatId = data.replace("reject_", "");

        await answerCallbackQuery(callback.id, "❌ Оплату відхилено.");

        const originalCaption = callback.message?.caption || "";
        await editMessageCaption(
          callback.message.chat.id,
          callback.message.message_id,
          `${originalCaption}\n\n❌ <b>ОПЛАТУ ВІДХИЛЕНО (Адмін: ${escapeHtml(adminName)})</b>`
        );

        const adminUsername = callback.from?.username;
        const contactUrl = adminUsername
          ? `https://t.me/${adminUsername.replace(/^@/, "")}`
          : "https://t.me/TanyaaZaec";

        const rejectKeyboard = {
          inline_keyboard: [
            [
              { text: "💬 Дізнатися причину", url: contactUrl }
            ]
          ]
        };

        await sendTelegramMessage(
          buyerChatId,
          "На жаль, платіж за квитанцією не знайдено. Будь ласка, перевірте деталі або зверніться до нас для уточнення.",
          rejectKeyboard
        );
        return;
      }
    }
  } catch (error) {
    console.error("Error handling update:", error);
  }
}

export async function GET() {
  ensurePollingStarted();
  return NextResponse.json({ ok: true, message: "Bot polling running..." });
}

export async function POST(request: Request) {
  try {
    const update = await request.json();
    await handleTelegramUpdate(update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Bot webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendTelegramMessage(chatId: string | number, text: string, keyboard?: any) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      reply_markup: keyboard,
    }),
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendTelegramPhoto(chatId: string | number, photoFileId: string, caption: string, keyboard?: any) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      photo: photoFileId,
      caption,
      parse_mode: "HTML",
      reply_markup: keyboard,
    }),
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendTelegramDocument(chatId: string | number, docFileId: string, caption: string, keyboard?: any) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      document: docFileId,
      caption,
      parse_mode: "HTML",
      reply_markup: keyboard,
    }),
  });
}

async function answerCallbackQuery(callbackQueryId: string, text: string) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  });
}

async function editMessageCaption(chatId: string | number, messageId: number, caption: string) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageCaption`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      caption,
      parse_mode: "HTML",
    }),
  });
}

// Кешування курсу валют
const globalForExchange = globalThis as unknown as {
  cachedRate?: { rate: number; timestamp: number };
};

async function getUsdToUahRate(): Promise<number> {
  const now = Date.now();
  // Кешуємо курс на 2 години (7200000 мс)
  if (globalForExchange.cachedRate && now - globalForExchange.cachedRate.timestamp < 7200000) {
    return globalForExchange.cachedRate.rate;
  }

  // Спробуємо спочатку стабільний ExchangeRate-API (не блокує хмарні IP-адреси)
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1500);

    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 7200 }
    });
    clearTimeout(id);

    if (res.ok) {
      const data = await res.json();
      if (data && data.result === "success" && data.rates?.UAH) {
        const rate = Number(data.rates.UAH);
        if (rate > 20 && rate < 100) {
          globalForExchange.cachedRate = { rate, timestamp: now };
          return rate;
        }
      }
    }
  } catch (err) {
    console.error("Помилка отримання курсу з ExchangeRate-API:", err);
  }

  // Якщо перший спосіб не вдався, спробуємо резервний НБУ (з User-Agent)
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1500);

    const res = await fetch("https://bank.gov.ua/NBUStatService/v1/statistcl/exchange?valcode=USD&json", {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 7200 }
    });
    clearTimeout(id);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.rate) {
        const rate = Number(data[0].rate);
        if (rate > 20 && rate < 100) {
          globalForExchange.cachedRate = { rate, timestamp: now };
          return rate;
        }
      }
    }
  } catch (err) {
    console.error("Помилка отримання курсу з НБУ:", err);
  }

  // Дефолтний курс (якщо обидва API недоступні або зависло)
  return globalForExchange.cachedRate?.rate || 44.87; // 9 * 44.87 = ~404 грн
}
