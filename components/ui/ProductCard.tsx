"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, Sparkles, Plus, Check, Flame, Eye } from "lucide-react";
import { Product } from "@/lib/products";
import { useCartStore } from "@/hooks/useCartStore";
import { useTranslation } from "@/hooks/useLanguageStore";
import { sound } from "@/lib/audio";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const setQuickView = useCartStore((state) => state.setQuickViewProduct);
  const { t } = useTranslation();

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const displayImage = isHovered && activeColor.images[1]
    ? activeColor.images[1]
    : activeColor.images[0];

  const handleOpenBuyModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setQuickView(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: `${product.id}-${activeColor.name}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      sku: `${product.id}-${selectedSize}`,
      selectedColor: activeColor.name,
      selectedSize,
      priceDZD: product.priceDZD,
      priceEUR: product.priceEUR,
      image: activeColor.images[0],
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white border border-[#E5E0D8] shadow-[0_4px_20px_rgba(40,30,20,0.04)] rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(40,30,20,0.09)] hover:-translate-y-1 hover:border-[#D0C7BC] relative flex flex-col justify-between w-full"
    >
      {/* Top Badges */}
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
        {product.isLimitedDrop ? (
          <span className="flex items-center gap-1.5 rounded-full bg-[#F4EFEA]/95 px-3 py-1 text-[10px] sm:text-xs font-semibold text-[#7A5F43] border border-[#E2D8CC] shadow-2xs backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-[#9E8468] fill-[#9E8468]" />
            <span>{t.card.dropBadge} {product.dropNumber}</span>
          </span>
        ) : (
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-[#4A433B] border border-[#E5E0D8] shadow-2xs backdrop-blur-xs">
            {t.card.essential}
          </span>
        )}

        {product.stockCount <= 6 && (
          <span className="flex items-center gap-1 rounded-full bg-[#FBF0EE]/95 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-[#8C3A33] border border-[#F2D1CE] shadow-2xs backdrop-blur-xs">
            <Flame className="w-3 h-3 text-[#B83D30] animate-pulse" />
            <span>{product.stockCount} {t.card.remaining}</span>
          </span>
        )}
      </div>

      {/* Image Wrapper with Tinted Inner Frame & Full Width Preserved Aspect Ratio */}
      <div
        onClick={handleOpenBuyModal}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#F5F2ED] border border-[#EAE4DC] cursor-pointer"
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-106"
        />
        
        {/* Quick View Pill on Hover */}
        <div className="absolute inset-0 bg-[#1E1D1B]/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#1E1D1B] shadow-md border border-[#E5E0D8]">
            <Eye className="w-3.5 h-3.5 text-[#4A433B]" />
            <span>{t.card.quickInspect}</span>
          </span>
        </div>
      </div>

      {/* Product Details (Stacked Cleanly) */}
      <div className="mt-4 flex flex-col gap-2.5">
        <div className="cursor-pointer" onClick={handleOpenBuyModal}>
          <h3 className="text-base sm:text-lg font-bold text-[#1E1D1B] line-clamp-1 group-hover:text-[#9E8468] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#8C8377] line-clamp-1 mt-0.5 font-normal">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between gap-1 pt-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-extrabold text-[#1E1D1B]">
              {product.priceDZD.toLocaleString()} DZD
            </span>
            <span className="text-xs text-[#8C8377] font-medium">
              ({product.priceEUR}€)
            </span>
          </div>

          {product.originalPriceDZD && (
            <span className="text-xs text-[#A0988D] line-through">
              {product.originalPriceDZD.toLocaleString()} DZD
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playSwitch();
                  setSelectedColorIdx(idx);
                }}
                className={`h-5 w-5 rounded-full border transition-all cursor-pointer ${
                  selectedColorIdx === idx
                    ? "border-[#1E1D1B] scale-115 ring-2 ring-[#1E1D1B]/20"
                    : "border-[#E5E0D8] opacity-75 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <span className="text-xs text-[#8C8377] font-medium truncate max-w-[120px]">
            {activeColor.name}
          </span>
        </div>

        {/* Size Selection Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                sound.playSwitch();
                setSelectedSize(size);
              }}
              className={`rounded-xl px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                selectedSize === size
                  ? "bg-[#1E1D1B] text-white shadow-xs"
                  : "bg-[#ECE7DE] text-[#4A433B] hover:bg-[#E2DDD3]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* 1-Click WhatsApp Direct CTA (Opens Buy Modal) */}
        <button
          onClick={handleOpenBuyModal}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F4E3D] hover:bg-[#163A2E] py-3 text-xs sm:text-sm font-semibold text-white transition-all shadow-sm shadow-[#1F4E3D]/15 active:scale-98 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
          <span className="truncate">{t.card.orderViaWhatsApp}</span>
        </button>

        {/* Add to Bag */}
        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-[#6B645C] hover:text-[#1E1D1B] hover:bg-[#ECE7DE] transition-colors cursor-pointer"
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#1F4E3D]" />
              <span className="text-[#1F4E3D] font-bold">{t.card.addedToBag}</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-[#8C8377]" />
              <span>{t.card.addToBag}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
