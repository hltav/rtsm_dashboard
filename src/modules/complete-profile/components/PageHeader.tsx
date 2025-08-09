"use client";
import { Typography } from "@mui/material";

const PageHeader = () => {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
      >
        Complete Seu Perfil!
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        sx={{ opacity: 0.9, mb: 4, color: "text.secondary" }}
      >
        Para uma experiência ainda mais personalizada e completa, preencha seus
        dados adicionais.
      </Typography>
    </>
  );
};

export default PageHeader;
