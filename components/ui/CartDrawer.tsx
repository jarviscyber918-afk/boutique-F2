"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Copy,
  Check,
  Truck,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/hooks/useCartStore";
import { useTranslation } from "@/hooks/useLanguageStore";
import { generateWhatsAppCheckoutUrl, formatOrderSummaryText } from "@/lib/whatsapp";
import { STORE_CONFIG } from "@/lib/products";
import { sound } from "@/lib/audio";

export const CartDrawer: React.FC = () => {
  const isOpen = useCartStore((state) => state.isCartOpen);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const subtotalDZD = useCartStore((state) => state.getSubtotalDZD());
  
  const customerDetails = useCartStore((state) => state.customerDetails);
  const setCustomerDetails = useCartStore((state) => state.setCustomerDetails);

  const { t, language } = useTranslation();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const threshold = STORE_CONFIG.freeShippingThresholdDZD;
  const progress = Math.min(100, (subtotalDZD / threshold) * 100);
  const remaining = Math.max(0, threshold - subtotalDZD);

  const handleWhatsAppCheckout = async () => {
    sound.playSuccess();
    
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#1F4E3D", "#9E8468", "#1E1D1B"],
      });
    } catch {
      // Ignore
    }

    try {
      const response = await fetch("/api/checkout/sign-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            selectedColor: i.selectedColor,
            selectedSize: i.selectedSize,
            quantity: i.quantity,
            clientPriceDZD: i.priceDZD,
          })),
          orderDetails: customerDetails,
          language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.whatsAppUrl) {
          window.open(data.whatsAppUrl, "_blank");
          return;
        }
      }
    } catch {
      // Fallback below
    }

    const url = generateWhatsAppCheckoutUrl(
      STORE_CONFIG.whatsAppPhone,
      items,
      customerDetails,
      language
    );

    window.open(url, "_blank");
  };

  const handleCopySummary = () => {
    sound.playClick();
    const text = formatOrderSummaryText(items, customerDetails, language);
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-[#1E1D1B]/50 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className={`fixed inset-y-0 ${language === "ar" ? "left-0 pr-6 sm:pr-10" : "right-0 pl-6 sm:pl-10"} max-w-full flex`}>
        <div className="w-screen max-w-md bg-[#FCFBFA] border-x border-[#E5E0D8] text-[#1E1D1B] flex flex-col justify-between shadow-[0_20px_50px_rgba(40,30,20,0.18)] animate-slide-in">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5E0D8] flex items-center justify-between bg-[#F7F4EE]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1F4E3D]" />
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1E1D1B]">{t.cart.title}</h2>
                <p className="text-xs text-[#7A7269] font-medium">
                  {t.cart.itemsAllocated(items.length)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCartOpen(false)}
              className="rounded-full p-2 text-[#6B645C] hover:text-[#1E1D1B] hover:bg-[#ECE7DE] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-4 sm:px-5 py-2.5 bg-[#F2ECE1] border-b border-[#DDD5C7]">
            <div className="flex items-center justify-between text-xs mb-1 font-medium">
              <span className="flex items-center gap-1.5 text-[#2C2723]">
                <Truck className="w-3.5 h-3.5 text-[#1F4E3D]" />
                {remaining === 0 ? (
                  <span className="font-bold text-[#1F4E3D]">{t.cart.freeCourierUnlocked}</span>
                ) : (
                  <span>{t.cart.addMoreForFreeCourier(remaining)}</span>
                )}
              </span>
              <span className="font-bold text-[#1F4E3D]">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#DDD5C7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1F4E3D] transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#ECE7DE] flex items-center justify-center text-[#6B645C] border border-[#DCD5C9]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1E1D1B]">{t.cart.emptyTitle}</h3>
                  <p className="text-xs text-[#7A7269] mt-0.5 max-w-xs font-normal">
                    {t.cart.emptyDesc}
                  </p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-xl bg-[#1E1D1B] px-5 py-2 text-xs font-semibold text-white hover:bg-[#33302B] transition-colors shadow-xs cursor-pointer"
                >
                  {t.cart.exploreBtn}
                </button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-2xl bg-[#F7F4EE] p-3 border border-[#E5DFD5] transition-all hover:border-[#DCD5C9]"
                  >
                    {/* Item Image */}
                    <div className="relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-xl bg-[#F5F2ED] border border-[#EAE4DC]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1E1D1B] line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#8C827A] hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#7A7269]">
                          <span className="bg-[#ECE7DE] text-[#2C2723] px-1.5 py-0.5 rounded font-bold">
                            {item.selectedSize}
                          </span>
                          <span>•</span>
                          <span>{item.selectedColor}</span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E5DFD5]">
                        <div className="flex items-center gap-1.5 rounded-lg bg-white px-1.5 py-0.5 border border-[#DCD5C9]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-0.5 text-[#6B645C] hover:text-[#1E1D1B] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-[#1E1D1B]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-0.5 text-[#6B645C] hover:text-[#1E1D1B] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#1E1D1B]">
                          {(item.priceDZD * item.quantity).toLocaleString()} DZD
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Delivery Form Toggle */}
                <div className="pt-1">
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="w-full flex items-center justify-between rounded-xl bg-[#F7F4EE] p-2.5 text-xs font-medium text-[#3D3833] border border-[#E5DFD5] hover:bg-[#ECE7DE] transition-colors cursor-pointer"
                  >
                    <span>{t.cart.deliveryToggle}</span>
                    <span className="text-[#1F4E3D] font-bold">
                      {showAddressForm ? "▲" : "▼"}
                    </span>
                  </button>

                  {showAddressForm && (
                    <div className="mt-2 space-y-2 rounded-2xl bg-[#F7F4EE] p-3.5 border border-[#E5DFD5]">
                      <div>
                        <label className="block text-xs text-[#6B645C] mb-0.5 font-medium">
                          {t.cart.fullName}
                        </label>
                        <input
                          type="text"
                          placeholder="Karim Mansouri"
                          value={customerDetails.customerName || ""}
                          onChange={(e) =>
                            setCustomerDetails({ customerName: e.target.value })
                          }
                          className="w-full rounded-lg bg-white px-2.5 py-1.5 text-xs text-[#1E1D1B] border border-[#DCD5C9] focus:border-[#1E1D1B] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-[#6B645C] mb-0.5 font-medium">
                            {t.cart.phone}
                          </label>
                          <input
                            type="text"
                            placeholder="05 55 12 34 56"
                            value={customerDetails.phone || ""}
                            onChange={(e) =>
                              setCustomerDetails({ phone: e.target.value })
                            }
                            className="w-full rounded-lg bg-white px-2.5 py-1.5 text-xs text-[#1E1D1B] border border-[#DCD5C9] focus:border-[#1E1D1B] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#6B645C] mb-0.5 font-medium">
                            {t.cart.city}
                          </label>
                          <input
                            type="text"
                            placeholder="Alger (16)"
                            value={customerDetails.city || ""}
                            onChange={(e) =>
                              setCustomerDetails({ city: e.target.value })
                            }
                            className="w-full rounded-lg bg-white px-2.5 py-1.5 text-xs text-[#1E1D1B] border border-[#DCD5C9] focus:border-[#1E1D1B] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-[#6B645C] mb-0.5 font-medium">
                          {t.cart.address}
                        </label>
                        <input
                          type="text"
                          placeholder="Rue Didouche Mourad, Alger Centre"
                          value={customerDetails.shippingAddress || ""}
                          onChange={(e) =>
                            setCustomerDetails({ shippingAddress: e.target.value })
                          }
                          className="w-full rounded-lg bg-white px-2.5 py-1.5 text-xs text-[#1E1D1B] border border-[#DCD5C9] focus:border-[#1E1D1B] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Module */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E5E0D8] bg-[#F7F4EE] space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-[#6B645C] font-medium">
                  <span>{t.cart.subtotal}</span>
                  <span className="text-[#1E1D1B] font-bold">{subtotalDZD.toLocaleString()} DZD</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#6B645C] font-medium">
                  <span>{t.cart.deliveryFee}</span>
                  <span className="text-[#1F4E3D] font-bold">
                    {subtotalDZD >= threshold ? t.cart.freeFee : "600 DZD"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#1E1D1B] pt-1.5 border-t border-[#E5DFD5]">
                  <span>{t.cart.total}</span>
                  <span className="text-[#1F4E3D] text-base sm:text-lg">
                    {(subtotalDZD >= threshold ? subtotalDZD : subtotalDZD + 600).toLocaleString()} DZD
                  </span>
                </div>
              </div>

              {/* 1-Click WhatsApp Checkout CTA */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1F4E3D] hover:bg-[#163A2E] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-md shadow-[#1F4E3D]/20 active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.cart.checkoutWhatsApp}</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              {/* Secondary Copy Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[#DCD5C9] bg-white hover:bg-[#ECE7DE] py-2 text-xs text-[#3D3833] font-medium transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1F4E3D]" />
                      <span className="text-[#1F4E3D] font-bold">{t.cart.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.cart.copySummary}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={clearCart}
                  className="rounded-xl border border-[#DCD5C9] bg-white px-3 py-2 text-xs text-[#8C827A] hover:text-rose-600 font-medium transition-colors cursor-pointer"
                  title="Vider le panier"
                >
                  {t.cart.reset}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#8C827A] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E3D]" />
                <span>{t.cart.stockLockNotice}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
