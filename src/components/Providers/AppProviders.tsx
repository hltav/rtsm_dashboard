"use client";
import React from "react";
import { NotificationProvider } from "./NotificationSnackbar";
import { ThemeRegistry } from "./ThemeRegistry";
import { AuthProvider } from "./AuthContext";
import { DashboardProvider } from "./DashboardContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <NotificationProvider>
        <AuthProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeRegistry>
  );
}
