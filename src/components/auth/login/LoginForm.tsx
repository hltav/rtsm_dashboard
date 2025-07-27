import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import z from "zod";
import { LoginResponseSchema } from "@/modules/user/schemas/loginResponse.schema";
import { useRouter } from "next/navigation";
import RememberMeCheckbox from "./RememberMeCheckbox";
import LoginFooterLinks from "./LoginFooterLinks";
import LoginFormTitle from "./LoginFormTitle";
import LoginFormError from "./LoginFormError";
import LoginPasswordInput from "./LoginPasswordInput";
import { useAuth } from "@/components/Providers/AuthContext";
import { GetUserSchema } from "@/modules/user/schemas/user.schema";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: username, password, rememberMe }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Erro desconhecido ao fazer login.");
      }

      const data = LoginResponseSchema.parse(json);
      const accessToken = data.accessToken;

      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${data.user.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const userData = await userRes.json();

      if (!userRes.ok) {
        throw new Error(
          userData?.error ||
            "Falha na autenticação após login ou dados do usuário não encontrados."
        );
      }

      const validatedUserData = GetUserSchema.parse(userData);
      login(validatedUserData, accessToken);

      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        console.error("Erro de validação de esquema:", err.issues);
        setError("Dados inválidos recebidos do servidor.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro inesperado. Por favor, tente novamente.");
        console.error("Erro inesperado:", err);
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
