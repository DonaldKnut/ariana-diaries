import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

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
  removeFromCart: (id: string, optionTitle?: string) => void;
}

// Type definition for Zustand with persist
type CartStore = CartState & CartActions;
type MyPersist = (
  config: StateCreator<CartStore>,
  options: PersistOptions<CartStore>
) => StateCreator<CartStore>;

export const useCartStore = create<CartStore>(
  (persist as MyPersist)(
    (set, get) => ({
      products: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (item: CartItem) => {
        if (item.quantity <= 0) return; // Prevent adding items with non-positive quantity

        const products = get().products;
        console.log("Before adding:", products);

        const existingItemIndex = products.findIndex(
          (product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
        );

        let updatedProducts;
        if (existingItemIndex !== -1) {
          updatedProducts = [
            ...products.slice(0, existingItemIndex),
            {
              ...products[existingItemIndex],
              quantity: products[existingItemIndex].quantity + item.quantity,
            },
            ...products.slice(existingItemIndex + 1),
          ];
          console.log("Updated existing item:", updatedProducts);
        } else {
          updatedProducts = [...products, item];
          console.log("Added new item:", updatedProducts);
        }

        const totalItems = updatedProducts.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        const totalPrice = updatedProducts.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );

        console.log("After adding:", updatedProducts, {
          totalItems,
          totalPrice,
        });
        set({ products: updatedProducts, totalItems, totalPrice });
      },

      removeFromCart: (id: string, optionTitle?: string) => {
        const products = get().products;
        console.log("Before removal:", products);

        const updatedProducts = products
          .map((product) => {
            if (product.id === id && product.optionTitle === optionTitle) {
              return {
                ...product,
                quantity: product.quantity > 1 ? product.quantity - 1 : 0,
              };
            }
            return product;
          })
          .filter((product) => product.quantity > 0); // Remove products with quantity 0

        const totalItems = updatedProducts.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        const totalPrice = updatedProducts.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        );

        console.log("After removal:", updatedProducts, {
          totalItems,
          totalPrice,
        });
        set({ products: updatedProducts, totalItems, totalPrice });
      },
    }),
    { name: "cart" } // Consider hydration options based on your needs
  )
);
