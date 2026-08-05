"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-main text-text-secondary py-10 px-4 border-t border-sage/15 text-xs sm:text-sm">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Ліва частина: Копірайт */}
        <div className="space-y-1">
          <p className="font-medium text-text-primary">
            © {currentYear} Тетяна. Усі права захищено.
          </p>
          <p className="text-text-secondary/80 text-xs">
            Практичний посібник для психологів та коучів
          </p>
        </div>

        {/* Права частина: Юридичні заготовки */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-text-secondary">
          <Link 
            href="#" 
            className="hover:text-accent transition-colors underline decoration-sage/30 underline-offset-4"
          >
            Публічна оферта
          </Link>
          <Link 
            href="#" 
            className="hover:text-accent transition-colors underline decoration-sage/30 underline-offset-4"
          >
            Політика конфіденційності
          </Link>
          <Link 
            href="#" 
            className="hover:text-accent transition-colors underline decoration-sage/30 underline-offset-4"
          >
            Відмова від відповідальності
          </Link>
        </div>

      </div>
    </footer>
  );
}