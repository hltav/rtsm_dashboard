import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import z from "zod";
import {
  LoginResponse,
  LoginResponseSchema,
} from "@/modules/user/schemas/loginResponse.schema";
import { LoginFormProps } from "@/modules/user/props/loginForm.props";
import { useRouter } from "next/navigation";

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  initialUsername = "",
  initialRememberMe = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(initialRememberMe);
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

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
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Acesse sua conta
      </Typography>

      <TextField
        label="Email ou Nome de Usuário"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
        sx={{ mb: 1 }}
      />

      <TextField
        label="Senha"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
            color="primary"
            size="small"
          />
        }
        label="Lembrar-me"
        sx={{ mb: 2 }}
      />

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mt: 1,
        }}
      >
        <Link
          href="/forgot-password"
          variant="body2"
          color="primary"
          sx={{
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Esqueceu a senha?
        </Link>
        <Link
          href="/register"
          variant="body2"
          color="primary"
          sx={{
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Não tem uma conta? Cadastre-se
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
