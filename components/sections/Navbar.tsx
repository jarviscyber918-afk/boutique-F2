"use client";

import React, { useState } from "react";
import { ShoppingBag, Volume2, VolumeX, MessageCircle, Menu, X } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { useTranslation } from "@/hooks/useLanguageStore";
import { STORE_CONFIG } from "@/lib/products";
import { sound } from "@/lib/audio";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemCount = useCartStore((state) => state.getItemCount());
  const soundEnabled = useCartStore((state) => state.soundEnabled);
  const toggleSound = useCartStore((state) => state.toggleSound);

  const { t, language } = useTranslation();
  const cleanPhone = STORE_CONFIG.whatsAppPhone.replace(/[^0-9]/g, "");

  return (
    <header className="w-full border-b border-[#E5E0D8] pb-4 mb-6 sm:mb-10">
      
      {/* Row 1: Brand Logo on Left, Action Controls on Right */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* Brand Monogram & Logo */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
        >
          <span className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-[#1E1D1B] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-xs group-hover:bg-[#9E8468] transition-colors flex-shrink-0">
            {STORE_CONFIG.brandMonogram}
          </span>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-black tracking-tight text-[#1E1D1B] leading-none">
              {STORE_CONFIG.brandName}
            </span>
            <span className="text-[10px] sm:text-xs text-[#8C8377] font-medium mt-0.5 sm:mt-1">
              {t.nav.officialDrop}
            </span>
          </div>
        </a>

        {/* Desktop Allocation Badge */}
        <div className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#F4EFEA] px-3.5 py-1.5 text-xs font-semibold border border-[#E2D8CC] shadow-2xs">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9E8468] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#785E42]" />
          </span>
          <span className="text-[#2C2723] font-bold" dir="ltr">{t.nav.dropCode}</span>
          <span className="text-[#C4B5A2] font-normal">/</span>
          <span className="text-[#6B563F] font-bold">{t.nav.dropStatus}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Language Switcher Pill */}
          <LanguageSwitcher />

          {/* Audio Feedback Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle sound feedback"
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#ECE7DE] hover:bg-[#E2DDD3] text-[#4A433B] transition-colors border border-[#DCD5C9] cursor-pointer flex-shrink-0"
            title={soundEnabled ? t.nav.soundOn : t.nav.soundOff}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1F4E3D]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C8377]" />
            )}
          </button>

          {/* Direct WhatsApp CTA Button (Desktop) */}
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#1F4E3D] hover:bg-[#163A2E] text-white px-3.5 sm:px-5 py-1.5 sm:py-2.5 text-xs font-semibold tracking-wide transition-all shadow-sm shadow-[#1F4E3D]/20 active:scale-95 cursor-pointer flex-shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white flex-shrink-0" />
            <span>{t.nav.vipLine}</span>
          </a>

          {/* Cart Bag Pill */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#1E1D1B] hover:bg-[#2B2825] text-white px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer flex-shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">{t.nav.bag}</span>
            <span className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#C4A480] text-[#1E1D1B] font-extrabold text-[10px] sm:text-[11px]">
              {itemCount}
            </span>
          </button>
        </div>

      </div>

      {/* Row 2: Mobile Status Badges & Quick WhatsApp CTA Bar */}
      <div className="flex lg:hidden items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#EAE4DC] overflow-x-auto custom-scrollbar">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EFEA] px-3 py-1 text-[11px] font-semibold border border-[#E2D8CC] shadow-2xs whitespace-nowrap flex-shrink-0">
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9E8468] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#785E42]" />
          </span>
          <span className="text-[#2C2723] font-bold" dir="ltr">{t.nav.dropCode}</span>
          <span className="text-[#C4B5A2] font-normal">/</span>
          <span className="text-[#6B563F] font-bold">{t.nav.dropStatus}</span>
        </div>

        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#1F4E3D] hover:bg-[#163A2E] text-white px-3 py-1 text-[11px] font-semibold tracking-wide shadow-2xs active:scale-95 cursor-pointer whitespace-nowrap flex-shrink-0"
        >
          <MessageCircle className="w-3 h-3 fill-white flex-shrink-0" />
          <span>{t.nav.vipLine}</span>
        </a>
      </div>

    </header>
  );
};
