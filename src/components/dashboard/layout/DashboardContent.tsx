import React from "react";
import { Typography } from "@mui/material";
import StatsCards from "@/components/ui/cards/StatsCards";

interface DashboardContentProps {
  children?: React.ReactNode;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ children }) => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Visão Geral do Dashboard
      </Typography>
      <StatsCards />

      {/* Renderiza children se existir */}
      {children}
    </>
  );
};

export default DashboardContent;
