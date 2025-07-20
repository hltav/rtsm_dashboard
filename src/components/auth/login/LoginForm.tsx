// components/LoginForm.tsx
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import z from "zod";
import {
  LoginResponse,
  LoginResponseSchema,
} from "@/modules/user/schemas/loginResponse.schema";
import { LoginFormProps } from "@/modules/user/props/loginForm.props";
import { useRouter } from "next/navigation";
import RememberMeCheckbox from "./RememberMeCheckbox";
import LoginFooterLinks from "./LoginFooterLinks";
import LoginFormTitle from "./LoginFormTitle";
import LoginFormError from "./LoginFormError";
import LoginPasswordInput from "./LoginPasswordInput";


const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  initialUsername = "",
  initialRememberMe = false,
}) => {
  const [rememberMe, setRememberMe] = useState(initialRememberMe);
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Erro ao fazer login");
      }

      const data: LoginResponse = LoginResponseSchema.parse(json);

      console.log("Login bem-sucedido:", data);

      if (rememberMe) {
        localStorage.setItem("token", data.accessToken);
      }

      onLogin(data);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("Formato inesperado na resposta do servidor.");
        console.error(err.issues);
      } else if (err instanceof Error) {
        setError(err.message || "Erro inesperado.");
      } else {
        setError("Erro desconhecido.");
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
        onChange={handleRememberMeChange}
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