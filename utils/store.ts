import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

interface CartItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  optionTitle?: string;
  img?: string;
}

interface CartState {
  products: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartActions {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
}

export const useCartStore = create(
  persist<CartState & CartActions>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (item: CartItem) => {
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
      removeFromCart: (item: CartItem) => {
        const products = get().products;
        console.log("Before removal:", products);
        console.log("Item to remove:", item);

        const updatedProducts = products.filter(
          (product) => !(product.id === item.id && product.title === item.title)
        );

        const totalItems = updatedProducts.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        const totalPrice = updatedProducts.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );

        console.log("After removal:", updatedProducts);

        set({
          products: updatedProducts,
          totalItems,
          totalPrice,
        });
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
