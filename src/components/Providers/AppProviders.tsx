"use client";
import React from "react";
import { NotificationProvider } from "./NotificationSnackbar";
import { ThemeRegistry } from "./ThemeRegistry";
import { AuthProvider } from "./AuthContext";
import { DashboardProvider } from "./DashboardContext";
import { EmotionNonceCache } from "./EmotionNonceCache";

export function AppProviders({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce?: string;
}) {
  return (
    <EmotionNonceCache nonce={nonce}>
      <ThemeRegistry>
        <NotificationProvider>
          <AuthProvider>
            <DashboardProvider>{children}</DashboardProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeRegistry>
    </EmotionNonceCache>
  );
}
