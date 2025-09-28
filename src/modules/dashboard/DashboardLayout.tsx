"use client";
import React from "react";
import { Box } from "@mui/material";

interface DashboardLayoutProps {
  darkMode: boolean;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </>
  );
};
