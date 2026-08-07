"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const benefits = [
    "55 готових тем",
    "Логіка прийняття рішення клієнтом",
    "Практичні рекомендації для створення контенту",
  ];

  return (
    <section className="relative bg-bg-main text-text-primary h-[100dvh] overflow-hidden w-full">
      {/* Background Image with soft radial light for text contrast */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/hero_bg.jpg"
          alt="Естетичний фон кабінету"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-bottom"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_75%)]" />
      </div>

      {/* Текстовий блок - жорстко зафіксований у верхній зоні екрану */}
      <div className="absolute top-[15%] sm:top-[12%] md:top-[8%] lg:top-[12%] left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4 text-center flex flex-col items-center">

        {/* Кетч-фраза / Бейдж */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(10px,1.5vmin,14px)] font-bold text-black uppercase tracking-wider mb-2 md:mb-3 transform -translate-y-[15%]"
        >
          Практичний посібник для психологів, психотерапевтів і коучів
        </motion.div>

        {/* Новий єдиний заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(1.75rem,5.5vmin,3.75rem)] font-black tracking-tight mb-3 md:mb-4 leading-[1.1] text-black transform translate-y-[85%] sm:translate-y-[5%]"
        >
          Як вести блог зрозуміло, етично та без маніпуляцій
        </motion.h1>

        {/* Підзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[clamp(0.875rem,2vmin,1.25rem)] text-black font-semibold max-w-2xl mb-4 leading-[1.4] transform translate-y-[95%] sm:translate-y-0"
        >
          Створюйте контент, у якому потенційні клієнти впізнаватимуть себе та формуватимуть довіру до вашої практики.
        </motion.p>

      </div>

      {/* Ціна + Переваги + Кнопка (Об'єднані в одну плашку) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-md sm:max-w-xl md:max-w-2xl bg-white/15 backdrop-blur-md p-4 md:p-5 rounded-3xl border border-white/20 shadow-xl flex flex-col gap-3 md:gap-4"
      >
        {/* Рядок переваг (Буліти) */}
        <div className="flex flex-col gap-2.5 items-start w-full px-2 sm:px-4">
          {benefits.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-black text-left">{item}</span>
            </div>
          ))}
        </div>

        {/* Тонкий роздільник */}
        <div className="w-full border-t border-white/20" />

        {/* Рядок дії (Ціна + Кнопка) */}
        <div className="flex flex-row items-center justify-between sm:justify-center gap-4 sm:gap-12 w-full px-2 sm:px-4">
          <div className="text-left">
            <span className="text-[10px] sm:text-xs text-black/60 block font-medium">Вартість</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-black">9 $</span>
          </div>

          <button className="bg-accent hover:bg-accent-hover text-white font-bold text-[11px] sm:text-sm px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] shrink-0">
            Отримати посібник
          </button>
        </div>
      </motion.div>
    </section>
  );
}