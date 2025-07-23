/* eslint-disable @typescript-eslint/no-unused-vars */
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
      // Faz login
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: username, password }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Erro ao fazer login");

      const data: LoginResponse = LoginResponseSchema.parse(json);

      console.log("Login bem-sucedido:", data);

      // Verifica se cookie está válido e backend reconhece
      const userRes = await fetch(`/api/users/${data.user.id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!userRes.ok) throw new Error("Autenticação falhou após login");

      onLogin(data, rememberMe);

      router.push("/dashboard");
    } catch (err) {
      // lidar com erros normalmente
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
