"use client";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "../theme/light-theme";
import { darkTheme } from "../theme/dark-theme";
import { useSystemTheme } from "@/hooks/useSystemTheme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeModeContextType {
  toggleThemeMode: () => void;
  mode: ThemeMode;
  currentTheme: "light" | "dark";
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  toggleThemeMode: () => {},
  mode: "system",
  currentTheme: "light",
});

export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("system"); // Padrão: system
  const systemTheme = useSystemTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
      if (savedTheme) {
        setMode(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && mode !== "system") {
      localStorage.setItem("theme", mode);
    }
  }, [mode]);

  const toggleThemeMode = () => {
    setMode((prevMode) => {
      if (prevMode === "light") return "dark";
      if (prevMode === "dark") return "system";
      return "light"; // system -> light
    });
  };

  const currentTheme = mode === "system" ? systemTheme : mode;

  const theme = useMemo(
    () => (currentTheme === "light" ? lightTheme : darkTheme),
    [currentTheme]
  );

  return (
    <ThemeModeContext.Provider value={{ toggleThemeMode, mode, currentTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
