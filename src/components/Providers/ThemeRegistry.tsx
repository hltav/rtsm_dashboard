// "use client";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useMemo,
//   useEffect,
// } from "react";
// import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import { lightTheme } from "../theme/light-theme";
// import { darkTheme } from "../theme/dark-theme";
// import { useSystemTheme } from "@/hooks/useSystemTheme";

// type ThemeMode = "light" | "dark" | "system";

// interface ThemeModeContextType {
//   toggleThemeMode: () => void;
//   mode: ThemeMode;
//   currentTheme: "light" | "dark";
// }

// const ThemeModeContext = createContext<ThemeModeContextType>({
//   toggleThemeMode: () => {},
//   mode: "system",
//   currentTheme: "light",
// });

// export const useThemeMode = () => useContext(ThemeModeContext);

// export function ThemeRegistry({ children }: { children: React.ReactNode }) {
//   const [mode, setMode] = useState<ThemeMode>("system");
//   const systemTheme = useSystemTheme();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
//       if (savedTheme) {
//         setMode(savedTheme);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined" && mode !== "system") {
//       localStorage.setItem("theme", mode);
//     }
//   }, [mode]);

//   const toggleThemeMode = () => {
//     setMode((prevMode) => {
//       if (prevMode === "light") return "dark";
//       if (prevMode === "dark") return "system";
//       return "light";
//     });
//   };

//   const currentTheme = mode === "system" ? systemTheme : mode;

//   const theme = useMemo(
//     () => (currentTheme === "light" ? lightTheme : darkTheme),
//     [currentTheme]
//   );

//   return (
//     <ThemeModeContext.Provider value={{ toggleThemeMode, mode, currentTheme }}>
//       <MuiThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </MuiThemeProvider>
//     </ThemeModeContext.Provider>
//   );
// }

"use client";
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "../theme/light-theme";
import { darkTheme } from "../theme/dark-theme";

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
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ThemeMode>("light"); // Valor padrão fixo inicial

  useEffect(() => {
    setMounted(true);
    // Só carrega do localStorage depois da montagem
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme) {
      setMode(savedTheme);
    }
  }, []);

  const systemTheme = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const toggleThemeMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : prevMode === "dark" ? "system" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newMode);
      }
      return newMode;
    });
  };

  const currentTheme = mode === "system" ? systemTheme : mode;
  const theme = useMemo(() => (currentTheme === "light" ? lightTheme : darkTheme), [currentTheme]);

  // Para evitar hidratação, use tema light até montar no cliente
  const themeToUse = mounted ? theme : lightTheme;

  return (
    <ThemeModeContext.Provider value={{ toggleThemeMode, mode, currentTheme }}>
      <MuiThemeProvider theme={themeToUse}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}