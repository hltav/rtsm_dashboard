import { IconButton, Tooltip } from "@mui/material";
import { useThemeMode } from "../Providers/ThemeRegistry";
import {
  Brightness2Outlined,
  LightModeOutlined,
  SettingsBrightness,
} from "@mui/icons-material";

export const ThemeToggle: React.FC = () => {
  const { mode, toggleThemeMode, currentTheme } = useThemeMode();

  const getIcon = () => {
    switch (mode) {
      case "light":
        return <LightModeOutlined />;
      case "dark":
        return <Brightness2Outlined />;
      case "system":
        return <SettingsBrightness />;
      default:
        return <SettingsBrightness />;
    }
  };

  const getTooltipTitle = () => {
    switch (mode) {
      case "light":
        return "Tema claro · Clique para mudar para escuro";
      case "dark":
        return "Tema escuro · Clique para usar tema do sistema";
      case "system":
        return `Tema do sistema (${currentTheme}) · Clique para mudar para claro`;
      default:
        return "Alternar tema";
    }
  };

  return (
    <Tooltip title={getTooltipTitle()} arrow>
      <IconButton onClick={toggleThemeMode} sx={{ ml: 1, color: "inherit" }}>
        {getIcon()}
      </IconButton>
    </Tooltip>
  );
};
