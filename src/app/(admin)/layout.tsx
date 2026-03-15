"use client";
import { AdminProvider } from "@/components/Providers/AdminContext";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <AdminProvider>{children}</AdminProvider>
    </ThemeRegistry>
  );
}
