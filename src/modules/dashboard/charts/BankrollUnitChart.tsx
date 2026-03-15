"use client";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { useBankrollContext } from "@/components/Providers/BankrollContext";
import { useMemo, useEffect, useCallback, useState } from "react";
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
import { BankrollUnitsChartProps } from "./interface/bankrollBalance.interface";
import { ptBR } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  getRange,
  Period,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "./utils/dateRanges";
import {
  ResultUnitsFilter,
  SeriesUnitsData,
} from "./types/bankrollUnits.types";
import { buildUnitsSeries } from "./functions/bankrollUnits.functions";
import {
  normalizeDaily,
  normalizeHourly,
  normalizeMonthly,
} from "./functions/normalizeSnapshots";
import { BankrollUnitsSnapshotFetcher } from "./functions/bankrollUnitsSnapshotFetcher";
import { parseRangeDates, isInRange } from "./helpers/range.helpers";

export default function BankrollUnitsChart({
  bankrollId,
  period,
  selectedDate,
  customStart,
  customEnd,
  onPeriodChange,
  onSelectedDateChange,
  onCustomStartChange,
  onCustomEndChange,
}: BankrollUnitsChartProps) {
  const safeSelectedDate = useMemo(
    () => selectedDate ?? new Date(),
    [selectedDate],
  );
  const { bankrolls, isLoading: isLoadingContext } = useBankrollContext();

  const [selectedBankId, setSelectedBankId] = useState<number | "all" | null>(
    bankrollId ?? null,
  );

  useEffect(() => {
    setSelectedBankId(bankrollId);
  }, [bankrollId]);

  const isAll = selectedBankId === "all";

  const range = useMemo(
    () =>
      getRange(period, safeSelectedDate, {
        start: customStart ?? new Date(),
        end: customEnd ?? new Date(),
      }),
    [period, safeSelectedDate, customStart, customEnd],
  );

  const [resultFilter, setResultFilter] = useState<ResultUnitsFilter>("all");

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
    { year: safeSelectedDate.getFullYear() },
    !isAll && period === "year",
  );

  const isLoadingSnapshots =
    !isAll &&
    ((period === "day" && hourlyQ.isLoading) ||
      ((period === "week" || period === "month" || period === "custom") &&
        dailyQ.isLoading) ||
      (period === "year" && monthlyQ.isLoading));

  const error = useMemo(() => {
    if (isAll) return null;
    if (period === "day") return hourlyQ.error ?? null;
    if (period === "week" || period === "month" || period === "custom") {
      return dailyQ.error ?? null;
    }
    return monthlyQ.error ?? null;
  }, [isAll, period, hourlyQ.error, dailyQ.error, monthlyQ.error]);

  const singleSeries = useMemo<SeriesUnitsData>(() => {
    if (isAll) return { dates: [], values: [], net: 0 };

    if (period === "day") {
      const raw = hourlyQ.data ?? [];
      const { start, end } = parseRangeDates(range);

      const filtered =
        start && end
          ? raw.filter((r) => {
              const d = new Date(r.bucketStart);
              return isInRange(d, start, end);
            })
          : raw;

      const normalized = normalizeHourly(filtered);
      return buildUnitsSeries(normalized, resultFilter, true);
    }

    if (period === "week" || period === "month" || period === "custom") {
      const raw = dailyQ.data ?? [];

      const filtered = raw.filter((r) => {
        const d = new Date(r.year, r.month - 1, r.day, 0, 0, 0, 0);

        if (period === "week") {
          const start = startOfWeek(safeSelectedDate);
          const end = endOfWeek(safeSelectedDate);
          return d >= start && d <= end;
        }

        if (period === "month") {
          const start = startOfMonth(safeSelectedDate);
          const end = endOfMonth(safeSelectedDate);
          return d >= start && d <= end;
        }

        if (period === "custom" && customStart && customEnd) {
          const start = startOfDay(customStart);
          const end = endOfDay(customEnd);
          return d >= start && d <= end;
        }

        return true;
      });

      const normalized = normalizeDaily(filtered);
      return buildUnitsSeries(normalized, resultFilter, true);
    }

    const normalized = normalizeMonthly(monthlyQ.data ?? []);
    return buildUnitsSeries(normalized, resultFilter, true);
  }, [
    isAll,
    period,
    hourlyQ.data,
    dailyQ.data,
    monthlyQ.data,
    resultFilter,
    range,
    safeSelectedDate,
    customStart,
    customEnd,
  ]);

  const profitColor = singleSeries.net >= 0 ? "#17ad1a" : "#c62828";

  const [allBankSeriesMap, setAllBankSeriesMap] = useState<
    Record<number, SeriesUnitsData>
  >({});

  const handleBankSeriesLoaded = useCallback(
    (id: number, series: SeriesUnitsData) => {
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
        values: [],
        net: 0,
      },
    }));
  }, [isAll, bankrolls, allBankSeriesMap]);

  const colorPalette = useMemo(
    () => ["#17ad1a", "#e42a2a", "#1976d2", "#9c27b0", "#ecec09"],
    [],
  );

  const xFormatter = useCallback(
    (date: Date) =>
      date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        ...(period === "day" ? { hour: "2-digit", minute: "2-digit" } : {}),
      }),
    [period],
  );

  const allSeriesReady = useMemo(() => {
    if (!isAll) return [];

    return allBankSeriesList
      .filter((b) => (b.series?.values?.length ?? 0) > 0)
      .map((b, i) => ({
        label: b.name,
        data: b.series.values,
        color: colorPalette[i % colorPalette.length],
        showMark: true,
        valueFormatter: (v: number | null) =>
          v == null ? "" : `${v.toLocaleString("pt-BR")} unids`,
      }));
  }, [isAll, allBankSeriesList, colorPalette]);

  const allXAxisDates = useMemo(() => {
    if (!isAll) return [];
    const withData = allBankSeriesList.find(
      (b) => (b.series?.dates?.length ?? 0) > 0,
    );
    return withData?.series.dates ?? [];
  }, [isAll, allBankSeriesList]);

  return (
    <Card elevation={0}>
      {isAll &&
        bankrolls.map((b) => (
          <BankrollUnitsSnapshotFetcher
            key={b.id}
            id={b.id}
            period={period}
            range={range}
            year={safeSelectedDate.getFullYear()}
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
                  onChange={(e) => onPeriodChange(e.target.value as Period)}
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
                    value={safeSelectedDate}
                    onChange={(v) => v && onSelectedDateChange(v)}
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
                  <>
                    <DatePicker
                      label="De"
                      value={customStart}
                      onChange={(v) => onCustomStartChange(v)}
                      maxDate={customEnd ?? undefined}
                      slotProps={{
                        textField: { size: "small", sx: { minWidth: 150 } },
                      }}
                    />
                    <DatePicker
                      label="Até"
                      value={customEnd}
                      onChange={(v) => onCustomEndChange(v)}
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
                    setResultFilter(e.target.value as ResultUnitsFilter)
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
              allSeriesReady.length > 0 ? (
                <LineChart
                  xAxis={[
                    {
                      scaleType: "point",
                      data: allXAxisDates,
                      valueFormatter: xFormatter,
                    },
                  ]}
                  series={allSeriesReady}
                  height={320}
                  grid={{ horizontal: true }}
                />
              ) : (
                !isLoadingSnapshots && (
                  <Typography sx={{ textAlign: "center", opacity: 0.8 }}>
                    Nenhuma banca possui dados no período selecionado.
                  </Typography>
                )
              )
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
                  yAxis={[{}]}
                  series={[
                    {
                      label: "Evolução em unidades",
                      data: singleSeries.values,
                      color: profitColor,
                      showMark: true,
                      valueFormatter: (v) =>
                        v == null ? "" : `${v.toLocaleString("pt-BR")} unids`,
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
                    {singleSeries.net >= 0
                      ? "Lucro do Período: "
                      : "Perdas do Período: "}
                    {singleSeries.net.toLocaleString("pt-BR")} unids
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
