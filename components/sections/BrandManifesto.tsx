"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Layers, Cpu, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/hooks/useLanguageStore";

export const BrandManifesto: React.FC = () => {
  const { t } = useTranslation();

  const icons = [Layers, Cpu, Zap, ShieldCheck];
  const pillars = t?.manifesto?.pillars ?? [];

  return (
    <section className="py-16 sm:py-24 border-t border-[#E5E0D8] w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ECE7DE] px-3.5 py-1 text-xs font-semibold text-[#2C2723] border border-[#DCD5C9]">
            <span>{t?.manifesto?.tag ?? "ENGAGEMENT QUALITÉ"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1E1D1B] leading-tight">
            {t?.manifesto?.title ?? "Des matières d'exception, zéro compromis."}
          </h2>

          <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed font-normal">
            {t?.manifesto?.description ?? "Boutique Drop conçoit des pièces streetwear techniques résistantes et structurées."}
          </p>
        </motion.div>

        {/* Right 2x2 Bento Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = icons[idx] || Layers;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-3xl bg-[#F7F4EE] p-6 border border-[#E5DFD5] hover:bg-white hover:border-[#DCD5C9] hover:shadow-[0_8px_30px_rgba(40,30,20,0.06)] transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-2xl bg-[#1E1D1B] text-[#FAF8F5] flex items-center justify-center mb-4 group-hover:bg-[#1F4E3D] transition-colors shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1E1D1B] mb-1.5">
                  {pillar?.title ?? ""}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A7269] leading-relaxed font-normal">
                  {pillar?.desc ?? ""}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

