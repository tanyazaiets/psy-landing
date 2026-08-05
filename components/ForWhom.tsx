"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ForWhom() {
  const points = [
    "не знаєте, про що писати;",
    "боїтеся виглядати нав’язливо;",
    "хочете, щоб блог будував довіру;",
    "не хочете маніпулювати болем людей;",
    "хочете, щоб контент відображав вашу професійність.",
  ];

  return (
    <section className="bg-bg-card text-text-primary py-12 md:py-20 px-4 border-y border-sage/10">
      <div className="max-w-3xl mx-auto">
        
        {/* Заголовок блоку */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Для кого цей посібник
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Він для вас, якщо ви:
          </p>
        </motion.div>

        {/* Список у вигляді карток (ідеально для скролу на смартфоні) */}
        <div className="space-y-3 sm:space-y-4">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-3.5 bg-bg-main p-4 sm:p-5 rounded-xl border border-sage/15 shadow-sm"
            >
              <div className="bg-sage/15 p-1 rounded-full shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-sage" />
              </div>
              <p className="text-sm sm:text-base text-text-primary leading-snug">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}