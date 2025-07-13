'use client';
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SportEvent } from "@/types/carousel-types";
import CustomCarousel from "@/components/ui/CustomCarousel";
import DashboardNavbar from "@/components/dashboard/layout/navbar/navbar";
import Sidebar from "@/components/dashboard/layout/sidebar/sidebar";

interface DashboardPageLayoutProps {
  children: React.ReactNode;
}

const DashboardPageLayout: React.FC<DashboardPageLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const APP_BAR_TOOLBAR_HEIGHT = 64;
  const CAROUSEL_BAR_ACTUAL_HEIGHT = 90;
  const TOP_BAR_COMBINED_HEIGHT =
    APP_BAR_TOOLBAR_HEIGHT + CAROUSEL_BAR_ACTUAL_HEIGHT;

  const demoEvents: SportEvent[] = [
    // (mantém os eventos que você já tem)
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <DashboardNavbar
        carousel={<CustomCarousel items={demoEvents} autoPlay={true} />}
      />

      <Sidebar topOffset={TOP_BAR_COMBINED_HEIGHT} isMobile={isMobile} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: `${TOP_BAR_COMBINED_HEIGHT + 24}px`,
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardPageLayout;
