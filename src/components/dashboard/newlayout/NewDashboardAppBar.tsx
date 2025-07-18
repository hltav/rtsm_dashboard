/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserProfileMenu from "./NewUserProfileMenu";
import ThemeToggleButton from "./ThemeToggleButton";
import LogoImage from "@/components/ui/images/LogoImage";

interface DashboardAppBarProps {
  isDesktop: boolean;
  sidebarOpen: boolean;
  darkMode: boolean;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
}

const NewDashboardAppBar: React.FC<DashboardAppBarProps> = ({
  isDesktop,
  sidebarOpen,
  darkMode,
  onToggleSidebar,
  onToggleTheme,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        ml: 0,
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Parte esquerda - Logo e Título */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component="img"
            src="/images
/rtsmlogo02.png"
            alt="Logo"
            sx={{
              width: 80,
              height: 80,
              borderRadius: 0,
              display: "block",
              marginLeft: 0,
              marginRight: 7,
              "@media (max-width:400px)": {
                marginRight: 3,
              },
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 600 }}
          >
            RT Sports Manager
          </Typography>
        </Box>

        {/* Parte direita - Ícones do usuário e tema */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <UserProfileMenu />
          {isDesktop && (
            <ThemeToggleButton darkMode={darkMode} onToggle={onToggleTheme} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NewDashboardAppBar;
