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

  const { t } = useTranslation();
  const cleanPhone = STORE_CONFIG.whatsAppPhone.replace(/[^0-9]/g, "");

  return (
    <header className="w-full max-w-full border-b border-[#E5E0D8] pb-3 sm:pb-4 mb-4 sm:mb-8 overflow-hidden">
      
      {/* Main Bar */}
      <div className="flex items-center justify-between gap-2 w-full">
        
        {/* Brand Monogram & Logo (Left) */}
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

        {/* Desktop Allocation Badge (Middle) */}
        <div className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#F4EFEA] px-3.5 py-1.5 text-xs font-semibold border border-[#E2D8CC] shadow-2xs">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9E8468] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#785E42]" />
          </span>
          <span className="text-[#2C2723] font-bold" dir="ltr">{t.nav.dropCode}</span>
          <span className="text-[#C4B5A2] font-normal">/</span>
          <span className="text-[#6B563F] font-bold">{t.nav.dropStatus}</span>
        </div>

        {/* Desktop Controls (>= 768px md) */}
        <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
          <LanguageSwitcher />

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

          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 rounded-full bg-[#1F4E3D] hover:bg-[#163A2E] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-wide transition-all shadow-sm shadow-[#1F4E3D]/20 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
            <span>{t.nav.vipLine}</span>
          </a>

          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 rounded-full bg-[#1E1D1B] hover:bg-[#2B2825] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 flex-shrink-0" />
            <span>{t.nav.bag}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C4A480] text-[#1E1D1B] font-extrabold text-[11px]">
              {itemCount}
            </span>
          </button>
        </div>

        {/* Mobile Controls (< 768px md) */}
        <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
          {/* Cart Bag Pill */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-1.5 rounded-full bg-[#1E1D1B] hover:bg-[#2B2825] text-white px-3 py-1.5 text-xs font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C4A480] text-[#1E1D1B] font-bold text-[10px]">
              {itemCount}
            </span>
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECE7DE] hover:bg-[#E2DDD3] text-[#1E1D1B] transition-colors border border-[#DCD5C9] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Collapsible Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#E5E0D8] flex flex-col gap-3 animate-fade-in w-full">
          {/* Row: Language Switcher & Sound Feedback */}
          <div className="flex items-center justify-between gap-2 bg-[#F7F4EE] p-2.5 rounded-2xl border border-[#E5DFD5]">
            <LanguageSwitcher />

            <button
              onClick={toggleSound}
              aria-label="Toggle sound feedback"
              className="flex items-center gap-2 rounded-xl bg-[#ECE7DE] hover:bg-[#E2DDD3] px-3 py-1.5 text-xs font-semibold text-[#4A433B] transition-colors border border-[#DCD5C9] cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#1F4E3D]" />
                  <span>{t.nav.soundOn}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#8C8377]" />
                  <span>{t.nav.soundOff}</span>
                </>
              )}
            </button>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#F4EFEA] px-3.5 py-2 text-xs text-[#2C2723] border border-[#E2D8CC]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#9E8468] animate-pulse" />
              <span className="font-semibold">{t.nav.dropCode} // {t.nav.dropStatus}</span>
            </div>
          </div>

          {/* WhatsApp Direct Concierge CTA */}
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#1F4E3D] text-white py-3 text-xs font-semibold shadow-sm active:scale-98 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{t.nav.directConcierge}</span>
          </a>
        </div>
      )}
    </header>
  );
};
