// "use client";
// import React from "react";
// import { NotificationProvider } from "./NotificationSnackbar";
// import { ThemeRegistry } from "./ThemeRegistry";
// import { AuthProvider } from "./AuthContext";
// import { DashboardProvider } from "./DashboardContext";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// interface AppProvidersProps {
//   children: React.ReactNode;
//   nonce?: string;
// }

// export function AppProviders({ children, nonce }: AppProvidersProps) {
//   const cache = createCache({
//     key: "mui",
//     nonce: nonce || undefined,
//     insertionPoint:
//       typeof document !== "undefined"
//         ? (document.querySelector(
//             'meta[name="mui-insertion-point"]'
//           ) as HTMLElement) || undefined
//         : undefined,
//   });
//   return (
//     <CacheProvider value={cache}>
//       <ThemeRegistry>
//         <NotificationProvider>
//           <AuthProvider>
//             <DashboardProvider>{children}</DashboardProvider>
//           </AuthProvider>
//         </NotificationProvider>
//       </ThemeRegistry>
//     </CacheProvider>
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
}

export function AppProviders({ children }: AppProvidersProps) {
  const cache = createCache({
    key: "mui",
    prepend: true,
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
