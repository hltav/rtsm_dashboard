import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import RememberMeCheckbox from "./RememberMeCheckbox";
import LoginFooterLinks from "./LoginFooterLinks";
import LoginFormTitle from "./LoginFormTitle";
import LoginFormError from "./LoginFormError";
import LoginPasswordInput from "./LoginPasswordInput";
import { useAuth } from "@/components/Providers/AuthContext";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import axios from "axios";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Login direto (retorna { user, accessToken })
      const response = await login({ email: username, password, rememberMe });

      // 2. Extraímos os dados do retorno
      const userProfile = response.user;

      if (userProfile) {
        showNotification("Login realizado com sucesso!", "success", 4000);

        // 3. Redirecionamento instantâneo por Role
        const adminRoles = ["ADMIN", "SUPER_ADMIN", "SUPPORT"];

        if (adminRoles.includes(userProfile.role)) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Credenciais inválidas.");
          showNotification(
            "Não autorizado: verifique suas credenciais.",
            "warning",
            4000,
          );
        } else {
          setError("Erro no servidor: tente novamente mais tarde.");
          showNotification("Erro interno na aplicação.", "error", 4000);
        }
      } else if (err instanceof Error) {
        setError(err.message);
        showNotification(err.message, "error");
      } else {
        setError("Erro inesperado. Tente novamente.");
        showNotification("Erro inesperado.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: { xs: 2, sm: 4, md: 6 },
        bgcolor: "background.paper",
      }}
    >
      <LoginFormTitle title="Acesse sua conta" />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
        type="email"
        sx={{ mb: 1 }}
      />

      <LoginPasswordInput
        label="Senha"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 1 }}
      />

      <RememberMeCheckbox
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />

      <LoginFormError message={error} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={loading}
        sx={{ py: 1.5, mb: 2 }}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>

      <LoginFooterLinks />
    </Box>
  );
};

export default LoginForm;
