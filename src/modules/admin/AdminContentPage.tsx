// "use client";
// import React, { useState } from "react";
// import {
//   CssBaseline,
//   Box,
//   Drawer,
//   AppBar,
//   Toolbar,
//   List,
//   Typography,
//   IconButton,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Container,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Avatar,
//   Chip,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import SettingsIcon from "@mui/icons-material/Settings";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import NotificationsIcon from "@mui/icons-material/Notifications";

// /* =====================================================
//    TYPES
// ===================================================== */

// type ThemeMode = "light" | "dark";
// type StatCardColor = "success" | "error";

// type StatCardProps = {
//   title: string;
//   value: string;
//   change: string;
//   color: StatCardColor;
// };

// type MenuItem = {
//   text: string;
//   icon: React.ReactNode;
//   active?: boolean;
// };

// type UserStatus = "Ativo" | "Pendente" | "Inativo";
// type UserRole = "Admin" | "Editor" | "User";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: UserRole;
//   status: UserStatus;
// };

// /* =====================================================
//    THEMES
// ===================================================== */
// const drawerWidth = 240;

// /* =====================================================
//    COMPONENTS
// ===================================================== */

// const StatCard = ({ title, value, change, color }: StatCardProps) => (
//   <Paper
//     sx={{
//       p: 3,
//       display: "flex",
//       flexDirection: "column",
//       height: "100%",
//     }}
//   >
//     <Typography variant="body2" color="text.secondary" gutterBottom>
//       {title}
//     </Typography>

//     <Typography variant="h4" sx={{ mb: 1 }}>
//       {value}
//     </Typography>

//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <TrendingUpIcon
//         sx={{
//           fontSize: 18,
//           color: color === "success" ? "success.main" : "error.main",
//         }}
//       />
//       <Typography
//         variant="caption"
//         sx={{
//           ml: 0.5,
//           color: color === "success" ? "success.main" : "error.main",
//           fontWeight: 700,
//         }}
//       >
//         {change}
//       </Typography>
//       <Typography variant="caption" sx={{ ml: 1 }}>
//         vs. mês passado
//       </Typography>
//     </Box>
//   </Paper>
// );

// /* =====================================================
//    MAIN COMPONENT
// ===================================================== */

// export default function AdminContent() {
//   const [open, setOpen] = useState<boolean>(true);
//   const [mode, setMode] = useState<ThemeMode>("dark");

//   const toggleDrawer = () => setOpen((prev) => !prev);
//   const toggleTheme = () =>
//     setMode((prev) => (prev === "dark" ? "light" : "dark"));

//   const menuItems: MenuItem[] = [
//     { text: "Dashboard", icon: <DashboardIcon />, active: true },
//     { text: "Usuários", icon: <PeopleIcon /> },
//     { text: "Relatórios", icon: <BarChartIcon /> },
//     { text: "Configurações", icon: <SettingsIcon /> },
//   ];

//   const recentUsers: User[] = [
//     {
//       id: 1,
//       name: "Ana Silva",
//       email: "ana@tech.com",
//       role: "Admin",
//       status: "Ativo",
//     },
//     {
//       id: 2,
//       name: "Carlos Souza",
//       email: "carlos@tech.com",
//       role: "Editor",
//       status: "Pendente",
//     },
//     {
//       id: 3,
//       name: "Bia Santos",
//       email: "bia@tech.com",
//       role: "User",
//       status: "Ativo",
//     },
//     {
//       id: 4,
//       name: "Douglas Lima",
//       email: "doug@tech.com",
//       role: "User",
//       status: "Inativo",
//     },
//   ];

//   return (
//     <Container>
//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         <CssBaseline />

//         {/* APPBAR */}
//         <AppBar position="fixed" elevation={0}>
//           <Toolbar sx={{ justifyContent: "space-between" }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton color="inherit" onClick={toggleDrawer}>
//                 <MenuIcon />
//               </IconButton>
//               <Typography sx={{ ml: 2, fontWeight: 800 }}>
//                 ADMIN DASHBOARD
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <IconButton color="inherit" onClick={toggleTheme}>
//                 {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
//               </IconButton>
//               <IconButton color="inherit">
//                 <NotificationsIcon />
//               </IconButton>
//               <Avatar
//                 sx={{
//                   width: 32,
//                   height: 32,
//                   ml: 1,
//                   bgcolor: "secondary.main",
//                   color: "primary.main",
//                   fontWeight: "bold",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 AD
//               </Avatar>
//             </Box>
//           </Toolbar>
//         </AppBar>

