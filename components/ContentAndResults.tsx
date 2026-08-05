"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Sparkles } from "lucide-react";

export default function ContentAndResults() {
  const insideItems = [
    "Як людина приймає рішення звернутися до психолога",
    "Як знаходити теми через думки клієнта",
    "Як говорити про професійність",
    "Як розкривати свої цінності",
    "Як працювати з темами про тривогу, стосунки, самооцінку та терапію",
    "55 готових тем для контенту",
  ];

  const resultItems = [
    "Перестанете шукати теми навмання",
    "Зрозумієте, чому люди читають, але не записуються",
    "Навчитеся бачити блог очима клієнта",
    "Зможете створювати контент, який формує довіру",
  ];

  return (
    <section className="bg-bg-card text-text-primary py-12 md:py-20 px-4 border-t border-sage/10">
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
        
        {/* Блок 4: Що всередині */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-sage mb-2 block">
              Наповнення
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Що всередині
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {insideItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-bg-main p-4 sm:p-5 rounded-xl border border-sage/15 flex items-start gap-3.5 shadow-sm"
              >
                <div className="bg-sage/10 p-2 rounded-lg shrink-0 text-sage">
                  <BookOpen className="w-4 h-4" />
                </div>
                <p className="text-sm sm:text-base text-text-primary leading-snug pt-0.5">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Блок 5: Після прочитання ви */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-accent mb-2 block">
              Результат
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Після прочитання ви
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resultItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bg-main p-5 rounded-xl border border-sage/20 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 text-sage mb-3">
                
                  <span className="text-xs font-bold uppercase tracking-wider">Ефект #{index + 1}</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-text-primary leading-relaxed">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}