/* eslint-disable @typescript-eslint/no-unused-vars */
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventIcon from "@mui/icons-material/Event";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

export interface AdminMenuItem {
  key: string;
  text: string;
  icon: React.ReactNode;
}

export const adminMenuItems: AdminMenuItem[] = [
  { key: "adminMain", text: "Adminstrador", icon: <AdminPanelSettingsIcon /> },
  { key: "users", text: "Usuários", icon: <PeopleIcon /> },
  { key: "reports", text: "Relatórios", icon: <BarChartIcon /> },
  {
    key: "monitoring",
    text: "Monitoramento",
    icon: <MonitorHeartIcon />,
  },
  { key: "config", text: "Configurações", icon: <SettingsIcon /> },
  // { key: "predictions", text: "Previsões", icon: <SportsSoccerIcon /> },
  // { key: "statistics", text: "Estatísticas", icon: <InsightsIcon /> },
  // { key: "admin", text: "Administração", icon: <AdminPanelSettingsIcon /> },
];

//   const menuItems: MenuItem[] = [
//     { text: "Dashboard", icon: <DashboardIcon />, active: true },
//     { text: "Usuários", icon: <PeopleIcon /> },
//     { text: "Relatórios", icon: <BarChartIcon /> },
//     { text: "Configurações", icon: <SettingsIcon /> },
//   ];
