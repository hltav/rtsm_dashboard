'use client';
import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Image from "next/image";

const benefits = [
  "Identifique Padrões: Descubra quais esportes, mercados ou tipos de aposta são mais lucrativos para você.",
  "Gerencie sua Banca: Entenda como suas apostas impactam seu saldo virtual, desenvolvendo disciplina e gestão de risco.",
  "Tome Decisões Mais Inteligentes: Baseie suas futuras apostas em dados concretos e não apenas em intuição.",
  "Celebre suas Vitórias: Reconheça e valorize seus acertos, mantendo a motivação para continuar aprendendo.",
  "Aprenda com seus Erros: Transforme cada perda em uma oportunidade de crescimento, ajustando sua abordagem.",
];

const HowItWorks: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: "background.paper" }}>
      <Container>
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          Como o RT Sports Manager Pode te Ajudar?
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h4"
                component="h3"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Transforme seus palpites em conhecimento
              </Typography>
              {benefits.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                >
                  <CheckCircleOutlineIcon
                    color="primary"
                    sx={{ mr: 1.5, mt: 0.5, flexShrink: 0 }}
                  />
                  <Typography variant="body1" color="text.primary">
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/improve.png"
              alt="Melhore suas Apostas"
              width={600}
              height={400}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://placehold.co/600x400/E0A800/1A2B42?text=Imagem+Indisponível";
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
