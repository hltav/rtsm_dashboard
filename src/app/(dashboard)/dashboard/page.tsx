'use client';
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SportEvent } from "@/types/carousel-types";
import CustomCarousel from "@/components/ui/CustomCarousel";
import DashboardNavbar from "@/components/dashboard/layout/navbar/navbar";
import Sidebar from "@/components/dashboard/layout/sidebar/sidebar";

interface DashLayoutProps {
  children: React.ReactNode;
}

const DashLayout: React.FC<DashLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const APP_BAR_TOOLBAR_HEIGHT = 64;
  const CAROUSEL_BAR_ACTUAL_HEIGHT = 90;
  const TOP_BAR_COMBINED_HEIGHT =
    APP_BAR_TOOLBAR_HEIGHT + CAROUSEL_BAR_ACTUAL_HEIGHT;

  const demoEvents: SportEvent[] = [
    {
      id: "1",
      title: "Futebol: Brasil vs Argentina",
      description: "Copa América - Semifinal",
      imageUrl: "https://placehold.co/250x200/007bff/ffffff?text=Futebol",
      date: "15/07/2025",
    },
    {
      id: "2",
      title: "Basquete: NBA Finals - Jogo 7",
      description: "Warriors vs Celtics",
      imageUrl: "https://placehold.co/250x200/28a745/ffffff?text=Basquete",
      date: "20/06/2025",
    },
    {
      id: "3",
      title: "Tênis: Wimbledon - Final Masculina",
      description: "Grand Slam",
      imageUrl: "https://placehold.co/250x200/ffc107/000000?text=Tenis",
      date: "05/07/2025",
    },
    {
      id: "4",
      title: "Fórmula 1: Grande Prêmio do Canadá",
      description: "F1 Temporada 2025",
      imageUrl: "https://placehold.co/250x200/dc3545/ffffff?text=F1",
      date: "29/06/2025",
    },
    {
      id: "5",
      title: "Vôlei: Campeonato Mundial",
      description: "Brasil vs EUA",
      imageUrl: "https://placehold.co/250x200/800080/ffffff?text=Volei",
      date: "01/08/2025",
    },
    {
      id: "6",
      title: "Boxe: Luta do Século",
      description: "Título Peso Pesado",
      imageUrl: "https://placehold.co/250x200/FF4500/ffffff?text=Boxe",
      date: "10/09/2025",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* AppBar with Carousel */}
      <DashboardNavbar
        carousel={<CustomCarousel items={demoEvents} autoPlay={true} />}
      />

      {/* Sidebar */}
      <Sidebar topOffset={TOP_BAR_COMBINED_HEIGHT} isMobile={isMobile} />

      {/* Main Content */}
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

export default DashLayout;
