// "use client";
// import React from "react";
// import { NotificationProvider } from "./NotificationSnackbar";
// import { ThemeRegistry } from "./ThemeRegistry";
// import { AuthProvider } from "./AuthContext";
// import { DashboardProvider } from "./DashboardContext";

// export function AppProviders({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeRegistry>
//       <NotificationProvider>
//         <AuthProvider>
//           <DashboardProvider>{children}</DashboardProvider>
//         </AuthProvider>
//       </NotificationProvider>
//     </ThemeRegistry>
//   );
// }

"use client";
import React from "react";
import { NotificationProvider } from "./NotificationSnackbar";
import { ThemeRegistry } from "./ThemeRegistry";
import { AuthProvider } from "./AuthContext";
import { DashboardProvider } from "./DashboardContext";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

interface AppProvidersProps {
  children: React.ReactNode;
  nonce?: string; // recebe do RootLayout
}

export function AppProviders({ children, nonce }: AppProvidersProps) {
  const cache = createCache({
    key: "mui",
    nonce,
    prepend: true, // garante que os estilos do MUI sejam inseridos antes dos outros
    insertionPoint:
      typeof document !== "undefined"
        ? (document.querySelector(
            'meta[name="mui-insertion-point"]'
          ) as HTMLElement) || undefined
        : undefined,
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
