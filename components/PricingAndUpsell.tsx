"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, MessageCircle, Loader2 } from "lucide-react";

export default function PricingAndUpsell() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Будь ласка, заповніть ім'я та телефон");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });

      const data = await response.json();

      if (data.botLink) {
        // Відкриваємо посилання на бота і скидаємо стан лоадера
        window.open(data.botLink, "_blank");
        setTimeout(() => setLoading(false), 1500);
      } else {
        setError(data.error || "Помилка при створенні замовлення");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Помилка з'єднання. Спробуйте ще раз.");
      setLoading(false);
    }
  };

  const upsellPoints = [
    "дослідити аудиторію;",
    "сформулювати позиціонування;",
    "створити офер;",
    "вибудувати систему контенту саме для вашої практики.",
  ];

  return (
    <section id="pricing" className="bg-bg-main text-text-primary py-12 md:py-20 px-4 border-t border-accent/10 space-y-16 md:space-y-24">
      <div className="max-w-3xl mx-auto space-y-16 md:space-y-20">
        
        {/* Блоки 7 та 8: Вартість та Форма замовлення */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-bg-card p-6 sm:p-10 rounded-3xl border border-sage/20 shadow-sm relative overflow-hidden text-center"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-sage mb-2 block">
            Швидкий старт
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black mb-2">
            Отримати практичний посібник
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mb-6">
            55 готових тем та логіка контенту без маніпуляцій
          </p>

          <div className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-8">
            9 $
          </div>

          {/* Форма вводу даних замовника */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 text-left mb-8">
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5 ml-1">
                Ваше ім'я *
              </label>
              <input
                type="text"
                required
                placeholder="наприклад, Сергій"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bg-main border border-sage/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5 ml-1">
                Номер телефону *
              </label>
              <input
                type="tel"
                required
                placeholder="+380 (97) 000-00-00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-bg-main border border-sage/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5 ml-1">
                Електронна пошта (опціонально)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-main border border-sage/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 font-medium text-center pt-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] text-base sm:text-lg mt-6 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Переходимо в Telegram...
                </>
              ) : (
                <>
                  👉 Отримати посібник
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Блок 8: Пояснення про Telegram */}
          <div className="bg-bg-main p-4 rounded-2xl border border-sage/15 flex items-center justify-center gap-3 text-left max-w-lg mx-auto">
            <Download className="w-5 h-5 text-sage shrink-0" />
            <p className="text-xs sm:text-sm text-text-secondary leading-snug">
              Після натискання кнопки ви будете <strong className="text-text-primary font-medium">перенаправлені в Telegram</strong> для отримання реквізитів та файлу посібника.
            </p>
          </div>
        </motion.div>

        {/* Блок 9: Якщо захочете більше (Апсейл) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card p-6 sm:p-8 rounded-3xl border-2 border-accent/20 relative overflow-hidden shadow-sm"
        >
          <div className="flex items-center gap-2 text-accent mb-3">
            
            <span className="text-xs font-bold uppercase tracking-wider">Індивідуальний формат</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            Якщо захочете більше
          </h3>

          <p className="text-sm sm:text-base text-text-secondary mb-6 leading-relaxed">
            Цей посібник допоможе зрозуміти логіку створення контенту. А якщо після його прочитання ви захочете побудувати блог під свою спеціалізацію, я допоможу вам:
          </p>

          <ul className="space-y-2.5 mb-8">
            {upsellPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm sm:text-base text-text-primary">
                <span className="text-accent font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <button className="w-full sm:w-auto bg-bg-main hover:bg-sage/10 text-text-primary border border-sage/30 font-medium px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
            <MessageCircle className="w-4 h-4 text-sage" />
            Дізнатися про супровід
          </button>
        </motion.div>

      </div>
    </section>
  );
}