import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "BOUTIQUE DROP // Tactile Streetwear & Luxury Footwear",
  description:
    "High-density technical streetwear, 600GSM custom brushed French terry, and avant-garde sculpted footwear. Direct 1-Click WhatsApp Ordering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className={`${inter.variable} w-full max-w-full overflow-x-hidden`}>
      <body className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F3EF] text-[#1E1D1B] font-sans antialiased selection:bg-[#9E8468] selection:text-white m-0 p-0">
        {children}
      </body>
    </html>
  );
}