//         {/* DRAWER */}
//         <Drawer
//           variant="persistent"
//           sx={{
//             width: open ? drawerWidth : 72,
//             "& .MuiDrawer-paper": {
//               width: open ? drawerWidth : 72,
//               overflowX: "hidden",
//             },
//           }}
//         >
//           <Toolbar />
//           <List>
//             {menuItems.map((item) => (
//               <ListItem key={item.text} disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   {open && <ListItemText primary={item.text} />}
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>

//         {/* MAIN */}
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Toolbar />

//           <Container maxWidth="lg">
//             <Typography variant="h4" gutterBottom>
//               Olá, Administrador
//             </Typography>

//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatCard
//                   title="Total Usuários"
//                   value="2,543"
//                   change="+12%"
//                   color="success"
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <StatCard
//                   title="Receita"
//                   value="R$ 45.200"
//                   change="+8.2%"
//                   color="success"
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <StatCard
//                   title="Conversão"
//                   value="3.2%"
//                   change="-1.5%"
//                   color="error"
//                 />
//               </Grid>
//             </Grid>

//             <Paper>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Usuário</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Função</TableCell>
//                       <TableCell>Status</TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {recentUsers.map((user) => (
//                       <TableRow key={user.id}>
//                         <TableCell>
//                           <Box sx={{ display: "flex", alignItems: "center" }}>
//                             <Avatar sx={{ mr: 2 }}>
//                               {user.name.charAt(0)}
//                             </Avatar>
//                             {user.name}
//                           </Box>
//                         </TableCell>

//                         <TableCell>{user.email}</TableCell>
//                         <TableCell>{user.role}</TableCell>

//                         <TableCell>
//                           <Chip
//                             label={user.status}
//                             color={
//                               user.status === "Ativo"
//                                 ? "success"
//                                 : user.status === "Pendente"
//                                   ? "warning"
//                                   : "default"
//                             }
//                             size="small"
//                           />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Container>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { useMediaQuery, Box, CircularProgress, Container } from "@mui/material";
import { lightTheme } from "@/components/theme/light-theme";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Providers/AuthContext";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { AdminNavigationBar } from "./adminNavbar/AdminNavigation";
import AdminAppBarComponent from "./adminNavbar/AdminAppBar";
import { AdminDashboardLayout } from "./adminMain/AdminLayout";
import AdminMenuContent from "./adminNavbar/AdminMenuContent";

interface DashboardPageProps {
  children?: ReactNode;
}

const AdminContentPage: React.FC<DashboardPageProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const { loading } = useAuthStatus();

  const router = useRouter();
  const isDesktop = useMediaQuery(lightTheme.breakpoints.up("md"));
  const [open, setOpen] = useState(isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleDrawerToggle = () => {
    if (isDesktop) {
      setOpen(!open);
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <AdminDashboardLayout darkMode={darkMode}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <CircularProgress />
          <p style={{ marginLeft: "16px" }}>Carregando usuário...</p>
        </Box>
      </AdminDashboardLayout>
    );
  }

  return (
    <Container>
      <AdminAppBarComponent handleDrawerToggle={handleDrawerToggle} />

      <AdminNavigationBar
        open={open}
        mobileOpen={mobileOpen}
        darkMode={darkMode}
        isDesktop={isDesktop}
        handleDrawerToggle={handleDrawerToggle}
        handleThemeToggle={handleThemeToggle}
      />

      <Box
        component="main"
        sx={{
          width: "100%",
          ml: "10px",
          mt: { xs: "15%", sm: "4%" },
        }}
      >
        {children || <AdminMenuContent />}
      </Box>
    </Container>
  );
};

export default AdminContentPage;
