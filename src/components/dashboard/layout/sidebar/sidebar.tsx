/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from "react";
import { Drawer, useTheme } from "@mui/material";
import useSidebar from "@/hooks/useSidebar";
import SidebarContent from "./sidebar-content";

interface SidebarProps {
  topOffset: number;
  isMobile: boolean;
}

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

const Sidebar: React.FC<SidebarProps> = ({ topOffset, isMobile }) => {
  const theme = useTheme();
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
      }}
      PaperProps={{
        sx: {
          width: isOpen ? drawerWidthOpen : drawerWidthClosed,
          top: `${topOffset}px`,
          height: `calc(100vh - ${topOffset}px)`,
          backgroundColor: theme.palette.primary.main,
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxShadow: isOpen ? "2px 0 5px rgba(0,0,0,0.2)" : "none",
        },
      }}
    >
      <SidebarContent isOpen={isOpen} onToggleSidebar={toggleSidebar} />
    </Drawer>
  );
};

export default Sidebar;
