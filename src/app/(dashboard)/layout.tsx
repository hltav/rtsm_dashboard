import { ReactNode } from 'react';
import DashboardPageLayout from '@/components/dashboard/layout/DashboardPageLayout';
import MuiClientThemeProvider from '@/components/theme/MuiClientThemeProvider';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <MuiClientThemeProvider>
      <DashboardPageLayout>{children}</DashboardPageLayout>
    </MuiClientThemeProvider>
  );
}
