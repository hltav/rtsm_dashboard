"use client";
import React from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MenuItem, menuItems } from "./MenuItems";
import { useDashboard } from "@/components/Providers/DashboardContext";
import { DrawerComponentProps } from "../interface/drawerComponentProps";

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  open,
  handleDrawerToggle,
  onMenuItemClick,
}) => {
  const { selectedPage } = useDashboard();
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
      }}
    >
      <Divider sx={{ bgcolor: "primary.light" }} />
      <List sx={{ flexGrow: 1 }}>
        {open && (
          <Typography
            variant="h6"
            noWrap
            sx={{ color: "#FFC83D", fontWeight: 700 }}
          >
            {" "}
          </Typography>
        )}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "#FFC83D",
            display: { xs: "none", md: "flex", justifyContent: "right" },
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        {menuItems.map((item: MenuItem) => (
          <Tooltip
            key={item.text}
            title={!open ? item.text : ""}
            placement="right"
          >
            <ListItemButton
              onClick={() => onMenuItemClick(item.key)}
              selected={selectedPage === item.key}
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
                "&:hover": { bgcolor: "primary.dark" },
                "&.Mui-selected": {
                  bgcolor: "secondary.main",
                  "& .MuiListItemIcon-root": {
                    color: "#1A2B42",
                  },
                  "& .MuiListItemText-root": {
                    color: "#1A2B42", 
                    "& .MuiTypography-root": {
                      color: "#1A2B42", 
                      fontWeight: 600, 
                    },
                  },
                },
                marginLeft: "10px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "secondary.main",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: open ? 1 : 0,
                  color: "white",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ bgcolor: "primary.light" }} />
    </Box>
  );
};

export default DrawerComponent;
