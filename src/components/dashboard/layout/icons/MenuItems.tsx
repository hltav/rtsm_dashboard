import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventIcon from "@mui/icons-material/Event";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const menuItems = [
  { text: "Dashboard", icon: <HomeIcon />, href: "/dashboard" },
  { text: "Bankrolls", icon: <AccountBalanceWalletIcon />, href: "/dashboard/bankroll" },
  { text: "Eventos", icon: <EventIcon />, href: "/dashboard/events" },
  { text: "Previsões", icon: <SportsSoccerIcon />, href: "/dashboard/predictions" },
  { text: "Estatísticas", icon: <InsightsIcon />, href: "/dashboard/statistics" },
  { text: "Meu Perfil", icon: <PersonIcon />, href: "/dashboard/profile" },
  { text: "Administração", icon: <AdminPanelSettingsIcon />, href: "/dashboard/admin" },
];