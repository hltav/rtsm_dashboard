"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "next-themes";
import { darkTheme } from "./dark-theme";
import { lightTheme } from "./light-theme";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const currentTheme = resolvedTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}