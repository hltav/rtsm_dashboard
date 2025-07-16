import React from "react";
import { Box, Typography } from "@mui/material";
import LogoImage from "../ui/images/LogoImage";

const LoginMarketing: React.FC = () => {
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
      <LogoImage />
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Bem-vindo ao <span translate="no">RT Sports Manager</span>
!
      </Typography>
      <Typography variant="h6" component="p" sx={{ opacity: 0.9, mb: 2 }}>
        Analise, otimize e transforme seus palpites em conhecimento.
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "400px", opacity: 0.8 }}>
        Sua plataforma para gerenciar apostas esportivas, sem riscos reais.
      </Typography>
    </Box>
  );
};

export default LoginMarketing;
