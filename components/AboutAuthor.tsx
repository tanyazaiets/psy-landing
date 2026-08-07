"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserCheck } from "lucide-react";

export default function AboutAuthor() {
  return (
    <section className="bg-bg-main text-text-primary py-12 md:py-20 px-4 border-t border-accent/10">
      <div className="max-w-4xl mx-auto">
        
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
            Про авторку
          </h2>
        </motion.div>

        {/* Картка про авторку */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card p-6 sm:p-8 rounded-2xl border border-sage/20 flex flex-col md:flex-row gap-6 md:gap-8 items-center shadow-sm"
        >
          {/* Фото авторки */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden border-2 border-sage/20 shadow-md">
            <Image
              src="/author.jpg"
              alt="Тетяна — контент-стратег"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 224px"
            />
          </div>

          {/* Текст */}
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                Мене звати Тетяна
              </h3>
              <p className="text-sm sm:text-base text-accent font-medium mt-1 flex items-center justify-center md:justify-start gap-1.5">
                <UserCheck className="w-4 h-4" />
                Контент-стратег для психологів і допомагаючих спеціалістів
              </p>
            </div>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Моя психологічна освіта допомагає мені дивитися на блог не лише як маркетолог, а й розуміти, як людина приймає рішення, що викликає довіру та чому навіть хороший спеціаліст може залишатися непомітним у соцмережах.
            </p>

            <p className="text-sm sm:text-base text-text-primary font-medium leading-relaxed pt-1">
              Саме тому я створила цей посібник — щоб показати логіку, яка допомагає будувати контент без тиску, маніпуляцій і виснаження.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}