"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Hero() {
  const benefits = [
    "55 готових тем",
    "Логіка прийняття рішення клієнтом",
    "Практичні рекомендації для створення контенту",
  ];

  return (
    <section className="bg-bg-main text-text-primary min-h-[90vh] flex items-center justify-center px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Кетч-фраза / Бейдж */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-bg-card border border-sage/20 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium text-text-secondary mb-6"
        >
          Практичний посібник для психологів, психотерапевтів і коучів
        </motion.div>

        {/* Новий єдиний заголовок */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
        >
          Як вести блог зрозуміло, етично та без маніпуляцій
        </motion.h1>

        {/* Підзаголовок */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-xl text-text-secondary max-w-2xl mb-8 leading-relaxed"
        >
          Створюйте контент, у якому потенційні клієнти впізнаватимуть себе та формуватимуть довіру до вашої практики.
        </motion.p>

        {/* Переваги (Буліти) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-10 text-left sm:text-center"
        >
          {benefits.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-bg-card px-4 py-2.5 rounded-xl border border-sage/10">
              <CheckCircle2 className="w-5 h-5 text-sage shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Ціна + Кнопка */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 bg-bg-card p-4 sm:p-3 rounded-2xl border border-sage/20 shadow-sm"
        >
          <div className="px-4 text-center sm:text-left">
            <span className="text-xs text-text-secondary block">Вартість</span>
            <span className="text-3xl font-bold text-text-primary">9 $</span>
          </div>

          <button className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white font-medium px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]">
            Отримати посібник
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}