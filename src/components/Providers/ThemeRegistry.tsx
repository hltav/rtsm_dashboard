"use client";
import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "../theme/light-theme";
import { darkTheme } from "../theme/dark-theme";


interface ThemeModeContextType {
  toggleThemeMode: () => void;
  mode: "light" | "dark";
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  toggleThemeMode: () => {},
  mode: "light",
});

export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ toggleThemeMode, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
