"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface DashboardContextType {
  selectedPage: string;
  setSelectedPage: (key: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = searchParams.get("page") || "main";
  const [selectedPage, setSelectedPage] = useState(initialPage);

  const setSelectedPageWithUrl = (key: string) => {
    setSelectedPage(key);
    router.push(`/dashboard?page=${key}`, { scroll: false });
  };

  useEffect(() => {
    const page = searchParams.get("page") || "main";
    setSelectedPage(page);
  }, [searchParams]);

  return (
    <DashboardContext.Provider
      value={{ selectedPage, setSelectedPage: setSelectedPageWithUrl }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboard deve ser usado dentro de um DashboardProvider"
    );
  }
  return context;
};
