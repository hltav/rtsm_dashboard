import React from "react";
import { IconButton, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface ThemeToggleButtonProps {
  darkMode: boolean;
  onToggle: () => void;
  fullWidth?: boolean;
  sidebarOpen?: boolean;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  darkMode,
  onToggle,
  fullWidth = false,
  sidebarOpen = true,
}) => {
  if (fullWidth) {
    return (
      <ListItemButton
        onClick={onToggle}
        sx={{
          minHeight: 48,
          justifyContent: sidebarOpen ? "initial" : "center",
          px: sidebarOpen ? 2.5 : 1,
          width: "100%",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            mr: sidebarOpen ? 3 : 0,
            justifyContent: "center",
            color: "secondary.main",
          }}
        >
          <Tooltip
            title={!sidebarOpen ? (darkMode ? "Modo Claro" : "Modo Escuro") : ""}
            placement="right"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </Tooltip>
        </ListItemIcon>
        {sidebarOpen && (
          <ListItemText
            primary={darkMode ? "Modo Claro" : "Modo Escuro"}
            sx={{ opacity: sidebarOpen ? 1 : 0, color: "white" }}
          />
        )}
      </ListItemButton>
    );
  }

  return (
    <IconButton onClick={onToggle} color="inherit">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggleButton;