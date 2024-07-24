import { ActionTypes, CartType } from "../types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart(item) {
        const products = get().products;
        const updatedProducts = [...products, item];

        const totalItems = updatedProducts.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        const totalPrice = updatedProducts.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );

        set({
          products: updatedProducts,
          totalItems,
          totalPrice,
        });
      },
      removeFromCart(item) {
        const products = get().products.filter(
          (product) => product.id !== item.id
        );

        const totalItems = products.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        const totalPrice = products.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );

        set({
          products,
          totalItems,
          totalPrice,
        });
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
