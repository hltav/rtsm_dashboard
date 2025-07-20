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
import { menuItems } from "./icons/MenuItems";

interface DrawerComponentProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  open,
  handleDrawerToggle,
}) => {
  return (
    <Box
      sx={{
        width: open ? 5 : 10,
        bgcolor: "primary.main",
        height: "100%",
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
            color: "white",
            display: { xs: "none", md: "flex", justifyContent: "right" },
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        {menuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={!open ? item.text : ""}
            placement="right"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
                "&:hover": { bgcolor: "primary.dark" },
                marginLeft:"10px"
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
