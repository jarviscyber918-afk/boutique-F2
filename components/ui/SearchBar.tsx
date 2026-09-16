"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, X, Sparkles, ChevronRight } from "lucide-react";
import { PRODUCTS, Product } from "@/lib/products";
import { useTranslation } from "@/hooks/useLanguageStore";
import { useCartStore } from "@/hooks/useCartStore";
import { sound } from "@/lib/audio";
import { sanitizeSearchQuery } from "@/lib/security";

interface SearchBarProps {
  onFilterCategory?: (category: "all" | "footwear" | "clothing" | "accessories") => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onFilterCategory }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const setQuickView = useCartStore((state) => state.setQuickViewProduct);
  const { t } = useTranslation();

  // Filter matching products from the first letter
  const matchingProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q)) ||
          p.sizes.some((s) => s.toLowerCase() === q)
        );
      })
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelectProduct = (product: Product) => {
    sound.playClick();
    setQuickView(product);
    setIsOpen(false);
    setQuery("");
  };

  const handleQuickCategory = (cat: "footwear" | "clothing" | "accessories") => {
    sound.playSwitch();
    if (onFilterCategory) onFilterCategory(cat);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto my-4 sm:my-6 z-30">
      
      {/* Input Field Bar as a Rounded Pill with Shadow */}
      <div
        className={`bg-white border transition-all duration-200 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full flex items-center gap-2.5 sm:gap-3.5 shadow-sm ${
          isOpen && query.trim()
            ? "border-[#1E1D1B] ring-2 ring-[#1E1D1B]/10"
            : "border-[#E5E0D8] hover:border-[#C4B5A2] focus-within:ring-2 focus-within:ring-[#1E1D1B] focus-within:border-transparent"
        }`}
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C8377] flex-shrink-0" />
        
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const sanitized = sanitizeSearchQuery(e.target.value, 100);
            setQuery(sanitized);
            setIsOpen(Boolean(sanitized.trim()));
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder={t.search.placeholder}
          maxLength={100}
          className="w-full bg-transparent text-xs sm:text-base text-[#1E1D1B] placeholder:text-[#A0988D] focus:outline-none font-medium"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="p-1 rounded-full text-[#8C8377] hover:text-[#1E1D1B] hover:bg-[#ECE7DE] transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Floating Autocomplete Overlay Dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#FCFBFA] border border-[#E5E0D8] shadow-[0_12px_35px_rgba(40,30,20,0.1)] rounded-2xl sm:rounded-3xl p-2 sm:p-3 z-50 max-h-80 overflow-y-auto custom-scrollbar animate-fade-in">
          
          {matchingProducts.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8C8377] flex items-center justify-between border-b border-[#EAE4DC] mb-1">
                <span>{t.search.matchingResults(matchingProducts.length)}</span>
                <span className="text-[#9E8468] font-semibold hidden sm:inline">{t.search.oneClickHint}</span>
              </div>

              {matchingProducts.map((product) => {
                const img = product.colors[0]?.images[0] || "";
                return (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-2 sm:p-3 hover:bg-[#F5F1EB] rounded-xl sm:rounded-2xl flex items-center justify-between gap-2.5 sm:gap-3.5 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl overflow-hidden bg-[#EFEAE2] border border-[#E5E0D8] flex-shrink-0">
                        <Image src={img} alt={product.name} fill className="object-cover" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1E1D1B] truncate group-hover:text-[#9E8468] transition-colors">
                            {product.name}
                          </h4>
                          <span className="bg-[#ECE7DE] text-[#4A433B] text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#8C8377] truncate mt-0.5">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-[#1E1D1B]">
                        {product.priceDZD.toLocaleString()} DZD
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {t.search.noResults(query)}
              </p>

              <div className="pt-1 sm:pt-2">
                <p className="text-[11px] sm:text-xs text-slate-400 mb-2 font-medium">{t.search.quickSuggestions}</p>
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleQuickCategory("footwear")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.search.suggestFootwear}
                  </button>
                  <button
                    onClick={() => handleQuickCategory("clothing")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.search.suggestClothing}
                  </button>
                  <button
                    onClick={() => handleQuickCategory("accessories")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.search.suggestAccessories}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
