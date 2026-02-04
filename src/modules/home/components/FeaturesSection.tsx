"use client";
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import {
  SportsScore as SportsScoreIcon,
  Analytics as AnalyticsIcon,
  History as HistoryIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";

const features = [
  {
    icon: <SportsScoreIcon sx={{ fontSize: 70, mb: 2 }} />,
    title: "Acompanhamento Detalhado",
    description:
      "Monitore cada aposta que você faz. Registre seus palpites, odds e veja os resultados e desempenho de suas estratégias.",
  },
  {
    icon: <AnalyticsIcon sx={{ fontSize: 70, mb: 2 }} />,
    title: "Análise Inteligente",
    description:
      "Visualize gráficos e estatísticas claras sobre seus ganhos e perdas, identificando rapidamente o que funciona.",
  },
  {
    icon: <HistoryIcon sx={{ fontSize: 70, mb: 2 }} />,
    title: "Histórico Completo",
    description:
      "Tenha acesso fácil ao seu histórico de apostas, permitindo revisitar decisões e aprender com o passado.",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 70, mb: 2 }} />,
    title: "Minimize os Riscos",
    description:
      "Aprimore suas habilidades de apostador em um ambiente seguro.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: "background.default" }}>
      <Container>
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          Por que a <span translate="no">RT Sports Manager</span>?
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{ textAlign: "center", p: 3, height: "100%" }}
                elevation={0}
              >
                <CardContent>
                  {feature.icon}
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
