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
import { checkAuthStatusService } from "@/lib/api/auth/login/loginApi";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login, updateUser } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email: username, password, rememberMe });

      const userProfile = await checkAuthStatusService();

      console.log("DATA LOGIN FORM CHECK_AUTH:", userProfile);

      updateUser(userProfile);

      showNotification("Login realizado com sucesso!", "success");

      router.push("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
      showNotification(
        "Não foi possível efetuar o login. Por favor, verifique suas credenciais.",
        "warning"
      );
      setTimeout(() => {
        setError(null);
      }, 1500);
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
