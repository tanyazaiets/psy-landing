"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, MessageCircle } from "lucide-react";

export default function PricingAndUpsell() {
  const upsellPoints = [
    "дослідити аудиторію;",
    "сформулювати позиціонування;",
    "створити офер;",
    "вибудувати систему контенту саме для вашої практики.",
  ];

  return (
    <section className="bg-bg-card text-text-primary py-12 md:py-20 px-4 border-t border-sage/10 space-y-16 md:space-y-24">
      <div className="max-w-3xl mx-auto space-y-16 md:space-y-20">
        
        {/* Блоки 7 та 8: Вартість та що буде після покупки */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-bg-main p-6 sm:p-10 rounded-3xl border border-sage/20 text-center shadow-sm relative overflow-hidden"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-sage mb-2 block">
            Швидкий старт
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Отримати практичний посібник
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mb-6">
            55 готових тем та логіка контенту без маніпуляцій
          </p>

          <div className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-6">
            9 $
          </div>

          <button className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white font-medium px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] mx-auto text-base sm:text-lg mb-6">
            👉 Отримати посібник
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Блок 8: Що буде після покупки */}
          <div className="bg-bg-card p-4 rounded-2xl border border-sage/15 flex items-center justify-center gap-3 text-left max-w-lg mx-auto">
            <Download className="w-5 h-5 text-sage shrink-0" />
            <p className="text-xs sm:text-sm text-text-secondary leading-snug">
              Одразу після оплати ви <strong className="text-text-primary font-medium">автоматично отримаєте PDF-файл</strong> і зможете користуватися ним у будь-який зручний час.
            </p>
          </div>
        </motion.div>

        {/* Блок 9: Якщо захочете більше (Апсейл) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-main p-6 sm:p-8 rounded-3xl border-2 border-accent/20 relative overflow-hidden shadow-sm"
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

          <button className="w-full sm:w-auto bg-bg-card hover:bg-sage/10 text-text-primary border border-sage/30 font-medium px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
            <MessageCircle className="w-4 h-4 text-sage" />
            Дізнатися про супровід
          </button>
        </motion.div>

      </div>
    </section>
  );
}