// hooks/useLanguageStore.ts
import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Language, TRANSLATIONS, Translations } from "@/lib/translations";
import { sound } from "@/lib/audio";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  getTranslations: () => Translations;
  isRTL: () => boolean;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "fr",

      setLanguage: (lang: Language) => {
        sound.playSwitch();
        set({ language: lang });

        if (typeof document !== "undefined") {
          const isRtl = lang === "ar";
          document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
          document.documentElement.setAttribute("lang", lang);
        }
      },

      getTranslations: () => {
        const lang = get().language || "fr";
        return TRANSLATIONS[lang] || TRANSLATIONS.fr;
      },

      isRTL: () => {
        return get().language === "ar";
      },
    }),
    {
      name: "boutique-language-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Hydration-safe translation hook
 * Guarantees SSR and initial client render produce identical HTML ("fr"),
 * preventing React hydration mismatch errors when rehydrating from localStorage.
 */
export function useTranslation() {
  const [mounted, setMounted] = useState(false);
  const storeLanguage = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      const isRtl = storeLanguage === "ar";
      document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", storeLanguage);
    }
  }, [storeLanguage]);

  const activeLang: Language = mounted ? storeLanguage : "fr";
  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.fr;

  return {
    t,
    language: activeLang,
    setLanguage,
    mounted,
    isRTL: activeLang === "ar",
  };
}
