import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventIcon from "@mui/icons-material/Event";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export interface MenuItem {
  key: string;
  text: string;
  icon: React.ReactNode;
}

export const menuItems: MenuItem[] = [
  { key: "main", text: "Dashboard", icon: <HomeIcon /> },
  { key: "bankrolls", text: "Bancas", icon: <AccountBalanceWalletIcon /> },
  { key: "events", text: "Eventos", icon: <EventIcon /> },
  { key: "predictions", text: "Previsões", icon: <SportsSoccerIcon /> },
  { key: "statistics", text: "Estatísticas", icon: <InsightsIcon /> },
  { key: "profile", text: "Perfil", icon: <PersonIcon /> },
  { key: "admin", text: "Administração", icon: <AdminPanelSettingsIcon /> },
];
