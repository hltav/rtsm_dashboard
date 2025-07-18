import { ReactNode } from "react";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";
import DashboardPage from "@/components/dashboard/layout/DashboardPage";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeRegistry>
      <DashboardPage>{children}</DashboardPage>
    </ThemeRegistry>
  );
}
