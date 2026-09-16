// hooks/useCartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, CustomerOrderDetails } from "@/lib/whatsapp";
import { Product } from "@/lib/products";
import { sound } from "@/lib/audio";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  quickViewProduct: Product | null;
  soundEnabled: boolean;
  customerDetails: CustomerOrderDetails;
  
  // Actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  setQuickViewProduct: (product: Product | null) => void;
  toggleSound: () => void;
  setCustomerDetails: (details: Partial<CustomerOrderDetails>) => void;
  
  // Getters
  getItemCount: () => number;
  getSubtotalDZD: () => number;
  getSubtotalEUR: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      quickViewProduct: null,
      soundEnabled: true,
      customerDetails: {
        customerName: "",
        phone: "",
        shippingAddress: "",
        city: "",
        notes: "",
      },

      addItem: (itemData) => {
        sound.playSuccess();
        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.id === itemData.id);
          const quantityToAdd = itemData.quantity || 1;

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantityToAdd;
            return { items: updatedItems, isCartOpen: true };
          }

          const newItem: CartItem = {
            ...itemData,
            quantity: quantityToAdd,
          };
          return { items: [...state.items, newItem], isCartOpen: true };
        });
      },

      removeItem: (id) => {
        sound.playClick();
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, delta) => {
        sound.playClick();
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);

          return { items: updatedItems };
        });
      },

      clearCart: () => {
        sound.playClick();
        set({ items: [] });
      },

      setCartOpen: (open) => {
        sound.playClick();
        set({ isCartOpen: open });
      },

      toggleCart: () => {
        sound.playClick();
        set((state) => ({ isCartOpen: !state.isCartOpen }));
      },

      setQuickViewProduct: (product) => {
        sound.playClick();
        set({ quickViewProduct: product });
      },

      toggleSound: () => {
        const next = !get().soundEnabled;
        sound.setEnabled(next);
        if (next) sound.playClick();
        set({ soundEnabled: next });
      },

      setCustomerDetails: (details) => {
        set((state) => ({
          customerDetails: {
            ...state.customerDetails,
            ...details,
          },
        }));
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotalDZD: () => {
        return get().items.reduce((total, item) => total + item.priceDZD * item.quantity, 0);
      },

      getSubtotalEUR: () => {
        return get().items.reduce((total, item) => total + item.priceEUR * item.quantity, 0);
      },
    }),
    {
      name: "boutique-drop-cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        soundEnabled: state.soundEnabled,
        customerDetails: state.customerDetails,
      }),
    }
  )
);
