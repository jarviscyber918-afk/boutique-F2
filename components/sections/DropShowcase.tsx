"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS, Product } from "@/lib/products";
import { ProductCard } from "../ui/ProductCard";
import { CategoryHub } from "./CategoryHub";
import { SearchBar } from "../ui/SearchBar";
import { Sparkles, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "@/hooks/useLanguageStore";
import { sound } from "@/lib/audio";

type CategoryFilter = "all" | "footwear" | "clothing" | "accessories";

export const DropShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");
  const { t } = useTranslation();

  // Clean Single-Language Category Tab Definitions
  const categories: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: t.showcase.categories.all },
    { id: "footwear", label: t.showcase.categories.footwear },
    { id: "clothing", label: t.showcase.categories.clothing },
    { id: "accessories", label: t.showcase.categories.accessories },
  ];

  const handleCategorySelect = (id: CategoryFilter) => {
    sound.playSwitch();
    setActiveCategory(id);
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeCategory === "all") return true;
    return product.category === activeCategory;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.priceDZD - b.priceDZD;
    if (sortBy === "price-high") return b.priceDZD - a.priceDZD;
    return 0;
  });

  return (
    <section id="drop-showcase" className="py-6 sm:py-12 w-full">
      
      {/* 1. Category Hub Hero Tiles */}
      <CategoryHub
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* 2. Live Interactive Search Bar with Autocomplete Dropdown */}
      <SearchBar onFilterCategory={(cat) => setActiveCategory(cat)} />

      {/* 3. Catalog Grid Section Header */}
      <motion.div
        id="catalog-grid"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 pt-4 border-b border-[#E5E0D8]"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E8468] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#9E8468]" />
            <span>{t.showcase.officialCollection}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E1D1B]">
            {t.showcase.availableItems} ({filteredProducts.length})
          </h2>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4 text-[#8C8377]" />
          <select
            value={sortBy}
            onChange={(e) => {
              sound.playSwitch();
              setSortBy(e.target.value as any);
            }}
            className="rounded-xl bg-[#F7F4EE] px-4 py-2.5 text-xs font-semibold text-[#1E1D1B] border border-[#E5E0D8] focus:outline-none focus:border-[#1E1D1B] shadow-2xs cursor-pointer"
          >
            <option value="featured">{t.showcase.sortFeatured}</option>
            <option value="price-low">{t.showcase.sortPriceLow}</option>
            <option value="price-high">{t.showcase.sortPriceHigh}</option>
          </select>
        </div>
      </motion.div>

      {/* 4. Dynamic Category Tabs (Pure Single-Language Labels & Pill Styling) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 overflow-x-auto py-6 custom-scrollbar"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`cursor-pointer whitespace-nowrap px-5 py-2.5 text-xs sm:text-sm transition-all duration-200 rounded-full ${
              activeCategory === cat.id
                ? "bg-[#1E1D1B] text-white font-semibold shadow-md shadow-[#1E1D1B]/15"
                : "bg-[#ECE7DE] text-[#4A433B] border border-[#DCD5C9] hover:bg-[#E2DDD3] hover:text-[#1E1D1B] font-semibold shadow-2xs"
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </motion.div>

      {/* 5. Product Grid with Staggered Entrance */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-2">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: (idx % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

    </section>
  );
};
