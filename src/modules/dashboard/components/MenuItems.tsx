import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
// import InsightsIcon from "@mui/icons-material/Insights";

export type MenuItem = {
  text: string;
  icon: React.ReactNode;
  route: string;
  matchStartsWith?: string;
};

export const menuItems: MenuItem[] = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    route: "/dashboard/main/overview",
    matchStartsWith: "/dashboard",
  },
  {
    text: "Bancas",
    icon: <AccountBalanceWalletIcon />,
    route: "/bankroll/bankroll",
    matchStartsWith: "/bankroll",
  },
  {
    text: "Eventos",
    icon: <EventIcon />,
    route: "/events/pending",
    matchStartsWith: "/events",
  },
  // {
  //   text: "Previsões",
  //   icon: <SportsSoccerIcon />,
  //   route: "/predictions/predictions",
  //   matchStartsWith: "/predictions",
  // },
  // {
  //   text: "Estatísticas",
  //   icon: <InsightsIcon />,
  //   route: "/statistics/overview",
  //   matchStartsWith: "/statistics",
  // },
  {
    text: "Perfil",
    icon: <PersonIcon />,
    route: "/profile/profile_data",
    matchStartsWith: "/profile",
  },
];
