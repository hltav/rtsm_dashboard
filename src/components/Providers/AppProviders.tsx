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
import React, { useEffect, useState } from "react";
import { NotificationProvider } from "./NotificationSnackbar";
import { ThemeRegistry } from "./ThemeRegistry";
import { AuthProvider } from "./AuthContext";
import { DashboardProvider } from "./DashboardContext";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

interface AppProvidersProps {
  children: React.ReactNode;
  nonce?: string;
}

export function AppProviders({ children, nonce }: AppProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cache = createCache({
    key: "mui",
    nonce: nonce || undefined,
    prepend: true,
  });

  // Evite renderização diferente no servidor vs cliente
  if (!mounted) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
          <div>{children}</div>
        </body>
      </html>
    );
  }

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
