'use client';
import React from 'react';
import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';


const StatsCards: React.FC = () => {
  const stats = [
    { title: 'Saldo Atual Bankroll', value: 'R$ 1.500,00', description: 'Última atualização: hoje' },
    { title: 'Previsões Pendentes', value: '12', description: 'Aguardando resultados' },
    { title: 'Eventos Próximos', value: '5', description: 'Nos próximos 7 dias' },
    { title: 'Vitórias', value: '75%', description: 'Taxa de sucesso' },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200 }}>
            <Typography variant="h6">{stat.title}</Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>{stat.value}</Typography>
            <Typography variant="body2" color="text.secondary">{stat.description}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;