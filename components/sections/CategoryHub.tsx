"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORY_TILES } from "@/lib/products";
import { useTranslation } from "@/hooks/useLanguageStore";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";

interface CategoryHubProps {
  onSelectCategory: (category: "all" | "footwear" | "clothing" | "accessories") => void;
  activeCategory: string;
}

export const CategoryHub: React.FC<CategoryHubProps> = ({ onSelectCategory, activeCategory }) => {
  const { language } = useTranslation();

  const handleTileClick = (catId: "footwear" | "clothing" | "accessories") => {
    sound.playClick();
    onSelectCategory(catId);
    const el = document.getElementById("catalog-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 sm:py-12 border-b border-[#E5E0D8] w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9E8468] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#9E8468]" />
            <span>
              {language === "ar"
                ? "تصفح حسب الفئة"
                : language === "en"
                ? "EXPLORE BY CATEGORY"
                : "EXPLORER PAR CATÉGORIE"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1E1D1B] tracking-tight">
            {language === "ar"
              ? "فئات المجموعة الحصرية"
              : language === "en"
              ? "Curated Drop Hubs"
              : "Catégories du Drop 04"}
          </h2>
        </div>
      </div>

      {/* 3 Prominent Category Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {CATEGORY_TILES.map((tile, idx) => {
          const isCurrentActive = activeCategory === tile.id;
          const title =
            language === "ar"
              ? tile.titleAR
              : language === "en"
              ? tile.titleEN
              : tile.titleFR;
          const desc =
            language === "ar"
              ? tile.descAR
              : language === "en"
              ? tile.descEN
              : tile.descFR;

          return (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => handleTileClick(tile.id)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer p-6 aspect-[16/10] sm:aspect-[4/3] flex flex-col justify-between transition-all duration-300 border ${
                isCurrentActive
                  ? "border-[#1E1D1B] shadow-[0_12px_30px_rgba(40,30,20,0.12)] scale-[1.01]"
                  : "border-[#E5E0D8] shadow-[0_4px_20px_rgba(40,30,20,0.04)] hover:border-[#C4B5A2] hover:shadow-[0_12px_30px_rgba(40,30,20,0.08)]"
              }`}
            >
              {/* Background Image with Zoom */}
              <Image
                src={tile.image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/20 group-hover:from-slate-950/90 transition-all" />

              {/* Top Row: Model Count Badge & Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs backdrop-blur-xs">
                  {tile.countBadge}
                </span>

                <span className="h-9 w-9 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-xs group-hover:bg-white group-hover:text-slate-900 transition-colors">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-1 text-white">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  {title}
                </h3>
                <p className="text-xs text-slate-300 font-normal line-clamp-1">
                  {desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
