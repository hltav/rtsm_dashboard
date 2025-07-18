/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { Box, Drawer } from "@mui/material";
import DrawerComponent from "./DrawerComponent";

interface NavigationProps {
  open: boolean;
  mobileOpen: boolean;
  darkMode: boolean;
  isDesktop: boolean;
  handleDrawerToggle: () => void;
  handleThemeToggle: () => void;
}

export const NavigationBar: React.FC<NavigationProps> = ({
  open,
  mobileOpen,
  darkMode,
  isDesktop,
  handleDrawerToggle,
  handleThemeToggle,
}) => {
  return (
    <Box
      component="nav"
      sx={{
        width: { md: open ? 240 : 60 },
        flexShrink: 0,
        mt: "64px",
        borderRadius: 0,
      }}
    >
      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: "primary.main",
            mt: "64px",
            height: "calc(100% - 64px)",
            borderRadius: 0,
          },
          
        }}
      >
        <DrawerComponent open={true} handleDrawerToggle={handleDrawerToggle} />
      </Drawer>

      {/* Drawer Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            bgcolor: "primary.main",
            mt: "64px",
            height: "calc(100% - 64px)",
            overflowX: "hidden",
            borderRight: "none",
            borderRadius: 0,
          },
        }}
      >
        <DrawerComponent open={open} handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </Box>
  );
};
