import type { Metadata } from "next";
import { Arsenal_SC, Ysabeau_SC } from "next/font/google";
import "./globals.css";

const fontHeading = Arsenal_SC({
  variable: "--font-heading",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
});

const fontSans = Ysabeau_SC({
  variable: "--font-sans",
  subsets: ["cyrillic", "latin"],
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tanyazaiets.com.ua"),
  title: "Практичний посібник  —  Як вести блог психологу",
  description: "Практичний посібник для психологів, психотерапевтів і коучів. Навчіться вести блог етично, без маніпуляцій та залучати лояльних клієнтів.",
  keywords: ["практичний посібник для психологів", "як вести блог психологу", "контент для психотерапевтів", "просування послуг психолога", "блог для коучів", "соцмережі для психолога", "Тетяна Заєць"],
  openGraph: {
    title: "Як вести блог психологу — Практичний посібник",
    description: "Практичний посібник для психологів, психотерапевтів і коучів. Створюйте контент, який продає етично.",
    url: "https://tanyazaiets.com.ua",
    siteName: "Практичний посібник для психологів",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Як вести блог психологу — Практичний посібник",
    description: "Навчіться вести блог етично, без маніпуляцій та залучати лояльних клієнтів.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className={`${fontHeading.variable} ${fontSans.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-bg-viewport font-sans"
        suppressHydrationWarning
      >
        <span dangerouslySetInnerHTML={{ __html: "<!-- icon created by popo2021 from Flaticon -->" }} style={{ display: "none" }} />
        {children}
      </body>
    </html>
  );
}
