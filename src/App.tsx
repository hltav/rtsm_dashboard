import React from 'react';
import { ThemeProviderWrapper } from './lib/context/ThemeContext';
import AppLayout from './app/page';
import DashboardContent from './components/dashboard/layout/DashboardContent';


const App: React.FC = () => {
  return (
    <ThemeProviderWrapper>
      <AppLayout>
        <DashboardContent />
      </AppLayout>
    </ThemeProviderWrapper>
  );
};

export default App;