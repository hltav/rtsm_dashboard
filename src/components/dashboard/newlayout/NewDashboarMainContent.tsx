import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface NewDashboardMainContentProps {
  sidebarOpen: boolean;
  darkMode: boolean;
}

const NewDashboardMainContent: React.FC<NewDashboardMainContentProps> = ({
  sidebarOpen,
  darkMode,
}) => {
  const drawerWidth = 240;
  const closedDrawerWidth = 60;
  const appBarHeight = 64;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: {
          xs: "100%",
          md: `calc(100% - ${sidebarOpen ? drawerWidth : closedDrawerWidth}px)`,
        },
        mt: `${appBarHeight}px`,
        transition: (theme) =>
          theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        ml: {
          xs: 0,
          md: sidebarOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`,
        },
        backgroundColor: "background.default",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "text.primary", mb: 4 }}>
        Visão Geral do Dashboard
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Bem-vindo ao seu Dashboard, Usuário!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aqui você terá acesso rápido às suas principais estatísticas,
          eventos e previsões. Utilize o menu lateral para navegar entre as
          diferentes seções.
          <br />
          <br />
          **Modo {darkMode ? "Escuro" : "Claro"} Ativado.** Use o botão no
          menu lateral para alternar o tema.
        </Typography>
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: "primary.light",
              color: "white",
            }}
          >
            <Typography variant="h6">Total de Bankrolls</Typography>
            <Typography variant="h4">R$ 5.000,00</Typography>
          </Paper>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: "secondary.light",
              color: "primary.main",
            }}
          >
            <Typography variant="h6">Próximos Eventos</Typography>
            <Typography variant="h4">3</Typography>
          </Paper>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: "background.paper",
              color: "text.primary",
            }}
          >
            <Typography variant="h6">Previsões Ativas</Typography>
            <Typography variant="h4">12</Typography>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewDashboardMainContent;