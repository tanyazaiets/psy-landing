"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-viewport text-text-secondary py-10 px-4 border-t border-sage/15 text-xs sm:text-sm">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-center md:text-left">
        
        {/* Ліва частина: Копірайт */}
        <div className="space-y-1">
          <p className="font-medium text-text-primary">
            © {currentYear}. Усі права захищено.
          </p>
          <p className="text-text-secondary/80 text-xs">
            Практичний посібник для психологів та коучів
          </p>
        </div>

        {/* Права частина: Юридичні посилання (стовпчик) */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-text-secondary">
          <Link 
            href="/offer" 
            className="hover:text-accent transition-colors underline decoration-sage/30 underline-offset-4"
          >
            Публічна оферта
          </Link>
          <Link 
            href="/privacy" 
            className="hover:text-accent transition-colors underline decoration-sage/30 underline-offset-4"
          >
            Політика конфіденційності
          </Link>
        </div>

      </div>
    </footer>
  );
}