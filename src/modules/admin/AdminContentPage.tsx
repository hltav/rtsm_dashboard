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
          <p style={{ marginLeft: "16px" }} color="success">
            Carregando usuário...
          </p>
        </Box>
      </AdminDashboardLayout>
    );
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ p: 0 }}>
      <AdminAppBarComponent handleDrawerToggle={handleDrawerToggle} />

      <Box sx={{ display: "flex" }}>
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
          // sx={{
          //   width: "100%",
          //   ml: "10px",
          //   mt: { xs: "15%", sm: "4%" },
          // }}
          sx={{
            width: "100%",
            ml: "10px",
            mt: { xs: "15%", sm: "4%" },
            // escala "como se fosse 80%"
            transform: "scale(0.8)",
            transformOrigin: "top left",
          }}
        >
          {children || <AdminMenuContent />}
        </Box>
      </Box>
    </Container>
  );
};

export default AdminContentPage;
