import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Політика конфіденційності — Практичний посібник для психологів",
  description: "Політика конфіденційності та захисту персональних даних користувачів",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-main text-text-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Кнопка повернення */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          На головну
        </Link>

        {/* Шапка сторінки */}
        <header className="border-b border-sage/20 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-2">
            Політика конфіденційності
          </h1>
          <p className="text-sm text-text-secondary">
            Правила обробки та захисту персональних даних користувачів сайту
          </p>
        </header>

        {/* Контент політики */}
        <article className="bg-bg-card p-6 sm:p-8 rounded-3xl border border-sage/20 shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-text-primary">
          
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-black">1. Загальні положення</h2>
            <p>
              Ця Політика конфіденційності визначає порядок отримання, зберігання, обробки та захисту персональних даних користувачів (далі — «Користувач»), які залишають свої дані під час оформлення замовлення або використання сайту.
            </p>
            <p>
              Ми з повагою ставимося до конфіденційної інформації будь-якої особи, яка відвідує наш сайт, та забезпечуємо захист даних відповідно до Закону України «Про захист персональних даних» та стандартів GDPR.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-black">2. Які дані ми збираємо</h2>
            <p>
              Під час оформлення замовлення та оплати цифрового посібника ми можемо збирати наступну інформацію:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ім&apos;я та прізвище Користувача;</li>
              <li>Адресу електронної пошти (email);</li>
              <li>Контактний номер телефону (за наявності);</li>
              <li>Технічні дані (Cookies, IP-адресу, тип браузера та пристрою).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-black">3. Мета збору та обробки даних</h2>
            <p>
              Персональні дані Користувача використовуються виключно для:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Обробки замовлення та автоматичного надіслання електронного матеріалу;</li>
              <li>Зворотного зв&apos;язку та підтримки Покупця у разі виникнення питань;</li>
              <li>Покращення якості сервісу та аналізу роботи сайту.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-black">4. Захист та передача даних третім особам</h2>
            <p>
              4.1. Ми вживаємо всіх необхідних технічних та організаційних заходів для захисту персональних даних від несанкціонованого доступу, зміни або знищення.
            </p>
            <p>
              4.2. Ми не передаємо персональні дані третім особам, за винятком випадків, коли це необхідно для виконання замовлення (платіжним системам для здійснення транзакції) або за вимогами законодавства України.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-black">5. Файли Cookies</h2>
            <p>
              Наш сайт може використовувати файли cookies для покращення роботи та аналітики. Користувач може відключити збереження cookies у налаштуваннях свого браузера в будь-який час.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-black">6. Права Користувача</h2>
            <p>
              Користувач має право отримати інформацію про свої персональні дані, звернутися з проханням про їх зміну або повне видалення з бази даних, звернувшись через доступні канали зв&apos;язку.
            </p>
          </section>

        </article>

      </div>
    </main>
  );
}
