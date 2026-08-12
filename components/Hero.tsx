"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const benefits = [
    "55 готових тем.",
    "Логіка прийняття рішення клієнтом.",
    "Практичні рекомендації для створення контенту.",
  ];

  return (
    <section className="relative bg-bg-main text-text-primary h-[100dvh] overflow-hidden w-full">
      {/* Background Image with soft radial light for text contrast */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/hero-bg.jpg"
          alt="Кабінет психолога - фон для практичного посібника з ведення блогу"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left-bottom sm:object-right-bottom"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_75%)]" />
        {/* Плавний градієнтний перехід від фонового фото до бежевого фону сайту */}
        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-56 bg-gradient-to-b from-transparent via-bg-main/60 to-bg-main" />
      </div>

      {/* Текстовий блок - Перший рядок вгорі, Заголовок на місці, Підзаголовок по центру між заголовком і плашкою */}
      <div className="absolute top-[11dvh] sm:top-10 md:top-12 bottom-[230px] sm:bottom-[245px] md:bottom-[265px] left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4 text-center flex flex-col items-center">

        {/* Кетч-фраза / Бейдж (Перший рядок) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(10px,1.5vmin,14px)] font-bold text-black uppercase tracking-wider shrink-0"
        >
          Практичний посібник для психологів, психотерапевтів і коучів
        </motion.div>

        {/* Заголовок (Фіксований на своєму комфортному місці) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 sm:mt-8 md:mt-10 text-[clamp(2.25rem,7.5vmin,4.5rem)] font-bold tracking-wide leading-[1.05] text-black max-w-3xl shrink-0"
        >
          Як вести блог зрозуміло, етично та без маніпуляцій
        </motion.h1>

        {/* Третій рядок (Відцентрований по центру в просторі між заголовком і плашкою кнопки) */}
        <div className="my-auto flex items-center justify-center py-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(0.875rem,2vmin,1.25rem)] text-black font-semibold max-w-2xl leading-[1.4] px-6 sm:px-0"
          >
            Створюйте контент, у якому потенційні клієнти впізнаватимуть себе та формуватимуть довіру до вашої практики.
          </motion.p>
        </div>

      </div>

      {/* Ціна + Переваги + Кнопка (Об'єднані в одну плашку) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-10 sm:bottom-12 md:bottom-14 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-md sm:max-w-xl md:max-w-2xl bg-white/15 backdrop-blur-md p-4 md:p-5 rounded-3xl border border-white/20 shadow-xl flex flex-col gap-3 md:gap-4"
      >
        {/* Рядок переваг (Буліти) */}
        <div className="flex flex-col gap-2.5 items-start w-full px-2 sm:px-4">
          {benefits.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-black text-left whitespace-normal break-words">{item}</span>
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

          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent hover:bg-accent-hover text-white font-bold text-[11px] sm:text-sm px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] shrink-0 cursor-pointer"
            aria-label="Перейти до форми отримання посібника"
          >
            Отримати посібник
          </button>
        </div>
      </motion.div>
    </section>
  );
}