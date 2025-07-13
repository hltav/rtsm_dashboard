import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "@/lib/context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <IconButton onClick={toggleColorMode} sx={{ ml: 1, color: "white" }}>
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
