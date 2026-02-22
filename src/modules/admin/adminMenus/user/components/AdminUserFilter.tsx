/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputAdornment, Paper, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export const AdminUserFilter = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 3,
        bgcolor: theme.paper,
        border: `1px solid ${theme.border}`,
        borderRadius: 4,
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        placeholder="Pesquisar por ID, nome, cargo ou e-mail corporativo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} style={{ color: theme.textSecondary }} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 3,
            color: theme.textPrimary,
            bgcolor: darkMode ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.02)",
            "& fieldset": { borderColor: theme.border },
          },
        }}
      />
    </Paper>
  );
};
