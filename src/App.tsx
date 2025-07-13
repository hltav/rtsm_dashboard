import React from 'react';
import AppLayout from './app/page';
import { ThemeRegistry } from './components/theme/ThemeRegistry';
import HomePage from './app/home/page';


const App: React.FC = () => {
  return (
    <ThemeRegistry>
      <AppLayout>
        <HomePage />
      </AppLayout>
    </ThemeRegistry>
  );
};

export default App;