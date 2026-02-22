/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container } from "@mui/material";
import { useMemo, useState } from "react";
import { AdminUserTitle } from "./components/AdminUserTitle";
import { AdminUserDash } from "./components/AdminUserDash";
import { AdminUserFilter } from "./components/AdminUserFilter";
import { AdminUserTable } from "./components/AdminUserTable";

export const AppUsers = () => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = useMemo(() => {
    return darkMode
      ? {
          bg: "#0F172A",
          paper: "#1E293B",
          textPrimary: "#F8FAFC",
          textSecondary: "#94A3B8",
          accent: "#FFC83D",
          success: "#4ADE80",
          error: "#F87171",
          border: "rgba(148, 163, 184, 0.15)",
          gradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
        }
      : {
          bg: "#F1F5F9",
          paper: "#FFFFFF",
          textPrimary: "#1E293B",
          textSecondary: "#64748B",
          accent: "#E0A800",
          success: "#22C55E",
          error: "#EF4444",
          border: "rgba(0, 0, 0, 0.05)",
          gradient: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
        };
  }, [darkMode]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.bg,
        color: theme.textPrimary,
        p: { xs: 2, md: 4 },
        transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Container maxWidth="xl">
        {/* Superior: Título e Botões de Ação */}
        <AdminUserTitle />
        {/* Dash de KPIs Rápidos */}
        <AdminUserDash />
        {/* Filtros e Busca de E-mail */}
        <AdminUserFilter />
        {/* Tabela de Gestão */}
        <AdminUserTable />
      </Container>
    </Box>
  );
};
