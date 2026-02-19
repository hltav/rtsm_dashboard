"use client";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { useBankrollContext } from "@/components/Providers/BankrollContext";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDailySnapshots } from "@/modules/bankroll/hook/snapshots/useDailySnapshots";
import { useHourlySnapshots } from "@/modules/bankroll/hook/snapshots/useHourlySnapshots";
import { useMonthlySnapshots } from "@/modules/bankroll/hook/snapshots/useMonthlySnapshots";
import { buildSeries } from "./functions/bankrollBalance.functions";
import { BankrollBalanceChartProps } from "./interface/bankrollBalance.interface";
import { ResultFilter, SeriesData } from "./types/bankrollBalance.types";
import { ptBR } from "date-fns/locale";
import { BankrollSnapshotFetcher } from "./functions/bankrollSnapshotFetcher";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Period, getRange } from "./utils/dateRanges";

export default function BankrollBalanceChart({
  bankrollId,
}: BankrollBalanceChartProps) {
  const { bankrolls, isLoading: isLoadingContext } = useBankrollContext();
  const [selectedBankId, setSelectedBankId] = useState<number | "all" | null>(
    bankrollId ?? null,
  );

  useEffect(() => {
    setSelectedBankId(bankrollId);
  }, [bankrollId]);

  const isAll = selectedBankId === "all";
  const [period, setPeriod] = useState<Period>("day");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [customStart, setCustomStart] = useState<Date | null>(null);
  const [customEnd, setCustomEnd] = useState<Date | null>(null);

  const range = useMemo(
    () =>
      getRange(period, selectedDate, {
        start: customStart ?? new Date(),
        end: customEnd ?? new Date(),
      }),
    [period, selectedDate, customStart, customEnd],
  );

  const [resultFilter, setResultFilter] = useState<ResultFilter>("all");

  const bankroll = !isAll
    ? bankrolls?.find((b) => b.id === selectedBankId)
    : null;

  const bankId = !isAll ? Number(selectedBankId ?? 0) : 0;

  const hourlyQ = useHourlySnapshots(bankId, range, !isAll && period === "day");
  const dailyQ = useDailySnapshots(
    bankId,
    range,
    !isAll &&
      (period === "week" ||
        period === "month" ||
        (period === "custom" && customStart !== null && customEnd !== null)),
  );

  const monthlyQ = useMonthlySnapshots(
    bankId,
    { year: selectedDate.getFullYear() },
    !isAll && period === "year",
  );

  const isLoadingSnapshots =
    !isAll &&
    ((period === "day" && hourlyQ.isLoading) ||
      (period === "week" && dailyQ.isLoading) ||
      (period === "month" && dailyQ.isLoading) ||
      (period === "custom" && dailyQ.isLoading) ||
      (period === "year" && monthlyQ.isLoading));

  // ✅ pega o erro apenas do período ativo
  const error = useMemo(() => {
    if (isAll) return null;
    if (period === "day") return hourlyQ.error ?? null;
    if (period === "month" || period === "custom") return dailyQ.error ?? null;
    return monthlyQ.error ?? null;
  }, [isAll, period, hourlyQ.error, dailyQ.error, monthlyQ.error]);

  const singleSeries = useMemo<SeriesData>(() => {
    if (isAll) return { dates: [], balances: [], netProfit: 0 };
    if (period === "day") return buildSeries(hourlyQ.data ?? [], resultFilter);
    if (period === "week" || period === "month" || period === "custom")
      return buildSeries(dailyQ.data ?? [], resultFilter);
    return buildSeries(monthlyQ.data ?? [], resultFilter);
  }, [isAll, period, hourlyQ.data, dailyQ.data, monthlyQ.data, resultFilter]);

  const profitColor = singleSeries.netProfit >= 0 ? "#17ad1a" : "#c62828";

  const [allBankSeriesMap, setAllBankSeriesMap] = useState<
    Record<number, SeriesData>
  >({});

  const handleBankSeriesLoaded = useCallback(
    (id: number, series: SeriesData) => {
      setAllBankSeriesMap((prev) => {
        if (prev[id] === series) return prev;
        return { ...prev, [id]: series };
      });
    },
    [],
  );

  const allBankSeriesList = useMemo(() => {
    if (!isAll) return [];
    return bankrolls.map((b) => ({
      id: b.id,
      name: b.name,
      series: allBankSeriesMap[b.id] ?? {
        dates: [],
        balances: [],
        netProfit: 0,
      },
    }));
  }, [isAll, bankrolls, allBankSeriesMap]);

  const colorPalette = ["#17ad1a", "#e42a2a", "#1976d2", "#9c27b0", "#ecec09"];

  const yScaleConfig = useMemo(() => {
    if (isAll || !bankroll) {
      return {
        minValue: undefined as number | undefined,
        maxValue: undefined as number | undefined,
      };
    }
    const initial = Number(bankroll.initialBalance ?? 0);
    const r = initial * 0.25;
    return { minValue: initial - r, maxValue: initial + r };
  }, [isAll, bankroll]);

  const xFormatter = useCallback(
    (date: Date) =>
      date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        ...(period === "day" ? { hour: "2-digit", minute: "2-digit" } : {}),
      }),
    [period],
  );

  return (
    <Card elevation={0}>
      {isAll &&
        bankrolls.map((b) => (
          <BankrollSnapshotFetcher
            key={b.id}
            id={b.id}
            period={period}
            range={range}
            year={selectedDate.getFullYear()}
            resultFilter={resultFilter}
            onDataLoaded={handleBankSeriesLoaded}
          />
        ))}

      <CardContent>
        <Stack width="100%">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" component="span">
              {isAll ? "Todas as bancas" : bankroll?.name}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Período</InputLabel>
                <Select
                  label="Período"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as Period)}
                >
                  <MenuItem value="day">Dia</MenuItem>
                  <MenuItem value="week">Semana</MenuItem>
                  <MenuItem value="month">Mês</MenuItem>
                  <MenuItem value="year">Ano</MenuItem>
                  <MenuItem value="custom">Personalizado</MenuItem>
                </Select>
              </FormControl>

              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                {period !== "custom" ? (
                  /* DatePicker único para dia/semana/mês/ano */
                  <DatePicker
                    label={
                      period === "day"
                        ? "Dia"
                        : period === "week"
                          ? "Semana"
                          : period === "month"
                            ? "Mês"
                            : "Ano"
                    }
                    value={selectedDate}
                    onChange={(v) => v && setSelectedDate(v)}
                    views={
                      period === "year"
                        ? ["year"]
                        : period === "month"
                          ? ["year", "month"]
                          : ["year", "month", "day"]
                    }
                    slotProps={{
                      textField: { size: "small", sx: { minWidth: 170 } },
                    }}
                  />
                ) : (
                  /* Range customizado: início e fim */
                  <>
                    <DatePicker
                      label="De"
                      value={customStart}
                      onChange={(v) => v && setCustomStart(v)}
                      maxDate={customEnd ?? undefined}
                      slotProps={{
                        textField: { size: "small", sx: { minWidth: 150 } },
                      }}
                    />
                    <DatePicker
                      label="Até"
                      value={customEnd}
                      onChange={(v) => v && setCustomEnd(v)}
                      minDate={customStart ?? undefined}
                      slotProps={{
                        textField: { size: "small", sx: { minWidth: 150 } },
                      }}
                    />
                  </>
                )}
              </LocalizationProvider>

              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Resultados</InputLabel>
                <Select
                  label="Resultados"
                  value={resultFilter}
                  onChange={(e) =>
                    setResultFilter(e.target.value as ResultFilter)
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
          {/* Loading overlay com altura fixa para não colapsar o espaço */}
          <Box sx={{ position: "relative", minHeight: 320 }}>
            {(isLoadingContext || isLoadingSnapshots) && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.6)",
                  zIndex: 1,
                  borderRadius: 1,
                }}
              >
                <CircularProgress size={40} />
              </Box>
            )}

            {isAll ? (
              <LineChart
                xAxis={[
                  {
                    scaleType: "point",
                    data: allBankSeriesList[0]?.series.dates ?? [],
                    valueFormatter: xFormatter,
                  },
                ]}
                series={allBankSeriesList.map((b, i) => ({
                  label: b.name,
                  data: b.series.balances,
                  color: colorPalette[i % colorPalette.length],
                  showMark: true,
                }))}
                height={320}
                grid={{ horizontal: true }}
              />
            ) : (
              <>
                <LineChart
                  xAxis={[
                    {
                      scaleType: "point",
                      data: singleSeries.dates,
                      valueFormatter: xFormatter,
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
                      label: "Evolução",
                      data: singleSeries.balances,
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
                {!isLoadingSnapshots && error && (
                  <Typography color="error" sx={{ textAlign: "center" }}>
                    Erro ao carregar dados do gráfico.
                  </Typography>
                )}
                {!isLoadingSnapshots && !error && (
                  <Typography
                    variant="body2"
                    sx={{
                      alignSelf: "center",
                      mt: 1,
                      color: profitColor,
                      fontWeight: 600,
                    }}
                  >
                    {singleSeries.netProfit >= 0
                      ? "Lucro líquido: "
                      : "Prejuízo: "}
                    {singleSeries.netProfit.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
