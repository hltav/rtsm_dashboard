"use client";

import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { darkTheme } from "@/components/theme/dark-theme";
import { lightTheme } from "@/components/theme/light-theme";

interface DashboardLayoutProps {
  darkMode: boolean;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  darkMode,
  children,
}) => {
  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>{children}</Box>
    </ThemeProvider>
  );
};
