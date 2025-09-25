"use client";
import React from "react";
import { NotificationProvider } from "./NotificationSnackbar";
import { ThemeRegistry } from "./ThemeRegistry";
import { AuthProvider } from "./AuthContext";
import { DashboardProvider } from "./DashboardContext";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { getInsertionPoint } from "@/utils/getInsertionPoint";

interface AppProvidersProps {
  children: React.ReactNode;
  nonce?: string;
}

export function AppProviders({ children, nonce }: AppProvidersProps) {
  const isClient = typeof window !== "undefined";

  const cache = createCache({
    key: "mui",
    nonce: isClient ? nonce || undefined : undefined,
    insertionPoint: isClient ? getInsertionPoint() : undefined,
  });

  return (
    <CacheProvider value={cache}>
      <ThemeRegistry>
        <NotificationProvider>
          <AuthProvider>
            <DashboardProvider>{children}</DashboardProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeRegistry>
    </CacheProvider>
  );
}
