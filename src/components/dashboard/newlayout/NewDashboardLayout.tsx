"use client";

import React, { useState } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewDashboardAppBar from "./NewDashboardAppBar";
import NewDashboardSidebar from "./NewDashboardSideBar";
import { Theme } from "@mui/material/styles";

// Definição do Tema MUI personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#1A2B42",
      light: "#3A4B62",
      dark: "#0A1B2C",
      contrastText: "#fff",
    },
    secondary: {
      main: "#E0A800",
      light: "#FFC83D",
      dark: "#B38600",
      contrastText: "#000",
    },
    background: {
      default: "#f4f6f8",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      "@media (max-width:600px)": { fontSize: "2.5rem" },
    },
    h2: {
      fontSize: "2.8rem",
      fontWeight: 600,
      "@media (max-width:600px)": { fontSize: "2rem" },
    },
    h3: {
      fontSize: "2.2rem",
      fontWeight: 600,
      "@media (max-width:600px)": { fontSize: "1.8rem" },
    },
    h4: {
      fontSize: "1.8rem",
      fontWeight: 600,
      "@media (max-width:600px)": { fontSize: "1.5rem" },
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      "@media (max-width:600px)": { fontSize: "1.2rem" },
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
      "@media (max-width:600px)": { fontSize: "1rem" },
    },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
        },
      },
    },
  },
});

interface NewDashboardLayoutProps {
  children: React.ReactNode;
}

const NewDashboardLayout: React.FC<NewDashboardLayoutProps> = ({ children }) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const currentTheme = React.useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          ...theme.palette,
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#121212" : "#f4f6f8",
            paper: darkMode ? "#1E1E1E" : "#fff",
          },
          text: {
            primary: darkMode ? "#E0E0E0" : "#333",
            secondary: darkMode ? "#B0B0B0" : "#555",
          },
        },
      }),
    [darkMode]
  );

  const toggleSidebar = () => {
    if (isDesktop) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setMobileSidebarOpen(!mobileSidebarOpen);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const drawerWidth = 240;
  const closedDrawerWidth = 60;
  const appBarHeight = 64;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <NewDashboardAppBar
          isDesktop={isDesktop}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          onToggleTheme={toggleTheme}
          darkMode={darkMode}
        />
        
        <NewDashboardSidebar
          isDesktop={isDesktop}
          isOpen={sidebarOpen}
          mobileSidebarOpen={mobileSidebarOpen}
          onToggleSidebar={toggleSidebar}
          onToggleTheme={toggleTheme}
          darkMode={darkMode}
        />
        
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
            transition: (theme: Theme) =>
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
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NewDashboardLayout;