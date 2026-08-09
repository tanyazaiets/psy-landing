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

export const metadata: Metadata = {
  title: "Як вести блог психологу — Практичний посібник",
  description: "Практичний посібник для психологів, психотерапевтів і коучів",
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
        {children}
      </body>
    </html>
  );
}
