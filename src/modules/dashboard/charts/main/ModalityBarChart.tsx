import React, { useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Chip,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEvents } from "@/modules/events/hooks/useEvents";
import { colors } from "../interface/colors.interface";

interface ModalityBarChartProps {
  selectedBankrollId: number | null;
}

type GroupLevel = "category" | "market" | "selection";

const ModalityBarChart: React.FC<ModalityBarChartProps> = ({
  selectedBankrollId,
}) => {
  const theme = useTheme();
  const { events, loading } = useEvents();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [topLimit, setTopLimit] = useState(8);

  const filteredEvents = useMemo(() => {
    let list =
      selectedBankrollId === null
        ? events
        : events.filter((e) => e.bankrollId === selectedBankrollId);

    if (selectedCategory !== "all") {
      list = list.filter((e) => e.marketCategory === selectedCategory);
    }

    if (selectedMarket !== "all") {
      list = list.filter((e) => e.market === selectedMarket);
    }

    return list;
  }, [events, selectedBankrollId, selectedCategory, selectedMarket]);

  const categories = useMemo(
    () =>
      [...new Set(events.map((e) => e.marketCategory).filter(Boolean))].sort(),
    [events],
  );

  const markets = useMemo(() => {
    const base =
      selectedCategory === "all"
        ? events
        : events.filter((e) => e.marketCategory === selectedCategory);

    return [...new Set(base.map((e) => e.market).filter(Boolean))].sort();
  }, [events, selectedCategory]);

  const groupLevel: GroupLevel = useMemo(() => {
    if (selectedMarket !== "all") return "selection";
    if (selectedCategory !== "all") return "market";
    return "category";
  }, [selectedCategory, selectedMarket]);

  const chartData = useMemo(() => {
    const map: Record<string, number> = {};

    filteredEvents.forEach((event) => {
      let key = "Não informado";

      if (groupLevel === "category")
        key = event.marketCategory || "Sem categoria";
      else if (groupLevel === "market") key = event.market || "Sem mercado";
      else key = event.selection || "Sem opção";

      map[key] = (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .map(([label, value], index) => ({
        label,
        value,
        color: colors[index % colors.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, topLimit);
  }, [filteredEvents, groupLevel, topLimit]);

  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  const titleMap: Record<GroupLevel, string> = {
    category: "Distribuição por tipo de mercado",
    market: "Distribuição por mercado",
    selection: "Distribuição por opção de aposta",
  };

  const subtitleMap: Record<GroupLevel, string> = {
    category: "Visão geral das categorias mais utilizadas",
    market: "Mercados mais usados dentro da categoria selecionada",
    selection: "Opções mais usadas dentro do mercado selecionado",
  };

  const chartHeight = useMemo(() => {
    if (chartData.length <= 1) return 320;
    if (chartData.length === 2) return 320;
    if (chartData.length === 3) return 320;
    return Math.max(320, chartData.length * 52);
  }, [chartData.length]);

  const categoryGapRatio = useMemo(() => {
    if (chartData.length <= 1) return 0.85;
    if (chartData.length === 2) return 0.65;
    if (chartData.length === 3) return 0.45;
    if (chartData.length <= 6) return 0.3;
    return 0.2;
  }, [chartData.length]);

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          height: "100%",
          border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
          borderRadius: 4,
          background: theme.palette.background.paper,
        }}
      >
        <CardContent
          sx={{
            minHeight: 380,
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
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        background: `linear-gradient(180deg, ${alpha(
          theme.palette.background.paper,
          1,
        )} 0%, ${alpha(theme.palette.background.paper, 0.96)} 100%)`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {titleMap[groupLevel]}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitleMap[groupLevel]}
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            useFlexGap
            flexWrap="wrap"
          >
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={selectedCategory}
                label="Categoria"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedMarket("all");
                }}
              >
                <MenuItem value="all">Todas</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{ minWidth: 200 }}
              disabled={selectedCategory === "all"}
            >
              <InputLabel>Mercado</InputLabel>
              <Select
                value={selectedMarket}
                label="Mercado"
                onChange={(e) => setSelectedMarket(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                {markets.map((market) => (
                  <MenuItem key={market} value={market}>
                    {market}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Top</InputLabel>
              <Select
                value={String(topLimit)}
                label="Top"
                onChange={(e) => setTopLimit(Number(e.target.value))}
              >
                <MenuItem value="5">Top 5</MenuItem>
                <MenuItem value="8">Top 8</MenuItem>
                <MenuItem value="10">Top 10</MenuItem>
                <MenuItem value="15">Top 15</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              size="small"
              label={`Total exibido: ${total}`}
              variant="outlined"
            />
            <Chip
              size="small"
              label={`Itens: ${chartData.length}`}
              variant="outlined"
            />
            {selectedCategory !== "all" && (
              <Chip size="small" label={`Categoria: ${selectedCategory}`} />
            )}
            {selectedMarket !== "all" && (
              <Chip size="small" label={`Mercado: ${selectedMarket}`} />
            )}
          </Stack>

          {chartData.length > 0 ? (
            <Box
              sx={{
                height: chartHeight,
                width: "100%",
              }}
            >
              <BarChart
                dataset={chartData}
                layout="horizontal"
                yAxis={[
                  {
                    scaleType: "band",
                    dataKey: "label",
                    width: 160,
                    categoryGapRatio,
                    valueFormatter: (value) => String(value ?? ""),
                    colorMap: {
                      type: "ordinal",
                      values: chartData.map((item) => item.label),
                      colors: chartData.map(
                        (_, i) => colors[i % colors.length],
                      ),
                    },
                  },
                ]}
                xAxis={[
                  {
                    label: "Qtd. de apostas",
                  },
                ]}
                series={[
                  {
                    dataKey: "value",
                    label: "Apostas",
                    valueFormatter: (value) =>
                      `${value} aposta${value !== 1 ? "s" : ""}`,
                  },
                ]}
                margin={{ top: 10, right: 48, bottom: 40, left: 20 }}
                borderRadius={8}
                grid={{ vertical: true }}
                barLabel={(item) => `${item.value}`}
                sx={{
                  [`& .${axisClasses.left} .${axisClasses.tickLabel}`]: {
                    fill: theme.palette.text.primary,
                    fontSize: 12,
                  },
                  [`& .${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                  },
                  [`& .${axisClasses.bottom} .${axisClasses.label}`]: {
                    fill: theme.palette.text.secondary,
                  },
                  "& .MuiChartsGrid-line": {
                    stroke: alpha(theme.palette.common.white, 0.08),
                  },
                  "& .MuiBarElement-root:hover": {
                    filter: "brightness(1.12)",
                    cursor: "pointer",
                  },
                  "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": {
                    stroke: alpha(theme.palette.common.white, 0.18),
                  },
                  "& .MuiBarLabel-root": {
                    fill: theme.palette.common.white,
                    fontSize: 11,
                    fontWeight: 600,
                  },
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                minHeight: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                border: `1px dashed ${alpha(theme.palette.divider, 0.8)}`,
              }}
            >
              <Typography color="text.secondary">
                Nenhuma aposta encontrada para os filtros selecionados.
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ModalityBarChart;
