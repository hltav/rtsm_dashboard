"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { useMediaQuery, CircularProgress, Box } from "@mui/material";
import { lightTheme } from "@/components/theme/light-theme";
import { DashboardLayout } from "./DashboardLayout";
import AppBarComponent from "./components/AppBarComponent";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Providers/AuthContext";
import CompleteProfileModal from "@/modules/complete-profile-modal/CompleteProfileModal";
import MenuContent from "./components/MenuContent";
import { NavigationBar } from "./components/Navigation";
import { useAuthStatus } from "@/hooks/useAuthStatus";

interface DashboardPageProps {
  children?: ReactNode;
}

const DashboardPageContent: React.FC<DashboardPageProps> = ({ children }) => {
  const { isAuthenticated, hasIncompleteProfile, checkAuthStatus } = useAuth();

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

  const handleProfileComplete = async () => {
    await checkAuthStatus();
  };

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
      <DashboardLayout darkMode={darkMode}>
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
          <p style={{ marginLeft: "16px" }}>Carregando perfil...</p>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout darkMode={darkMode}>
      <AppBarComponent handleDrawerToggle={handleDrawerToggle} />

      <NavigationBar
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
          mt: { xs: "15%", sm: "6%" },
        }}
      >
        {children || <MenuContent />}
      </Box>

      <CompleteProfileModal
        open={hasIncompleteProfile}
        onClose={handleProfileComplete}
      />
    </DashboardLayout>
  );
};

export default DashboardPageContent;
