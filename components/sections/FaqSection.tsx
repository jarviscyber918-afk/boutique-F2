"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { STORE_CONFIG } from "@/lib/products";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useLanguageStore";
import { sound } from "@/lib/audio";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  const faqItems = t?.faq?.items ?? [];

  const toggleAccordion = (index: number) => {
    sound.playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  const cleanPhone = STORE_CONFIG.whatsAppPhone.replace(/[^0-9]/g, "");

  return (
    <section className="py-16 sm:py-24 border-t border-[#E5E0D8] max-w-3xl mx-auto w-full">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-3 mb-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-[#ECE7DE] px-4 py-1.5 text-xs font-semibold text-[#2C2723] border border-[#DCD5C9]">
          <HelpCircle className="w-3.5 h-3.5 text-[#6B645C]" />
          <span>{t.faq.tag}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1E1D1B]">
          {t.faq.title}
        </h2>
        <p className="text-sm text-[#6B645C] font-normal max-w-md mx-auto">
          {t.faq.description}
        </p>
      </motion.div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? "bg-[#F7F4EE] border-[#DCD5C9] shadow-xs"
                  : "bg-[#FCFBFA] border-[#E5E0D8] hover:border-[#DCD5C9]"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-[#1E1D1B] cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#7A7269] transition-transform duration-200 ml-3 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-[#1E1D1B]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B645C] font-normal leading-relaxed border-t border-[#EAE4DC] pt-3.5">
                  {item.answer}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* WhatsApp Help Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 rounded-3xl bg-[#F2ECE1] p-6 sm:p-7 border border-[#DDD5C7] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs"
      >
        <div>
          <h4 className="text-base font-bold text-[#1E1D1B]">{t.faq.helpTitle}</h4>
          <p className="text-xs sm:text-sm text-[#5A524A] font-normal mt-1">{t.faq.helpDesc}</p>
        </div>
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.whatsapp.confirmRequest)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#1F4E3D] hover:bg-[#163A2E] px-5 py-3 text-xs font-semibold text-white whitespace-nowrap shadow-sm shadow-[#1F4E3D]/20 transition-all active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>{t.faq.helpBtn}</span>
        </a>
      </motion.div>

    </section>
  );
};
