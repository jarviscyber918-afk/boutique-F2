"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import { STORE_CONFIG } from "@/lib/products";
import { useTranslation } from "@/hooks/useLanguageStore";
import { sound } from "@/lib/audio";

export const HeroDrop: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 48 });
  const { t } = useTranslation();

  // Live Drop Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToCollection = () => {
    sound.playClick();
    const el = document.getElementById("drop-showcase");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cleanPhone = STORE_CONFIG.whatsAppPhone.replace(/[^0-9]/g, "");

  return (
    <section className="relative w-full py-8 sm:py-16 md:py-20 border-b border-[#E5E0D8]">
      
      {/* Signature Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center gap-3 mb-8"
      >
        {/* Badge 1: Muted leather indicator */}
        <div className="inline-flex items-center gap-2.5 rounded-full bg-[#F4EFEA] px-4 py-1.5 text-xs font-semibold text-[#2C2723] border border-[#E2D8CC] shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9E8468] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#785E42]" />
          </span>
          <span className="tracking-normal">{t.hero.badge1}</span>
        </div>

        {/* Badge 2: Burnished brass/bronze badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#ECE7DE] px-4 py-1.5 text-xs font-semibold text-[#4A433B] border border-[#DCD5C9] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#9E8468] fill-[#9E8468]" />
          <span className="tracking-normal">{t.hero.badge2}</span>
        </div>
      </motion.div>

      {/* Hero Headline */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#1E1D1B] leading-[0.98]">
          {t.hero.headline1}
        </h1>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#1E1D1B] via-[#5C5349] to-[#9E8468] leading-[0.98]">
          {t.hero.headline2}
        </h1>
      </motion.div>

      {/* Grid: Value Proposition + Dual CTAs + Live Allocation Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mt-8 sm:mt-12 items-end"
      >
        {/* Narrative & Dual Action Buttons */}
        <div className="lg:col-span-7 space-y-8">
          <p className="text-base sm:text-lg md:text-xl text-[#6B645C] font-normal leading-relaxed max-w-xl">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            {/* Primary Action Button */}
            <button
              onClick={scrollToCollection}
              className="inline-flex items-center gap-2 rounded-full bg-[#1E1D1B] hover:bg-[#2B2825] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all shadow-md shadow-[#1E1D1B]/15 active:scale-95 cursor-pointer"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Secondary Action Button (Dark Forest / Deep Emerald Luxury) */}
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F4E3D] hover:bg-[#163A2E] text-white px-7 py-4 text-sm font-semibold uppercase tracking-wider transition-all shadow-md shadow-[#1F4E3D]/20 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{t.hero.secondaryCta}</span>
            </a>
          </div>
        </div>

        {/* Live Allocation & Timer Box */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-[#F7F4EE] p-6 sm:p-7 border border-[#E5DFD5] shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs text-[#8C8377] border-b border-[#E5DFD5] pb-3.5">
              <span className="flex items-center gap-2 font-semibold text-[#2C2723]">
                <Clock className="w-4 h-4 text-[#9E8468]" />
                <span>{t.hero.countdownLabel}</span>
              </span>
              <span className="font-bold text-[#1E1D1B] text-sm tracking-wider">
                {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#6B645C] font-medium">{t.hero.quotaLabel}</span>
                <span className="text-[#1F4E3D] font-bold">{t.hero.quotaAllocated}</span>
              </div>
              <div className="h-2.5 w-full bg-[#E5DFD5] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#9E8468] to-[#6B563F] w-[87%] rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8C8377] pt-1">
              <span className="flex items-center gap-1.5 text-[#4A433B] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#1F4E3D]" />
                <span>{t.hero.guaranteedStock}</span>
              </span>
              <span className="text-[#8C8377] font-medium">{t.hero.cities}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
