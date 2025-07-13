"use client";

import React from "react";
import { Box, Container, Paper } from "@mui/material";
import { ThemeRegistry } from "@/components/theme/ThemeRegistry";
import RegisterMarketing from "@/components/register/RegisterMarketing";
import RegisterForm from "@/components/register/RegisterForm";

const RegisterPage: React.FC = () => {
  const handleRegister = () => {
    console.log(
      "Botão de Cadastro clicado. Lógica de validação e envio removida para este layout."
    );
    // Adicionar lógica de registro aqui
  };

  return (
    <ThemeRegistry>
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
            <RegisterMarketing />
            <RegisterForm onRegister={handleRegister} />
          </Paper>
        </Container>
      </Box>
    </ThemeRegistry>
  );
};

export default RegisterPage;
