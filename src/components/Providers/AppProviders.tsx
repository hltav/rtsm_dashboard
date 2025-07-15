// src/app/providers.tsx
"use client";

import React from "react";
import { NotificationProvider } from "./NotificationSnackbar";
import { ThemeRegistry } from "./ThemeRegistry";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <NotificationProvider>
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
      </NotificationProvider>
    </ThemeRegistry>
  );
}
