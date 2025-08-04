"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  selectedPage: string;
  setSelectedPage: (key: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPage, setSelectedPage] = useState("main");

  const setSelectedPageWithClose = (key: string) => {
    setSelectedPage(key);
  };

  return (
    <DashboardContext.Provider
      value={{ selectedPage, setSelectedPage: setSelectedPageWithClose }}
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
