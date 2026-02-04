import React, { useMemo } from "react";
import { BarChart } from "@mui/x-charts";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEvents } from "@/modules/events/hooks/useEvents";

interface ModalityBarChartProps {
  selectedBankrollId: number | null;
}

const ModalityBarChart: React.FC<ModalityBarChartProps> = ({
  selectedBankrollId,
}) => {
  const theme = useTheme();
  const { events, loading } = useEvents();
  const chartHeight = 300;

  const filteredEvents = useMemo(() => {
    if (selectedBankrollId === null) return events;
    return events.filter((e) => e.bankrollId === selectedBankrollId);
  }, [events, selectedBankrollId]);

  const modalityChartData = useMemo(() => {
    const map: { [key: string]: number } = {};

    filteredEvents.forEach((event) => {
      const modality = event.modality || "Sem Modalidade";
      if (!map[modality]) {
        map[modality] = 0;
      }
      map[modality]++;
    });

    return Object.keys(map)
      .map((mod) => ({
        name: mod,
        wagers: map[mod],
      }))
      .sort((a, b) => b.wagers - a.wagers);
  }, [filteredEvents]);

  const xAxisData = modalityChartData.map((d) => d.name);

  const barSeries = [
    {
      data: modalityChartData.map((d) => d.wagers),
      label: "Apostas",
      color: theme.palette.secondary.main,
      barWidth: 25,
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

  return (
    <Card sx={{ height: "100%" }} elevation={0}>
      <CardContent>
        <Box sx={{ height: chartHeight, width: "100%" }}>
          {modalityChartData.length > 0 ? (
            <BarChart
              height={chartHeight}
              series={barSeries}
              xAxis={[
                {
                  data: xAxisData,
                  scaleType: "band",
                  categoryGapRatio: 0.95,
                },
              ]}
              yAxis={[
                {
                  label: "Qtd. Apostas",
                },
              ]}
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
              grid={{ horizontal: true }}
              sx={{
                [`& .${axisClasses.left} .${axisClasses.tickLabel}`]: {
                  fill: theme.palette.text.secondary,
                },
                [`& .${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                  fill: theme.palette.text.secondary,
                  transform: "rotate(-45deg)",
                  textAnchor: "end",
                },
              }}
            />
          ) : (
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="text.secondary">
                Nenhuma aposta cadastrada para exibir.
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModalityBarChart;
