"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ProfileAvatar } from "../navbar/profile-avatar";

interface AppBarComponentProps {
  handleDrawerToggle: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  handleDrawerToggle,
}) => {
  const logoSrc = "/rtsm.svg";
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderRadius: 0,
        width: "100%",
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
        backgroundColor: "#1A2B42",
        border: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {/* Use o componente Image */}
          <Image
            src={logoSrc}
            alt="RT Sports Manager Logo"
            width={40}
            height={40}
            style={{
              borderRadius: "4px",
              marginRight: "10px",
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

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ProfileAvatar />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
