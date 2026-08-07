"use client";

import { motion } from "framer-motion";

export default function ForWhom() {
  const points = [
    "не знаєте, про що писати у блозі;",
    "боїтеся виглядати нав’язливо чи продавати «в лоб»;",
    "хочете, щоб блог будував довгострокову довіру;",
    "не маєте бажання маніпулювати болем аудиторії;",
    "хочете, щоб контент відображав вашу справжню професійність.",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 } 
    },
    hover: {
      x: 15,
      transition: { type: "spring" as const, stiffness: 200, damping: 20 }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0.3, scale: 1 },
    visible: { opacity: 0.4 },
    hover: {
      opacity: 1,
      scale: 1.1,
      color: "#7c5329",
      transition: { duration: 0.2 }
    }
  };

  const textVariants = {
    hover: {
      color: "#000000",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="bg-bg-main text-text-primary py-16 md:py-24 px-4 overflow-hidden border-t border-accent/10">
      <div className="max-w-2xl mx-auto">
        
        {/* Заголовок блоку */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4 text-black">
            Для кого цей посібник?
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto">
            Він стане вашою настільною книгою та надійним орієнтиром, якщо ви:
          </p>
        </motion.div>

        {/* Список у вигляді стовпчика */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col"
        >
          {points.map((point, index) => {
            const displayNum = `0${index + 1}`;
            return (
              <motion.div
                key={index}
                variants={rowVariants}
                whileHover="hover"
                className="group relative flex items-center gap-6 py-6 sm:py-7 border-b border-accent/15 cursor-pointer pl-6"
              >
                {/* Ліва вертикальна лінія, яка росте при ховері */}
                <motion.div 
                  initial={{ scaleY: 0 }}
                  variants={{
                    hover: { scaleY: 1 }
                  }}
                  transition={{ type: "spring" as const, stiffness: 150, damping: 15 }}
                  className="absolute left-0 top-3 bottom-3 w-1 bg-accent rounded-full origin-center"
                />
                
                {/* Номер рядка */}
                <motion.span
                  variants={numberVariants}
                  className="text-2xl sm:text-3xl font-black text-accent tracking-wider shrink-0 transition-all"
                >
                  {displayNum}
                </motion.span>

                {/* Текст */}
                <motion.p 
                  variants={textVariants}
                  className="text-base sm:text-lg md:text-xl font-bold text-text-primary leading-relaxed pr-4 uppercase tracking-wide"
                >
                  {point}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}