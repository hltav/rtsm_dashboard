"use client";

import { Box, Typography } from "@mui/material";
import LogoImage from "../ui/images/LogoImage";

export const MarketingSide = () => {
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
        Bem-vindo ao <span translate="no">RT Sports Manager</span>!
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.9 }}>
        Sua conta foi ativada com sucesso. Prepare-se para otimizar suas
        análises de apostas!
      </Typography>
    </Box>
  );
};
