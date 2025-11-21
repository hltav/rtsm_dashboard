"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

interface PasswordRedefinationFormProps {
  onSubmit: (email: string) => void;
}

const PasswordRedefination: React.FC<PasswordRedefinationFormProps> = ({
  onSubmit,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Container
      sx={{ width: "40%", justifyContent: "center", alignItems: "center" }}
    >
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
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MailOutlineIcon sx={{ fontSize: 50 }} />
        </Box>

        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          Redefina sua Senha
        </Typography>
        <Typography textAlign="center" sx={{ mb: 4, fontWeight: 400 }}>
          Insira seu email para receber um link de redefinição da sua senha.
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
          Enviar Link de Redefinição de Senha
        </Button>
      </Box>
    </Container>
  );
};

export default PasswordRedefination;
