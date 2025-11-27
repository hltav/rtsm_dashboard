"use client";
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        textAlign: { xs: "center", md: "left" },
        backgroundImage: "linear-gradient(135deg, #1A2B42 0%, #0A1B2C 100%)",
        color: "white",
        p: { xs: 4, md: 8 },
        gap: { xs: 4, md: 8 },
        mt: { xs: "33px", md: 0 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            <span translate="no">RT Sports Manager</span>: Sua Jornada de
            Apostas Otimizada
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Seus palpites, seus dados, seus resultados. A ferramenta definitiva
            para você transformar sua paixão por apostas esportivas em um
            aprendizado contínuo.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                color: "#1A2B42",
                backgroundColor: "#E0A800",
              }}
              LinkComponent="a"
              href="/register"
            >
              Comece Agora!
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "#E0A800",
                color: "#E0A800",
              }}
              component={Link}
              href="#learn-more"
            >
              Saiba Mais
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              src="/analysis02.png"
              alt="Análise Esportiva"
              width={600}
              height={400}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.2)",
              }}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x400/1A2B42/E0A800?text=Imagem+Indisponível";
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
