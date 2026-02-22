/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, IconButton, Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Users, Sun, Moon, Download, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { mockUsers } from "../interfaces/mochAdminUsers.data";

export const AdminUserTitle = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [users, setUsers] = useState(mockUsers);
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
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { md: "center" },
        mb: 4,
        gap: 3,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, letterSpacing: "-0.02em", mb: 0.5 }}
        >
          Diretório de Membros
        </Typography>
        <Typography
          sx={{
            color: theme,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Users size={16} /> {users.length} usuários registrados no ecossistema
        </Typography>
      </Box>

      <Stack direction="row" spacing={2}>
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            bgcolor: theme.paper,
            border: `1px solid ${theme.border}`,
            color: theme.textPrimary,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
        <Button
          variant="contained"
          startIcon={<Download size={18} />}
          sx={{
            bgcolor: theme.paper,
            border: `1px solid ${theme.border}`,
            color: theme.textPrimary,
            "&:hover": { bgcolor: theme.paper, opacity: 0.8 },
          }}
        >
          Exportar
        </Button>
        <Button
          variant="contained"
          startIcon={<UserPlus size={18} />}
          sx={{
            bgcolor: theme.accent,
            color: "#1A2B42",
            fontWeight: 700,
            px: 3,
            "&:hover": { bgcolor: theme.accent, transform: "translateY(-2px)" },
            transition: "0.2s",
          }}
        >
          Criar Usuário
        </Button>
      </Stack>
    </Box>
  );
};

function setDarkMode(arg0: boolean) {
  throw new Error("Function not implemented.");
}
