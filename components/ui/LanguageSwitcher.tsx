"use client";

import React from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "@/hooks/useLanguageStore";
import { Language } from "@/lib/translations";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, mounted } = useTranslation();

  const languages: { code: Language; label: string }[] = [
    { code: "fr", label: "FR" },
    { code: "ar", label: "AR" },
    { code: "en", label: "EN" },
  ];

  if (!mounted) {
    return (
      <div dir="ltr" className="bg-[#ECE7DE] p-0.5 sm:p-1 rounded-full border border-[#DCD5C9] flex items-center gap-0.5 h-8 sm:h-9">
        <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C8377] ml-1 mr-0.5" />
        <span className="bg-white text-[#1E1D1B] shadow-xs font-semibold px-2 py-0.5 text-[10px] sm:text-xs rounded-full">
          FR
        </span>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="bg-[#ECE7DE] hover:bg-[#E2DDD3] p-0.5 sm:p-1 rounded-full border border-[#DCD5C9] flex items-center gap-0.5 transition-all shadow-2xs"
    >
      <div className="flex items-center pl-1 sm:pl-1.5 pr-0.5 text-[#8C8377]">
        <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </div>

      {languages.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            aria-label={`Switch language to ${lang.label}`}
            className={`cursor-pointer transition-all duration-200 text-[10px] sm:text-xs rounded-full px-1.5 sm:px-2.5 py-0.5 sm:py-1 ${
              isActive
                ? "bg-white text-[#1E1D1B] shadow-xs font-bold"
                : "text-[#6B645C] hover:text-[#1E1D1B] font-medium"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};
