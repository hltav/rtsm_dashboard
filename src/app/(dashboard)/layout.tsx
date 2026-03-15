// import { ReactNode } from "react";
// import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   return <ThemeRegistry>{children}</ThemeRegistry>;
// }

import { ReactNode } from "react";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";
import DashboardShell from "@/modules/shell/DashboardShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeRegistry>
      <DashboardShell>{children}</DashboardShell>
    </ThemeRegistry>
  );
}
