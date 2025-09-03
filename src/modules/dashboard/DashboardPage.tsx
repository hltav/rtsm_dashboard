/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { useMediaQuery, CircularProgress, Box, Menu } from "@mui/material";
import { lightTheme } from "@/components/theme/light-theme";
import { DashboardLayout } from "./DashboardLayout";
import AppBarComponent from "./components/AppBarComponent";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Providers/AuthContext";
import CompleteProfileModal from "@/components/complete-profile-modal/CompleteProfileModal";
import MenuContent from "./components/MenuContent";
import { NavigationBar } from "./components/Navigation";
interface DashboardPageProps {
  children?: ReactNode;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ children }) => {
  const {
    user,
    loading,
    isAuthenticated,
    hasIncompleteProfile,
    checkAuthStatus,
    logout,
  } = useAuth();
  const router = useRouter();

  const isDesktop = useMediaQuery(lightTheme.breakpoints.up("md"));
  const [open, setOpen] = useState(isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showModalTemp, setShowModalTemp] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleProfileComplete = async () => {
    console.log(
      "Perfil completado! Fechando o modal e recarregando dados via contexto."
    );
    setShowModalTemp(false);
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

  if (!isAuthenticated) {
    return (
      <DashboardLayout darkMode={darkMode}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <h1>Redirecionando para o login...</h1>
          <CircularProgress size={24} sx={{ mt: 2 }} />
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

      <main>{children || <MenuContent />}</main>

      <CompleteProfileModal
        open={hasIncompleteProfile}
        onClose={handleProfileComplete}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
