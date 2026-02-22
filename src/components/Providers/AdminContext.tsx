"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface AdminContextType {
  selectedPage: string;
  setSelectedPage: (key: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Páginas padrão para Admin: users, finance, system, etc.
  const initialPage = searchParams.get("page") || "adminMain";
  const [selectedPage, setSelectedPage] = useState(initialPage);

  const setSelectedPageWithUrl = (key: string) => {
    setSelectedPage(key);
    // Agora aponta para a rota /admin
    router.push(`/admin?page=${key}`, { scroll: false });
  };

  useEffect(() => {
    const page = searchParams.get("page") || "adminMain";
    setSelectedPage(page);
  }, [searchParams]);

  return (
    <AdminContext.Provider
      value={{ selectedPage, setSelectedPage: setSelectedPageWithUrl }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin deve ser usado dentro de um AdminProvider");
  }
  return context;
};
