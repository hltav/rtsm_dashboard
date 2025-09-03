"use client";
import React from "react";
import { Box, Drawer } from "@mui/material";
import { useDashboard } from "@/components/Providers/DashboardContext";
import { NavigationProps } from "@/modules/user/props/navigation.props";
import DrawerComponent from "./DrawerComponent";

export const NavigationBar: React.FC<NavigationProps> = ({
  open,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const { setSelectedPage } = useDashboard();

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
        <DrawerComponent
          open={true}
          handleDrawerToggle={handleDrawerToggle}
          onMenuItemClick={setSelectedPage}
        />
      </Drawer>
      {/* Drawer Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          flexShrink: 0,
          whiteSpace: "nowrap",
          width: open ? 240 : 60,
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            bgcolor: "primary.main",
            mt: "64px",
            height: "calc(100% - 30px)",
            overflowX: "hidden",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            borderRight: "none",
            borderRadius: 0,
          },
        }}
      >
        <DrawerComponent
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          onMenuItemClick={setSelectedPage}
        />
      </Drawer>
    </Box>
  );
};
