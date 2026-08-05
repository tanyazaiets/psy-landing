"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function WhyThisGuide() {
  return (
    <section className="bg-bg-main text-text-primary py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Чому цей посібник
          </h2>
        </motion.div>

        {/* Основна картка з акцентом */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card p-6 sm:p-8 rounded-2xl border border-sage/20 relative overflow-hidden shadow-sm"
        >
          {/* Декоративна іконка цитати */}
          <Quote className="w-12 h-12 text-sage/15 absolute top-4 right-4 pointer-events-none" />

          <div className="space-y-4 text-sm sm:text-base md:text-lg text-text-primary leading-relaxed">
            <p>
              Більшість психологів не мають проблем із професійністю. <span className="font-semibold text-accent block mt-1">Проблема в іншому.</span>
            </p>
            
            <p className="text-text-secondary">
              Людина не бачить вашої освіти, досвіду чи років практики. Вона відкриває профіль і за кілька секунд вирішує:
            </p>

            {/* Виділений блок з ключовим питанням */}
            <div className="bg-bg-main p-4 rounded-xl border-l-4 border-accent my-4 italic text-text-primary font-medium">
              «Мені близький цей спеціаліст чи ні?»
            </div>

            <p className="font-medium text-text-primary pt-2">
              Саме тому важливо не просто писати про психологію, а навчитися говорити мовою людини.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}