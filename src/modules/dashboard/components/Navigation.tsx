"use client";
import React from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { NavigationProps } from "@/modules/user/props/navigation.props";
import DrawerComponent from "./DrawerComponent";

export const NavigationBar: React.FC<NavigationProps> = ({
  open,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:700px)");

  const handleMenuClick = (route: string) => {
    if (pathname !== route) {
      router.push(route, { scroll: false });
    }

    if (isMobile) {
      handleDrawerToggle();
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { md: open ? 240 : 60 },
        flexShrink: 0,
        mt: "64px",
        borderRadius: 0,
        elevation: 0,
      }}
    >
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
            mt: "58px",
            height: "calc(100% - 64px)",
            borderRadius: 0,
          },
        }}
      >
        <DrawerComponent
          open={true}
          handleDrawerToggle={handleDrawerToggle}
          onMenuItemClick={handleMenuClick}
        />
      </Drawer>

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
            border: "none",
            boxShadow: "none",
          },
        }}
      >
        <DrawerComponent
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          onMenuItemClick={handleMenuClick}
        />
      </Drawer>
    </Box>
  );
};
