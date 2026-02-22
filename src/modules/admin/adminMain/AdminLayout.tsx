"use client";
import React from "react";
import { Box } from "@mui/material";

interface AdminDashboardLayoutProps {
  darkMode: boolean;
  children: React.ReactNode;
}

export const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
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
