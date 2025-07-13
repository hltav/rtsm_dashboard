'use client';
import React, { useEffect, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import LoginMarketing from '@/components/login/LoginMarketing';
import LoginForm from '@/components/login/LoginForm';


const LoginPage: React.FC = () => {
  const [initialUsername, setInitialUsername] = useState('');
  const [initialRememberMe, setInitialRememberMe] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('lastLoggedInUser');
    if (savedUsername) {
      setInitialUsername(savedUsername);
      setInitialRememberMe(true);
    }
  }, []);

  const handleLogin = (username: string, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem('lastLoggedInUser', username);
    } else {
      localStorage.removeItem('lastLoggedInUser');
    }
    console.log('Tentativa de login com:', username, 'Lembrar-me:', rememberMe);
    // Lógica de autenticação aqui
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: { xs: 2, sm: 3, md: 0 },
      }}
    >
      <Container disableGutters maxWidth={false} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 3,
            overflow: 'hidden',
            width: '95%',
            maxWidth: { xs: '95%', sm: '700px', md: '900px' },
            maxHeight: { xs: 'unset', md: 'calc(90vh - 40px)' },
            margin: { xs: '0 auto', md: '20px auto' },
          }}
        >
          <LoginMarketing />
          <LoginForm 
            onLogin={handleLogin}
            initialUsername={initialUsername}
            initialRememberMe={initialRememberMe}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;