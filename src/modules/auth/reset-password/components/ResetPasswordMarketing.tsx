"use client";
import React from "react";
import { Typography } from "@mui/material";
import LogoImage from "../../../../lib/ui/images/LogoImage";
import { CenteredContainer } from "../../../../lib/ui/layout/CenteredContainer";

const ResetPasswordMarketing: React.FC = () => {
  return (
    <CenteredContainer>
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
      ></Typography>
      <Typography variant="body1" sx={{ opacity: 0.9 }}>
        Agora você pode redefinir sua senha e voltar a gerenciar suas apostas.
      </Typography>
    </CenteredContainer>
  );
};

export default ResetPasswordMarketing;
