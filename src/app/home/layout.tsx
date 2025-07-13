/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <CssBaseline />
      {children} {/* Isso já será sua página, como HomePage */}
    </Box>
  );
};

export default AppLayout;
