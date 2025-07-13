'use client';
import React from 'react';
import DashboardContent from '@/components/dashboard/layout/DashboardContent';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DashboardContent>
            {children}
          </DashboardContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
