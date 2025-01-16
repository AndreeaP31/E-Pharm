import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product, pharmacy) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.product._id === product._id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, pharmacy, quantity: 1 }] };
    }),
  clearCart: () => set({ cart: [] }),
}));
