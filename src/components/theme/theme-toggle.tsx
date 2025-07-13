import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "@/components/theme/ThemeRegistry"; // Atualize o caminho

export const ThemeToggle: React.FC = () => {
  const { mode, toggleThemeMode } = useThemeMode();

  return (
    <IconButton onClick={toggleThemeMode} sx={{ ml: 1, color: "inherit" }}>
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};