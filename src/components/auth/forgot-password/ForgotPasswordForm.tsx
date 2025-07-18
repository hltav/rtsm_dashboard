'use client';
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
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

      <TextField
        label="Seu Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        size="medium"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ py: 1.5, mb: 2 }}
      >
        Enviar Link de Redefinição
      </Button>

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
};

export default ForgotPasswordForm;
