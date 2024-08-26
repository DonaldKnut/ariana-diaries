import { FormControlItem, MenuItem, Option } from "./types";
import { CgMenuBoxed } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSearchCircleSharp } from "react-icons/io5";
import { PiArticleMediumBold } from "react-icons/pi";
import { FcPackage } from "react-icons/fc";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

// utils/menuItems.ts

export const menuItems = (isAdmin: boolean): MenuItem[] => [
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
      ...(isAdmin
        ? [
            {
              id: "add",
              label: "Add Products",
              path: "/add",
              icon: TbSquareRoundedPlusFilled,
            },
          ]
        : []),
    ],
  },
  {
    id: "blog",
    label: "Blog",
    path: "/blog",
    subMenu: [
      {
        id: "blog1",
        label: "Blog",
        path: "/blog",
        icon: PiArticleMediumBold,
      },
      ...(isAdmin
        ? [
            {
              id: "blog2",
              label: "Orders",
              path: "/orders",
              icon: FcPackage,
            },
          ]
        : []),
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

export const categories = [
  { value: "beauty", label: "Beauty" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  {
    value: "personal-growth-and-development",
    label: "Personal Growth and Development",
  },
  { value: "application", label: "Application" },
  { value: "data", label: "Data" },
  { value: "software", label: "Software" },
  { value: "tech", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "health", label: "Health" },
  { value: "travel", label: "Travel" },
  { value: "culture_and_lifestyles", label: "Culture and Lifestyles" },
  { value: "leadership", label: "leadership" },
];

export const formControls: FormControlItem[] = [
  {
    id: "title",
    label: "Title",
    placeholder: "Enter Blog Title",
    type: "text",
    component: "input",
    options: [],
    required: true,
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

export const initialBlogFormData: BlogFormData = {
  title: "",
  description: "",
  image: "",
  category: "",
  excerpt: "",
  quote: "",
  content: "", // Add initial value for content
  userid: "",
  userimage: "",
};
export interface BlogFormData {
  title: string;
  description: string;
  image: string;
  category: string;
  excerpt: string;
  quote: string;
  content: string;
  userid: string; // Define userid as a string property
  userimage: string; // Define userimage as a string property
}
