"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define types for cart items and context
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img?: string; // Optional, as not all items might have an image
  optionTitle?: string; // Optional, for product variations (e.g., size, color)
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, optionTitle?: string) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the Cart Context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Helper function to persist cart to localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

// CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(loadCartFromLocalStorage());
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.optionTitle === item.optionTitle
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.optionTitle === item.optionTitle
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, optionTitle?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(cartItem.id === id && cartItem.optionTitle === optionTitle)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
