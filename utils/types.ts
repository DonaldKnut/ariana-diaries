// utils/types.ts
import { IconType } from "react-icons";

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: IconType;
}

export type MenuItem = {
  id: string;
  label: string;
  path: string;
  icon?: IconType;
  subMenu?: SubMenuItem[];
};

export type ProductType = {
  id: string;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
};

export interface Option {
  label: string;
  value: string;
}

export interface FormControlItem {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  component: string;
  options: Option[];
  required?: boolean;
}

export const initialBlogFormData: BlogFormData = {
  title: "",
  description: "",
  image: "",
  category: "",
  excerpt: "",
  quote: "",
  content: "",
  userid: "",
  userimage: "",
};

export const formControls = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "Blog Title",
    component: "input",
  },
  {
    id: "description",
    label: "Description",
    type: "text",
    placeholder: "Short Description",
    component: "input",
  },
  {
    id: "category",
    label: "Category",
    placeholder: "Select Category",
    component: "select",
    options: ["Category1", "Category2"],
  },
  {
    id: "excerpt",
    label: "Excerpt",
    type: "text",
    placeholder: "Blog Excerpt",
    component: "input",
  },
  {
    id: "quote",
    label: "Quote",
    type: "text",
    placeholder: "Blog Quote",
    component: "input",
  },
];

export interface BlogFormData {
  title: string;
  description: string;
  image: string;
  category: string;
  excerpt: string;
  quote: string;
  content: string; // Add content here
  userid: string;
  userimage: string;
}
export interface Blog {
  id: string;
  title: string;
  description: string;
  category: string;
  userid: string;
  userImage: string;
  comments: string[];
  image: string;
  content: string;
  author: string;
}

export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  products: object[];
  status: string;
  createdAt: Date;
  intent_id?: string;
};
