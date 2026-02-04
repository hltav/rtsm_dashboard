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
import InsightsIcon from "@mui/icons-material/Insights";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SchoolIcon from "@mui/icons-material/School";

const features = [
  {
    title: "Análise de Dados",
    description:
      "Gráficos automáticos que mostram exatamente onde está seu lucro e onde estão seus vazamentos de dinheiro.",
    icon: <InsightsIcon sx={{ fontSize: 70, mb: 2 }} />,
  },
  {
    title: "Gestão de Banca",
    description:
      "Ferramentas dedicadas para controlar seu saldo, definir unidades e proteger seu capital a longo prazo.",
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 70, mb: 2 }} />,
  },
  {
    title: "Evolução Contínua",
    description:
      "Histórico detalhado para você revisar suas entradas e transformar erros passados em green futuro.",
    icon: <SchoolIcon sx={{ fontSize: 70, mb: 2 }} />,
  },
];

const LearnMore: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: "background.default" }} >
      <Container maxWidth="lg" >
        {/* Cabeçalho */}
        <Box textAlign="center" mb={{ xs: 5, md: 8 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Ferramentas para o Apostador Sério
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            A <span translate="no">RT Sports Manager</span> oferece a estrutura
            profissional que faltava para você deixar de ser amador.
          </Typography>
        </Box>

        {/* Features */}
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", p: 3, height: "100%" }} elevation={0}>
                <CardContent>
                  {feature.icon}
                  <Typography variant="h5" fontWeight={600} gutterBottom>
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

export default LearnMore;
