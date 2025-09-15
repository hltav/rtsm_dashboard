"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { useResetPassword } from "@/hooks/useResetPassword";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function ResetPasswordForm() {
  const { resetPassword, loading, error, success } = useResetPassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    resetPassword(password, confirmPassword);
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
        p: { xs: 3, sm: 4, md: 6 },
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Redefina sua Senha
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {success ? (
        <Typography color="primary" sx={{ textAlign: "center", mb: 2 }}>
          Senha alterada com sucesso! Redirecionando para o login...
        </Typography>
      ) : (
        <>
          <TextField
            label="Nova Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1 }}
            error={!!passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirmar Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
            error={!!passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {passwordError && (
            <FormHelperText error sx={{ mb: 2, mt: 0 }}>
              {passwordError}
            </FormHelperText>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading || !!passwordError}
            sx={{ py: 1.5, mb: 2 }}
          >
            {loading ? "Salvando..." : "Salvar Nova Senha"}
          </Button>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          mt: 1,
        }}
      >
        <Link
          href="/login"
          variant="body2"
          color="primary"
          sx={{
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Voltar para o Login
        </Link>
      </Box>
    </Box>
  );
}
