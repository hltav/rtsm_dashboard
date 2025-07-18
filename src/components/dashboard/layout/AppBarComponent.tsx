/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ProfileAvatar } from "./navbar/profile-avatar";

interface AppBarComponentProps {
  handleDrawerToggle: () => void;
  handleProfileMenuToggle: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  handleDrawerToggle,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        borderRadius: 0,
        width: "100vw", 
        maxWidth: "100%", 
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
        overflow: "hidden", 
        "@media (max-width:600px)": {
          minWidth: "100vw",
        },
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
          <img
            src="/images
/rtsmlogo02.png"
            alt="RT Sports Manager Logo"
            style={{
              height: "30px",
              borderRadius: "4px",
              marginRight: "10px",
            }}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/30x30/1A2B42/E0A800?text=Logo";
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
