"use client";
import React, { useState, ReactNode } from "react";
import { useMediaQuery } from "@mui/material";
import { lightTheme } from "@/components/theme/light-theme";
import { DashboardLayout } from "./DashboardLayout";
import AppBarComponent from "./AppBarComponent";
import { MainContainer } from "./MainContainer";
import MainContent from "./MainContent";
import ProfileMenu from "./ProfileMenu";
import { NavigationBar } from "./Navigation";

interface DashboardPageProps {
  children?: ReactNode;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ children }) => {
  const isDesktop = useMediaQuery(lightTheme.breakpoints.up("md"));
  const [open, setOpen] = useState(isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Usuário deslogado!");
    setProfileMenuOpen(false);
  };

  return (
    <DashboardLayout darkMode={darkMode}>
      <AppBarComponent
        handleDrawerToggle={handleDrawerToggle}
        handleProfileMenuToggle={handleProfileMenuToggle}
      />

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
    </DashboardLayout>
  );
};

export default DashboardPage;
