import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Home as HomeIcon,
  AccountBalanceWallet as BankrollIcon,
  Event as EventIcon,
  SportsSoccer as PredictionsIcon,
  Insights as StatsIcon,
  Person as ProfileIcon,
  AdminPanelSettings as AdminIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import ThemeToggleButton from "./ThemeToggleButton";

interface DashboardSidebarProps {
  isDesktop: boolean;
  isOpen: boolean;
  mobileSidebarOpen: boolean;
  darkMode: boolean;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
}

const menuItems = [
  { text: "Dashboard", icon: <HomeIcon />, href: "/dashboard" },
  { text: "Bankrolls", icon: <BankrollIcon />, href: "/dashboard/bankroll" },
  { text: "Eventos", icon: <EventIcon />, href: "/dashboard/events" },
  {
    text: "Previsões",
    icon: <PredictionsIcon />,
    href: "/dashboard/predictions",
  },
  { text: "Estatísticas", icon: <StatsIcon />, href: "/dashboard/statistics" },
  { text: "Meu Perfil", icon: <ProfileIcon />, href: "/dashboard/profile" },
  { text: "Administração", icon: <AdminIcon />, href: "/dashboard/admin" },
];

const drawerWidth = 240;
const closedDrawerWidth = 60;
const appBarHeight = 64;

const NewDashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isDesktop,
  isOpen,
  mobileSidebarOpen,
  darkMode,
  onToggleSidebar,
  onToggleTheme,
}) => {
  const drawerContent = (
    <Box
      sx={{
        width: isOpen ? drawerWidth : closedDrawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        boxSizing: "border-box",
        bgcolor: "primary.main",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        minWidth: closedDrawerWidth,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          p: 2,
          minHeight: `${appBarHeight}px`,
          bgcolor: "primary.main",
        }}
      >
        {isOpen && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "white", fontWeight: 700, flexGrow: 1 }}
          >
            RT Sports
          </Typography>
        )}
        <IconButton
          onClick={onToggleSidebar}
          sx={{ color: "white", display: { xs: "none", md: "flex" } }}
        >
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: "primary.light" }} />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            sx={{
              minHeight: 48,
              justifyContent: isOpen ? "initial" : "center",
              px: isOpen ? 2.5 : 1,
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                mr: isOpen ? 3 : 0,
                justifyContent: "center",
                color: "secondary.main",
              }}
            >
              <Tooltip title={!isOpen ? item.text : ""} placement="right">
                {item.icon}
              </Tooltip>
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary={item.text}
                sx={{ opacity: isOpen ? 1 : 0, color: "white" }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ bgcolor: "primary.light" }} />

      {!isDesktop && (
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: isOpen ? "flex-start" : "center",
            gap: 1,
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isOpen ? "initial" : "center",
              px: isOpen ? 2.5 : 1,
              width: "100%",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          ></ListItemButton>

          <ThemeToggleButton
            darkMode={darkMode}
            onToggle={onToggleTheme}
            fullWidth
            sidebarOpen={isOpen}
          />
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: isOpen ? drawerWidth : closedDrawerWidth },
        flexShrink: { sm: 0 },
        mt: `${appBarHeight}px`,
        borderRadius: 0,
      }}
      aria-label="mailbox folders"
    >
      {/* Drawer Temporário para Mobile */}
      <Drawer
        variant="temporary"
        open={mobileSidebarOpen && !isDesktop}
        onClose={onToggleSidebar}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "primary.main",
            borderRadius: 0,
            mt: `${appBarHeight}px`,
            height: `calc(100% - ${appBarHeight}px)`,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer Permanente para Desktop */}
      <Drawer
        variant="persistent"
        open={isDesktop ? isOpen : false}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: isOpen ? drawerWidth : closedDrawerWidth,
            boxSizing: "border-box",
            bgcolor: "primary.main",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: "hidden",
            marginTop: `${appBarHeight}px`,
            height: `calc(100% - ${appBarHeight}px)`,
            borderRadius: 0,
            flexGrow: 0,
            flexShrink: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default NewDashboardSidebar;
