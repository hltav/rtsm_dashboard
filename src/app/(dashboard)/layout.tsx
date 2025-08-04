import { ReactNode } from "react";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <ThemeRegistry>{children}</ThemeRegistry>;
}
