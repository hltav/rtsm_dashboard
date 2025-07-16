import { ReactNode } from 'react';
import DashboardPageLayout from '@/components/dashboard/layout/DashboardPageLayout';
import { ThemeRegistry } from '@/components/Providers/ThemeRegistry';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeRegistry>
      <DashboardPageLayout>{children}</DashboardPageLayout>
    </ThemeRegistry>
  );
}
