"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { useMediaQuery, CircularProgress, Box } from "@mui/material";
import { lightTheme } from "@/components/theme/light-theme";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Providers/AuthContext";
import CompleteProfileModal from "@/modules/complete-profile-modal/CompleteProfileModal";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { Container } from "@mui/system";
import AppBarComponent from "../dashboard/components/AppBarComponent";
import { NavigationBar } from "../dashboard/components/Navigation";
import { DashboardLayout } from "../dashboard/DashboardLayout";

interface DashboardShellProps {
  children: ReactNode;
}

const drawerWidth = 240;

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const { isAuthenticated, hasIncompleteProfile, checkAuthStatus } = useAuth();
  const { loading } = useAuthStatus();

  const router = useRouter();
  const isDesktop = useMediaQuery(lightTheme.breakpoints.up("md"));

  const [open, setOpen] = useState(isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setOpen(isDesktop);

    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleProfileComplete = async () => {
    await checkAuthStatus();
  };

  const handleDrawerToggle = () => {
    if (isDesktop) setOpen((p) => !p);
    else setMobileOpen((p) => !p);
  };

  const handleThemeToggle = () => {
    setDarkMode((p) => !p);
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
          <p style={{ marginLeft: 16 }}>Carregando perfil...</p>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: "flex", flexDirection: "column", p: 0 }}
    >
      <DashboardLayout darkMode={darkMode}>
        <AppBarComponent handleDrawerToggle={handleDrawerToggle} />

        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <NavigationBar
              open={open}
              mobileOpen={mobileOpen}
              darkMode={darkMode}
              isDesktop={isDesktop}
              handleDrawerToggle={handleDrawerToggle}
              handleThemeToggle={handleThemeToggle}
              drawerWidth={drawerWidth}
            />

            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                width: "100%",
                ...theme.mixins.toolbar,
                px: { xs: 2, md: 3 },
                pb: 3,
                minHeight: "100vh",
                boxSizing: "border-box",
                borderLeft: 0,
                mt: { xs: "15%", sm: "4%" },
              })}
            >
              {children}
            </Box>
          </Box>

          <CompleteProfileModal
            open={hasIncompleteProfile}
            onClose={handleProfileComplete}
          />
        </Box>
      </DashboardLayout>
    </Container>
  );
};

export default DashboardShell;
