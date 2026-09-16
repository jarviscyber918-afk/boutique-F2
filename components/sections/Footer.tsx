"use client";

import React, { useState } from "react";
import { STORE_CONFIG } from "@/lib/products";
import { ArrowRight, Check, ShieldCheck, MessageCircle, MapPin, Sparkles, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useLanguageStore";
import { sound } from "@/lib/audio";

export const Footer: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/subscribe-vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sound.playSuccess();
        setSubscribed(true);
        setPhone("");
      } else {
        setErrorMessage(data.error || "Une erreur est survenue.");
      }
    } catch {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  const cleanPhone = STORE_CONFIG.whatsAppPhone.replace(/[^0-9]/g, "");

  return (
    <footer className="w-full border-t border-[#E5E0D8] pt-8 sm:pt-14">
      {/* 3 Distinct Bento Container Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Box 1: Brand & Logistics (Left Card) */}
        <div className="bg-[#F7F4EE] border border-[#E5DFD5] rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(40,30,20,0.04)] hover:border-[#DCD5C9] hover:shadow-[0_8px_30px_rgba(40,30,20,0.06)] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            {/* Store Identity Badge */}
            <div className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-xl bg-[#1E1D1B] text-[#FAF8F5] font-black text-xs flex items-center justify-center shadow-xs">
                {STORE_CONFIG.brandMonogram}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-[#1E1D1B] tracking-tight">
                {STORE_CONFIG.brandName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#6B645C] leading-relaxed font-normal">
              {t.footer.tagline}
            </p>
          </div>

          {/* Dedicated Delivery Pill Badge */}
          <div className="mt-4 sm:mt-5">
            <div className="bg-[#ECE7DE] text-[#2C2723] border border-[#DCD5C9] px-3.5 py-2 rounded-xl inline-flex items-center gap-2 font-medium text-xs shadow-xs w-full">
              <MapPin className="w-4 h-4 text-[#9E8468] flex-shrink-0" />
              <span className="truncate">{t.footer.deliveryNotice}</span>
            </div>
          </div>
        </div>

        {/* Box 2: Quick Links / Navigation (Middle Card) */}
        <div className="bg-[#F7F4EE] border border-[#E5DFD5] rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(40,30,20,0.04)] hover:border-[#DCD5C9] hover:shadow-[0_8px_30px_rgba(40,30,20,0.06)] transition-all flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C827A] mb-3 sm:mb-4">
              {t.footer.quickLinksTitle}
            </h4>

            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <a
                  href="#drop-showcase"
                  className="flex items-center justify-between text-[#3D3833] hover:text-[#1E1D1B] font-medium py-1.5 px-2 rounded-lg hover:bg-[#ECE7DE]/70 transition-colors group"
                >
                  <span>{t.footer.stockItems}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8C827A] group-hover:text-[#1E1D1B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="#drop-showcase"
                  className="flex items-center justify-between text-[#3D3833] hover:text-[#1E1D1B] font-medium py-1.5 px-2 rounded-lg hover:bg-[#ECE7DE]/70 transition-colors group"
                >
                  <span>{t.footer.sneakers}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8C827A] group-hover:text-[#1E1D1B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="#drop-showcase"
                  className="flex items-center justify-between text-[#3D3833] hover:text-[#1E1D1B] font-medium py-1.5 px-2 rounded-lg hover:bg-[#ECE7DE]/70 transition-colors group"
                >
                  <span>{t.footer.hoodies}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8C827A] group-hover:text-[#1E1D1B] transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Dedicated WhatsApp Support Action Pill */}
          <div className="mt-4 pt-2">
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="bg-[#1F4E3D] hover:bg-[#163A2E] text-white border border-[#1F4E3D] px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold transition-colors shadow-sm shadow-[#1F4E3D]/15"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-white fill-white flex-shrink-0" />
                <span>{t.footer.clientService}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#A3D9C9] bg-[#163A2E] px-2 py-0.5 rounded-full">
                En ligne
              </span>
            </a>
          </div>
        </div>

        {/* Box 3: VIP Alerts & WhatsApp Input (Right Card) */}
        <div className="bg-[#F7F4EE] border border-[#E5DFD5] rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(40,30,20,0.04)] hover:border-[#DCD5C9] hover:shadow-[0_8px_30px_rgba(40,30,20,0.06)] transition-all flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C827A]">
              <Sparkles className="w-3.5 h-3.5 text-[#9E8468] fill-[#9E8468] flex-shrink-0" />
              <span>{t.footer.vipAlertsTitle}</span>
            </div>

            <p className="text-xs sm:text-sm text-[#6B645C] font-normal leading-relaxed">
              {t.footer.vipAlertsDesc}
            </p>
          </div>

          {/* Form */}
          <div className="mt-4 pt-1">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="text"
                placeholder={t.footer.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 bg-white border border-[#DCD5C9] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#1E1D1B] placeholder:text-[#9C948A] focus:ring-2 focus:ring-[#1E1D1B] focus:border-[#1E1D1B] focus:outline-none shadow-xs"
              />
              <button
                type="submit"
                className="bg-[#1E1D1B] hover:bg-[#33302B] px-3.5 py-2.5 rounded-xl text-white font-semibold text-xs flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95 flex-shrink-0"
              >
                {subscribed ? (
                  <Check className="w-4 h-4 text-[#A3D9C9]" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-[#1F4E3D] font-semibold mt-2 animate-fade-in">
                {t.footer.subscribedMsg}
              </p>
            )}
            {errorMessage && (
              <p className="text-xs text-rose-600 font-medium mt-2 animate-fade-in">
                {errorMessage}
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Sub-footer Bar */}
      <div className="border-t border-[#E5E0D8] pt-5 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[#8C827A] gap-2.5 pb-2 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} {t.footer.copyright}
        </div>
        <div className="flex items-center gap-2 text-[#5A524A] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E3D] flex-shrink-0" />
          <span>{t.footer.badge}</span>
        </div>
      </div>
    </footer>
  );
};
