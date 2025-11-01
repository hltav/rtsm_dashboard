"use client";
import React from "react";
import { NotificationProvider } from "./NotificationSnackbar";
import { ThemeRegistry } from "./ThemeRegistry";
import { AuthProvider } from "./AuthContext";
import { DashboardProvider } from "./DashboardContext";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EventsProvider } from "./EventsContext";

interface AppProvidersProps {
  children: React.ReactNode;
  nonce?: string;
}

export function AppProviders({ children, nonce }: AppProvidersProps) {
  const cache = createCache({
    key: "mui",
    nonce,
    prepend: true,
    insertionPoint:
      typeof document !== "undefined"
        ? (document.querySelector(
            'meta[name="mui-insertion-point"]'
          ) as HTMLElement) || undefined
        : undefined,
  });

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
          },
        },
      })
  );

  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <ThemeRegistry>
          <NotificationProvider>
            <AuthProvider>
              <EventsProvider>
                <DashboardProvider>{children} </DashboardProvider>
              </EventsProvider>
            </AuthProvider>
          </NotificationProvider>
        </ThemeRegistry>
      </QueryClientProvider>
    </CacheProvider>
  );
}
