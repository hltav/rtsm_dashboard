import React from "react";
import { Typography } from "@mui/material";
import { CenteredContainer } from "@/lib/ui/layout/CenteredContainer";
import LogoImage from "@/lib/ui/images/LogoImage";
;

const LoginMarketing: React.FC = () => {
  return (
    <CenteredContainer>
      <LogoImage />
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Bem-vindo ao <span translate="no">RT Sports Manager</span>!
      </Typography>
      <Typography variant="h6" component="p" sx={{ opacity: 0.9, mb: 2 }}>
        Analise, otimize e transforme seus palpites em conhecimento.
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "400px", opacity: 0.8 }}>
        Sua plataforma para gerenciar apostas esportivas.
      </Typography>
    </CenteredContainer>
  );
};

export default LoginMarketing;
