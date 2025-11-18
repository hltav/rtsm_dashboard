import React, { useMemo } from "react";
import { PieChart } from "@mui/x-charts";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useEvents } from "@/modules/events/hooks/useEvents";

interface ResultDataItem {
  name: string;
  value: number;
  color: string;
}

const ResultPieChart: React.FC = () => {
  const theme = useTheme();
  const { events, loading } = useEvents();
  const chartHeight = 300;

  const { resultData, totalEventsDecided } = useMemo(() => {
    let winCount = 0;
    let lossCount = 0;
    let voidCount = 0;

    events.forEach((event) => {
      if (event.result === "win") {
        winCount++;
      } else if (event.result === "lose") {
        lossCount++;
      } else if (event.result === "void" || event.result === "returned") {
        voidCount++;
      }
    });

    const data: ResultDataItem[] = [
      {
        name: "Vitória",
        value: winCount,
        color: "#17ad1a",
      },
      {
        name: "Derrota",
        value: lossCount,
        color: theme.palette.error.main,
      },
      {
        name: "Anulada",
        value: voidCount,
        color: theme.palette.warning.main,
      },
    ].filter((item) => item.value > 0);

    return {
      resultData: data,
      totalEventsDecided: winCount + lossCount + voidCount,
    };
  }, [events, theme]);

  const pieSeries = [
    {
      data: resultData.map((item) => ({
        id: item.name,
        value: item.value,
        label: `${item.name} (${item.value})`,
        color: item.color,
      })),
      innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
    },
  ];

  if (loading) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent
          sx={{
            height: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (totalEventsDecided === 0) {
    return (
      <Card sx={{ height: "100%" }} elevation={0}>
        <CardContent
          sx={{
            height: 350,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Distribuição de Resultados
          </Typography>
          <Typography color="text.secondary">
            Nenhum evento decidido para exibir o gráfico.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: "100%" }} elevation={0}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Distribuição de Resultados
        </Typography>
        <Box sx={{ height: chartHeight, width: "100%" }}>
          <PieChart
            series={pieSeries}
            height={chartHeight}
            // Corrigido: Usando "center" em vez de "middle" para horizontal
            slotProps={{
              legend: {
                position: { vertical: "bottom", horizontal: "center" },
              },
              // tooltip: {
              //   // Formata o valor exibido no tooltip
              //   valueFormatter: (value) => `${value} apostas`,
              // },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultPieChart;
