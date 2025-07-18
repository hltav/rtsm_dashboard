"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Paper } from "@mui/material";
import LoginMarketing from "@/components/auth/login/LoginMarketing";
import LoginForm from "@/components/auth/login/LoginForm";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const LoginContentPage: React.FC = () => {
  const [initialUsername, setInitialUsername] = useState("");
  const [initialRememberMe, setInitialRememberMe] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("lastLoggedInUser");
    if (savedUsername) {
      setInitialUsername(savedUsername);
      setInitialRememberMe(true);
    }
  }, []);

  const handleLogin = (loginResponse: {
    accessToken: string;
    user: { id: number; email: string };
  }) => {
    const { accessToken, user } = loginResponse;
    const username = user.email; 

    if (initialRememberMe) {
      localStorage.setItem("lastLoggedInUser", username);
    } else {
      localStorage.removeItem("lastLoggedInUser");
    }

    console.log("Login bem-sucedido:", {
      accessToken,
      user,
      rememberMe: initialRememberMe,
    });

    // Lógica de autenticação aqui
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: { xs: 2, sm: 3, md: 0 },
      }}
    >
      {/* ThemeToggle posicionado no canto superior direito */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1, // Garante que fique acima de outros elementos
        }}
      >
        <ThemeToggle />
      </Box>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            overflow: "hidden",
            width: "95%",
            maxWidth: { xs: "95%", sm: "700px", md: "900px" },
            maxHeight: { xs: "unset", md: "calc(90vh - 40px)" },
            margin: { xs: "0 auto", md: "20px auto" },
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

export default LoginContentPage;
