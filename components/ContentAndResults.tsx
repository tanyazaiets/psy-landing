"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 } 
    },
    hover: {
      x: 12,
      transition: { type: "spring" as const, stiffness: 200, damping: 20 }
    }
  };

  return (
    <>
      {/* Блок 4: Що всередині */}
      <section className="bg-bg-main text-text-primary py-12 md:py-20 px-4 border-t border-accent/10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
              Що всередині
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-2xl mx-auto flex flex-col"
          >
            {insideItems.map((item, index) => (
              <motion.div
                key={index}
                variants={rowVariants}
                whileHover="hover"
                className="group relative flex items-center gap-4 py-5 border-b border-accent/15 cursor-pointer pl-2"
              >
                {/* Горизонтальна риска (тире), яка видовжується при наведенні */}
                <motion.div 
                  variants={{
                    hidden: { width: 12, backgroundColor: "rgba(124, 83, 41, 0.4)" },
                    visible: { width: 12 },
                    hover: { width: 28, backgroundColor: "rgba(124, 83, 41, 1)" }
                  }}
                  transition={{ type: "spring" as const, stiffness: 180, damping: 15 }}
                  className="h-[2px] bg-accent/40 shrink-0 rounded-full"
                />
                
                <p className="text-base sm:text-lg md:text-xl font-bold text-text-primary leading-relaxed uppercase tracking-wide">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Блок 5: Після прочитання ви */}
      <section className="bg-bg-main text-text-primary py-12 md:py-20 px-4 border-t border-accent/10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
              Після прочитання ви
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {resultItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.01, 
                  borderColor: "rgba(124, 83, 41, 0.4)",
                  boxShadow: "0px 10px 25px rgba(124, 83, 41, 0.08)"
                }}
                transition={{ duration: 0.3 }}
                className="bg-bg-card p-4 sm:p-5 rounded-xl border border-sage/20 relative overflow-hidden flex items-center gap-3 sm:gap-4 group cursor-pointer"
              >
                <div className="bg-accent/10 p-1.5 rounded-full text-accent shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <p className="text-xs min-[380px]:text-sm sm:text-base font-bold text-text-primary whitespace-nowrap">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}