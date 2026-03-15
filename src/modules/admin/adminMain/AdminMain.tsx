import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import { StatCard } from "./mainComponents/StatCard";
import MetricCard from "@/modules/dashboard/metrics/MetricCard";

export default function AdminMain() {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar />

      <Container maxWidth={false} disableGutters sx={{ p: 0 }}>
        <Typography variant="h4" gutterBottom>
          Olá, Administrador
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={4} lg={2}>
            <MetricCard
              title="Total Usuários"
              value="2,543"
              change="+12%"
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Usuários"
              value="2,543"
              change="+12%"
              color="success"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Receita"
              value="R$ 45.200"
              change="+8.2%"
              color="success"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Conversão"
              value="3.2%"
              change="-1.5%"
              color="error"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
