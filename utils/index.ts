import { FormControlItem, MenuItem, Option } from "./types";
import { CgMenuBoxed } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSearchCircleSharp } from "react-icons/io5";

// utils/menuItems.ts

export const menuItems: MenuItem[] = [
  {
    id: "products",
    label: "Products",
    path: "/shop",
    icon: HiOutlineShoppingBag,
    subMenu: [
      {
        id: "menu",
        label: "Menu",
        path: "/menu",
        icon: CgMenuBoxed,
      },
      {
        id: "shop",
        label: "Shop",
        path: "/shop",
        icon: HiOutlineShoppingBag,
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    path: "/blog",
    subMenu: [
      {
        id: "blog1",
        label: "Blog Post 1",
        path: "/blog/post1",
        icon: CgMenuBoxed,
      },
      {
        id: "blog2",
        label: "Blog Post 2",
        path: "/blog/post2",
        icon: CgMenuBoxed,
      },
    ],
  },
  {
    id: "search",
    label: "Search",
    path: "/search",
    icon: IoSearchCircleSharp,
  },
  {
    id: "about",
    label: "About",
    path: "/about",
  },
];

export const categories: Option[] = [
  {
    value: "beauty",
    label: "Beauty",
  },
  {
    value: "entrepreneurship",
    label: "Entrepreneurship",
  },
  {
    value: "personal-growth-and-development",
    label: "Personal-Growth-and-Development",
  },
  {
    value: "application",
    label: "Application",
  },
  {
    value: "data",
    label: "Data",
  },
  {
    value: "software",
    label: "Software",
  },
  {
    value: "tech",
    label: "Technology",
  },
  {
    value: "science",
    label: "Science",
  },
];

export const formControls: FormControlItem[] = [
  {
    id: "title",
    label: "Title",
    placeholder: "Enter Blog Title",
    type: "text",
    component: "input",
    options: [],
  },
  {
    id: "description",
    label: "Description",
    placeholder: "Enter Blog Description",
    type: "text",
    component: "textarea",
    options: [],
  },
  {
    id: "category",
    label: "Category",
    placeholder: "Choose Blog Category",
    type: "",
    component: "select",
    options: categories,
  },
];

export const initialBlogFormData = {
  title: "",
  description: "",
  image: "",
  category: "",
  content: "",
};
