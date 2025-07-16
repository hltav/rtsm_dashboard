"use client";

import React from "react";
import { Box, Container, Paper } from "@mui/material";
import RegisterMarketing from "@/components/register/RegisterMarketing";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { RegisterForm } from "@/components/register/RegisterForm";
import { SignUpFormData } from "@/modules/auth/schemas/signup.schemas";
import { useRouter } from "next/navigation";
import { createUserApi } from "@/modules/auth/services/createUser-api";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";

const RegisterContentPage: React.FC = () => {
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleRegister = async (data: SignUpFormData): Promise<void> => {
    try {
      const result = await createUserApi.createUser(data);

      if (result.success) {
        showNotification("Usuário criado com sucesso!", "success");
        // Redireciona após 2 segundos para dar tempo do usuário ver a mensagem
        setTimeout(() => router.push("/login"), 3000);
      } else {
        // Verifica o tipo de erro para mostrar a severidade correta
        const severity =
          result.status !== undefined && result.status >= 500
            ? "error"
            : "warning";

        showNotification(result.message || "Erro ao criar usuário", severity);
      }
    } catch (error) {
      showNotification("Erro inesperado no servidor", "error");
      console.error("Registration error:", error);
    }
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
            <RegisterMarketing />
            <RegisterForm onRegister={handleRegister} />
          </Paper>
        </Container>
      </Box>
    </ThemeRegistry>
  );
};

export default RegisterContentPage;
