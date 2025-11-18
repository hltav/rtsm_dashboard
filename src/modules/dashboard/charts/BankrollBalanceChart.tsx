/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { useBankrollContext } from "@/components/Providers/BankrollContext";
import { useBankrollHistory } from "@/modules/bankroll/hook/useBankrollHistory";
import { useState, useMemo, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { useFilteredBankrollHistory } from "../hooks/useFilteredBankrollHistory";

interface BankrollBalanceChartProps {
  bankrollId: number | null;
}

export default function BankrollBalanceChart({
  bankrollId,
}: BankrollBalanceChartProps) {
  const { bankrolls, isLoading: isLoadingContext } = useBankrollContext();
  const [selectedBankId, setSelectedBankId] = useState(bankrollId ?? null);

  useEffect(() => {
    setSelectedBankId(bankrollId);
  }, [bankrollId]);

  const {
    data: bankrollHistory,
    isLoading: isLoadingHistory,
    error,
  } = useBankrollHistory(selectedBankId ?? 0);
  const [filterMode, setFilterMode] = useState<"all" | "daily">("all");
  const [resultFilter, setResultFilter] = useState<
    "all" | "won" | "lost" | "profitloss"
  >("all");
  const theme = useTheme();
  const bankroll = bankrolls?.find((b) => b.id === selectedBankId);
  const filteredHistory = useFilteredBankrollHistory(
    bankrollHistory,
    filterMode
  );
  const resultFilteredHistory = useMemo(() => {
    if (!filteredHistory) return [];
    return filteredHistory.filter((h) => {
      if (resultFilter === "all") return true;
      if (resultFilter === "won") return h.type === "BET_WON";
      if (resultFilter === "lost") return h.type === "BET_LOST";
      if (resultFilter === "profitloss")
        return h.type === "BET_WON" || h.type === "BET_LOST";
      return true;
    });
  }, [filteredHistory, resultFilter]);

  const chartData = useMemo(() => {
    const source = resultFilteredHistory;

    if (!source || source.length === 0) {
      return {
        dates: [],
        balances: [],
        netProfit: 0,
        profitColor: "#ecec09",
      };
    }

    const dates = source.map((p) => new Date(p.date));
    const balances = source.map((p) =>
      parseFloat((p.balanceAfter ?? p.balanceBefore ?? 0).toString())
    );

    const first = balances[0];
    const last = balances[balances.length - 1];
    const netProfit = last - first;
    const profitColor =
      netProfit >= 0
        ? theme.palette.mode === "light"
          ? "#17ad1a"
          : "#17ad1a"
        : theme.palette.mode === "light"
        ? "#56181c"
        : "#c62828";

    return { dates, balances, netProfit, profitColor };
  }, [resultFilteredHistory, theme]);

  const { dates, balances, netProfit, profitColor } = chartData;
  const yScaleConfig = useMemo(() => {
    if (!bankroll) {
      return {
        minValue: undefined,
        maxValue: undefined,
        yTicks: undefined,
      };
    }

    const initial = Number(bankroll.initialBalance ?? 0);
    const current = Number(bankroll.balance ?? initial);
    const range = initial * 0.25;
    const minValue = initial - range;
    const maxValue = initial + range;
    const yTicks = [
      minValue,
      initial - range / 2,
      initial,
      initial + range / 2,
      maxValue,
    ];
    return { minValue, maxValue, yTicks };
  }, [bankroll]);

  if (!bankroll) {
    return (
      <Stack width="100%" sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error">Banca não encontrada</Typography>
      </Stack>
    );
  }

  return (
    <Card elevation={0}>
      <CardContent>
        <Stack width="100%">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ my: 1 }}
            >
              <Typography variant="h6">Evolução do Saldo –</Typography>

              {bankrolls.length > 1 ? (
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <Select
                    value={selectedBankId ?? ""}
                    onChange={(e) => setSelectedBankId(Number(e.target.value))}
                    displayEmpty
                    renderValue={() => (
                      <Typography variant="h6" component="span">
                        {bankroll?.name}
                      </Typography>
                    )}
                    sx={{
                      ".MuiSelect-select": { py: 0.5 },
                    }}
                  >
                    {bankrolls.map((b) => (
                      <MenuItem key={b.id} value={b.id}>
                        {b.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="h6" component="span">
                  {bankroll.name}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={4}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Atualizações</InputLabel>
                <Select
                  label="Atualizações"
                  value={filterMode}
                  onChange={(e) =>
                    setFilterMode(e.target.value as "all" | "daily")
                  }
                >
                  <MenuItem value="daily">Última atualização do dia</MenuItem>
                  <MenuItem value="all">Todas as atualizações</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Resultados</InputLabel>
                <Select
                  label="Resultados"
                  value={resultFilter}
                  onChange={(e) =>
                    setResultFilter(
                      e.target.value as "all" | "won" | "lost" | "profitloss"
                    )
                  }
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="won">Somente Ganhos</MenuItem>
                  <MenuItem value="lost">Somente Perdas</MenuItem>
                  <MenuItem value="profitloss">Lucro/Prejuízo</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
      
          {isLoadingContext || isLoadingHistory ? (
            <Stack width="100%" sx={{ textAlign: "center", py: 4 }}>
              <Typography>Carregando gráfico...</Typography>
            </Stack>
          ) : error ? (
            <Stack width="100%" sx={{ textAlign: "center", py: 4 }}>
              <Typography color="error">
                Erro ao carregar dados do gráfico.
              </Typography>
            </Stack>
          ) : !bankroll ? (
            <Stack width="100%" sx={{ textAlign: "center", py: 4 }}>
              <Typography color="error">Banca não encontrada</Typography>
            </Stack>
          ) : !bankrollHistory || bankrollHistory.length === 0 ? (
            <Stack width="100%" sx={{ textAlign: "center", py: 4 }}>
              <Typography>
                Nenhum histórico disponível para exibir o gráfico
              </Typography>
            </Stack>
          ) : resultFilteredHistory.length === 0 ? (
            <Stack width="100%" sx={{ textAlign: "center", py: 4 }}>
              <Typography>
                Nenhum registro encontrado com esse filtro.
              </Typography>
            </Stack>
          ) : (
            <>
              <LineChart
                xAxis={[
                  {
                    scaleType: "point",
                    data: dates,
                    valueFormatter: (date) =>
                      date.toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                  },
                ]}
                yAxis={[
                  {
                    min: yScaleConfig.minValue,
                    max: yScaleConfig.maxValue,
                  },
                ]}
                series={[
                  {
                    label: "Saldo",
                    data: balances,
                    color: profitColor,
                    showMark: true,
                    valueFormatter: (v) =>
                      v?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }) ?? "",
                  },
                ]}
                height={320}
                grid={{ horizontal: true }}
              />
              <Typography
                variant="body2"
                sx={{
                  alignSelf: "center",
                  mt: 1,
                  color: profitColor,
                  fontWeight: 600,
                }}
              >
                {netProfit >= 0 ? "Lucro líquido: " : "Prejuízo: "}
                {netProfit.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
