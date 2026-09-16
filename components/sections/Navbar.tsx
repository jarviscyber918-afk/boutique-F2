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
    <header className="w-full border-b border-[#E5E0D8] pb-5 mb-8 sm:mb-12">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand Monogram & Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2.5 sm:gap-3 group"
          >
            <span className="h-10 w-10 rounded-2xl bg-[#1E1D1B] text-white font-black text-sm flex items-center justify-center shadow-xs group-hover:bg-[#9E8468] transition-colors flex-shrink-0">
              {STORE_CONFIG.brandMonogram}
            </span>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#1E1D1B] leading-none">
                {STORE_CONFIG.brandName}
              </span>
              <span className="text-xs text-[#8C8377] font-medium mt-1">
                {t.nav.officialDrop}
              </span>
            </div>
          </a>

          {/* Clean Allocation Badge with Direction Isolation */}
          <div className="hidden xl:inline-flex items-center gap-2 rounded-full bg-[#F4EFEA] px-3.5 py-1.5 text-xs font-semibold border border-[#E2D8CC] ml-3 shadow-2xs">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9E8468] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#785E42]" />
            </span>
            <span className="text-[#2C2723] font-bold" dir="ltr">{t.nav.dropCode}</span>
            <span className="text-[#C4B5A2] font-normal">/</span>
            <span className="text-[#6B563F] font-bold">{t.nav.dropStatus}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Language Switcher Pill (Always in consistent LTR order [FR | AR | EN]) */}
          <LanguageSwitcher />

          {/* Audio Feedback Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle sound feedback"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#ECE7DE] hover:bg-[#E2DDD3] text-[#4A433B] transition-colors border border-[#DCD5C9] cursor-pointer"
            title={soundEnabled ? t.nav.soundOn : t.nav.soundOff}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#1F4E3D]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#8C8377]" />
            )}
          </button>

          {/* Direct WhatsApp CTA Button (Dark Forest / Deep Emerald Luxury) */}
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#1F4E3D] hover:bg-[#163A2E] text-white px-4 sm:px-5 py-2.5 text-xs font-semibold tracking-wide transition-all shadow-sm shadow-[#1F4E3D]/20 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
            <span>{t.nav.vipLine}</span>
          </a>

          {/* Cart Bag Pill */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 rounded-full bg-[#1E1D1B] hover:bg-[#2B2825] text-white px-4 sm:px-5 py-2.5 text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 flex-shrink-0" />
            <span className="hidden xs:inline">{t.nav.bag}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C4A480] text-[#1E1D1B] font-extrabold text-[11px]">
              {itemCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden flex h-9 w-9 items-center justify-center rounded-full bg-[#ECE7DE] text-[#4A433B] hover:bg-[#E2DDD3] transition-colors border border-[#DCD5C9]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-4 pt-4 border-t border-[#E5E0D8] flex flex-col gap-2.5 animate-fade-in">
          <div className="flex items-center gap-2 rounded-2xl bg-[#F4EFEA] p-3 text-xs text-[#2C2723] border border-[#E2D8CC]">
            <span className="h-2 w-2 rounded-full bg-[#9E8468] animate-pulse" />
            <span className="font-semibold">{t.nav.dropCode} // {t.nav.dropStatus}</span>
          </div>

          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#1F4E3D] text-white py-3 text-xs font-semibold shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{t.nav.directConcierge}</span>
          </a>
        </div>
      )}
    </header>
  );
};
