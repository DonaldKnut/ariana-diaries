"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import Spinner from "../components/ui";
import { Blog, BlogFormData } from "../utils/types";
import { initialBlogFormData } from "../utils";
import { usePathname, useRouter } from "next/navigation";

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  formData: BlogFormData;
  setFormData: Dispatch<SetStateAction<BlogFormData>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchResults: Blog[];
  setSearchResults: Dispatch<SetStateAction<Blog[]>>;
};

const initialState: ContextType = {
  loading: false,
  setLoading: () => {},
  formData: initialBlogFormData, // Use initialBlogFormData for initial values
  setFormData: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  searchResults: [],
  setSearchResults: () => {},
};

export const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>(initialState.formData);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Blog[]>([]);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  if (session === undefined) return <Spinner />;

  if (session === null && pathname === "/create") router.push("/");

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        formData,
        setFormData,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
