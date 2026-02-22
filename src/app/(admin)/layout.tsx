"use client";
import { AdminProvider } from "@/components/Providers/AdminContext";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";

// O componente de Layout DEVE se chamar AdminLayout (ou qualquer nome, exceto Page)
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
