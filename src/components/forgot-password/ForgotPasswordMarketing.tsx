'use client';
import React from "react";
import { Box, Typography } from "@mui/material";
import LogoImage from "../ui/images/LogoImage";

const ForgotPasswordMarketing: React.FC = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: { xs: 2, sm: 4, md: 6 },
        backgroundImage: "linear-gradient(135deg, #1A2B42 0%, #0A1B2C 100%)",
        color: "white",
        gap: 2,
      }}
    >
      <LogoImage
        sx={{
          maxWidth: "80%",
          mb: 3,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        }}
      />
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Problemas para Entrar?
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.9 }}>
        Não se preocupe! Vamos te ajudar a redefinir sua senha para que você
        possa voltar a gerenciar suas apostas.
      </Typography>
    </Box>
  );
};

export default ForgotPasswordMarketing;
