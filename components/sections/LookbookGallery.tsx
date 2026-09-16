"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LOOKBOOK_ITEMS } from "@/lib/products";
import { useTranslation } from "@/hooks/useLanguageStore";
import { Compass, Camera, Sparkles } from "lucide-react";

export const LookbookGallery: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-24 border-t border-[#E5E0D8] w-full">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E8468] mb-1.5">
            <Camera className="w-3.5 h-3.5 text-[#9E8468]" />
            <span>{t.lookbook.campaignTag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E1D1B]">
            {t.lookbook.title}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#6B645C] max-w-sm font-normal leading-relaxed">
          {t.lookbook.description}
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {LOOKBOOK_ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.6,
              delay: idx * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-3xl bg-[#F5F2ED] border border-[#E5E0D8] aspect-[3/4] flex flex-col justify-end p-6 hover:shadow-[0_12px_30px_rgba(40,30,20,0.09)] transition-all duration-300"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/90 via-[#161514]/30 to-transparent" />

            <div className="absolute top-5 left-5 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1E1D1B] shadow-sm border border-[#E5E0D8] backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-[#9E8468] fill-[#9E8468]" />
              <span>{item.tag}</span>
            </div>

            <div className="relative z-10 space-y-1 text-white">
              <div className="flex items-center gap-1.5 text-xs text-[#C4A480] font-medium">
                <Compass className="w-3.5 h-3.5" />
                <span>{item.location}</span>
              </div>
              <h3 className="text-lg font-bold">
                {item.title}
              </h3>
              <p className="text-xs text-[#DDD6CA] line-clamp-1 font-normal">
                {item.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
