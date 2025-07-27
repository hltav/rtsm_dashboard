/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, ReactNode, useEffect } from "react"; 
import { useMediaQuery, CircularProgress, Box } from "@mui/material";
import { lightTheme } from "@/components/theme/light-theme";
import { DashboardLayout } from "./DashboardLayout";
import AppBarComponent from "./AppBarComponent";
import { MainContainer } from "./MainContainer";
import MainContent from "./MainContent";
import ProfileMenu from "./ProfileMenu";
import { NavigationBar } from "./Navigation";
import { useRouter } from "next/navigation"; 
import { useAuth } from "@/components/Providers/AuthContext";
import CompleteProfileModal from "@/components/complete-profile-modal/CompleteProfileModal";
interface DashboardPageProps {
  children?: ReactNode;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ children }) => {
  const { user, loading, isAuthenticated, hasIncompleteProfile, checkAuthStatus, logout } = useAuth();
  const router = useRouter(); 

  const isDesktop = useMediaQuery(lightTheme.breakpoints.up("md"));
  const [open, setOpen] = useState(isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [showModalTemp, setShowModalTemp] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]); 

  const handleProfileComplete = async () => {
    console.log("Perfil completado! Fechando o modal e recarregando dados via contexto.");
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

  const handleLogout = () => {
    console.log("Usuário deslogado via contexto!");
    setProfileMenuOpen(false);
    logout();
  };

  // --- ORDEM DE RENDERIZAÇÃO (Mantida) ---

  if (loading) {
    return (
      <DashboardLayout darkMode={darkMode}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            bgcolor: 'background.default',
            color: 'text.primary'
          }}
        >
          <CircularProgress />
          <p style={{ marginLeft: '16px' }}>Carregando perfil...</p>
        </Box>
      </DashboardLayout>
    );
  }


  if (!isAuthenticated) {
    return (
        <DashboardLayout darkMode={darkMode}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    bgcolor: 'background.default',
                    color: 'text.primary'
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

      <ProfileMenu
        open={profileMenuOpen}
        handleClose={() => setProfileMenuOpen(false)}
        handleLogout={handleLogout}
      />

      <NavigationBar
        open={open}
        mobileOpen={mobileOpen}
        darkMode={darkMode}
        isDesktop={isDesktop}
        handleDrawerToggle={handleDrawerToggle}
        handleThemeToggle={handleThemeToggle}
      />

      <MainContainer open={open}>{children || <MainContent />}</MainContainer>

      <CompleteProfileModal
        open={hasIncompleteProfile}
        onClose={handleProfileComplete}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;