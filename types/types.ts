import { IProduct } from "../models/Product";

export type MenuType = {
  id: string;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export type BlogFormData = {
  title: string;
  description: string;
  image: string;
  category: string;
  excerpt: string;
  quote: string;
  content: string;
  userid: string;
  userimage: string;
};

export type ProductType = {
  price: number;
  id: string;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
  quantity: number;
  options?: { title: string; additionalPrice: number }[];
};

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  products: CartItemType[];
  status: string;
  createdAt: Date;
  intent_id?: String;
};

export type CartItemType = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
};
