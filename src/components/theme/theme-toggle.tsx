import { IconButton } from "@mui/material";
import { useThemeMode } from "../Providers/ThemeRegistry";
import { Brightness2Outlined, LightModeOutlined } from "@mui/icons-material";

export const ThemeToggle: React.FC = () => {
  const { mode, toggleThemeMode } = useThemeMode();

  return (
    <IconButton onClick={toggleThemeMode} sx={{ ml: 1, color: "inherit" }}>
      {mode === "dark" ? <LightModeOutlined /> : <Brightness2Outlined />}
    </IconButton>
  );
};
