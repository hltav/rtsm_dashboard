/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@mui/material";
import { Users, UserPlus2, Activity, UserX } from "lucide-react";
import { useMemo, useState } from "react";
import { mockUsers } from "../interfaces/mochAdminUsers.data";
import { StatCard } from "../ui/statCard.ui";

export const AdminUserDash = () => {
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
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total de Usuários"
          value={users.length}
          icon={<Users color={theme.accent} />}
          trend="+12% este mês"
          theme={theme}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Novos (24h)"
          value="2"
          icon={<UserPlus2 color="#4ade80" />}
          trend="Novos registros"
          theme={theme}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Atividade Média"
          value="84%"
          icon={<Activity color="#60a5fa" />}
          theme={theme}
          showProgress
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Suspensos"
          value="1"
          icon={<UserX color="#f87171" />}
          trend="Ação necessária"
          theme={theme}
        />
      </Grid>
    </Grid>
  );
};
