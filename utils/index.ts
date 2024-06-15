import { FormControlItem, MenuItem, Option } from "./types";

export const menuItems: MenuItem[] = [
  {
    id: "about",
    label: "About",
    path: "/about",
  },
  {
    id: "category",
    label: "Category",
    path: "/category/application",
  },
  {
    id: "blogs",
    label: "Blogs",
    path: "/blogs",
  },
  {
    id: "search",
    label: "Search",
    path: "/search",
  },
  {
    id: "shop",
    label: "Shop",
    path: "/shop",
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

export const firebaseConfig = {
  apiKey: "AIzaSyCjwnA4BvzNoc0Sgq2yCZopbxENK-gzO8s",
  authDomain: "ariana-blog.firebaseapp.com",
  projectId: "ariana-blog",
  storageBucket: "ariana-blog.appspot.com",
  messagingSenderId: "991320699319",
  appId: "1:991320699319:web:e7351bd2a8b353e42cb832",
  measurementId: "G-S56GJFBY2G",
};

export const initialBlogFormData = {
  title: "",
  description: "",
  image: "",
  category: "",
};
