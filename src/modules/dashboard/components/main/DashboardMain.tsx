"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { useEvents } from "@/modules/events/hooks/useEvents";
import { useBankrollContext } from "@/components/Providers/BankrollContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { EventItem } from "@/modules/events/schemas/EventItem";
import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import MetricCard from "../../metrics/MetricCard";
import ModalityBarChart from "../../charts/main/ModalityBarChart";
import ResultPieChart from "../../charts/main/ResultPieChart";
import BankrollBalanceChart from "../../charts/BankrollBalanceChart";
import BankrollChips from "./mainComponents/BankrollChips";

const DashboardMainPage: React.FC = () => {
  const theme = useTheme();
  const { events, loading: eventsLoading } = useEvents();
  const { bankrolls, isLoading: bankrollLoading } = useBankrollContext();
  const loading = eventsLoading || bankrollLoading;
  const [dashboardSelectedBankrollId, setDashboardSelectedBankrollId] =
    useState<string>("all");

  useEffect(() => {
    if (!bankrolls) return;

    if (bankrolls.length === 0) {
      setDashboardSelectedBankrollId("all");
    } else if (bankrolls.length === 1) {
      setDashboardSelectedBankrollId(String(bankrolls[0].id));
    } else {
      setDashboardSelectedBankrollId("all");
    }
  }, [bankrolls]);

  const getFilteredEvents = useCallback(
    (bankrollId: string): EventItem[] => {
      if (bankrollId === "all") {
        return events;
      }

      const bankrollIdNum = parseInt(bankrollId, 10);
      return events.filter((event: EventItem) => {
        return event.bankId === bankrollIdNum;
      });
    },
    [events]
  );

  const getBankrollBalance = useCallback(
    (bankrollId: string): number => {
      if (bankrollId === "all") {
        return (
          bankrolls?.reduce((sum: number, bank: BankrollDto) => {
            const balanceAsNumber = Number(bank.balance) || 0;
            return sum + balanceAsNumber;
          }, 0) ?? 0
        );
      }

      const bankrollIdNum = parseInt(bankrollId, 10);
      const bankroll = bankrolls?.find(
        (bank: BankrollDto) => bank.id === bankrollIdNum
      );
      return bankroll ? Number(bankroll.balance) || 0 : 0;
    },
    [bankrolls]
  );

  const getMetricsByBankroll = useCallback(
    (bankrollId: string) => {
      const filteredEvents = getFilteredEvents(bankrollId);

      let profitLoss = 0;
      let wagered = 0;
      let wins = 0;
      let losses = 0;
      let voids = 0;
      let totalROI = 0;

      const pending: EventItem[] = [];

      filteredEvents.forEach((event: EventItem) => {
        const amount = Number(event.amount) || 0;
        if (!event.result || event.result === "pending") {
          pending.push(event);
          return;
        }

        wagered += amount;

        if (event.result === "win") {
          const oddValue = parseFloat(event.odd) || 1;
          const profit = amount * oddValue - amount;
          profitLoss += profit;
          totalROI += profit;
          wins++;
        } else if (event.result === "lose") {
          profitLoss -= amount;
          totalROI -= amount;
          losses++;
        } else if (event.result === "void" || event.result === "returned") {
          voids++;
        }
      });

      const total = filteredEvents.length;
      const decidedEvents = wins + losses;
      const rate = decidedEvents > 0 ? (wins / decidedEvents) * 100 : 0;
      const roi = wagered > 0 ? (totalROI / wagered) * 100 : 0;

      return {
        totalProfitLoss: parseFloat(profitLoss.toFixed(2)),
        totalWagered: parseFloat(wagered.toFixed(2)),
        winRate: parseFloat(rate.toFixed(2)),
        roi: parseFloat(roi.toFixed(2)),
        totalEvents: total,
        winCount: wins,
        lossCount: losses,
        voidCount: voids,
        pendingEvents: pending,
      };
    },
    [getFilteredEvents]
  );

  const {
    totalProfitLoss,
    totalWagered,
    winRate,
    roi,
    totalEvents,
    winCount,
    lossCount,
    pendingEvents,
  } = useMemo(() => {
    return getMetricsByBankroll(dashboardSelectedBankrollId);
  }, [dashboardSelectedBankrollId, getMetricsByBankroll]);

  const totalBalance = useMemo(() => {
    return getBankrollBalance(dashboardSelectedBankrollId);
  }, [dashboardSelectedBankrollId, getBankrollBalance]);

  const selectedBankrollName = useMemo(() => {
    if (dashboardSelectedBankrollId === "all") {
      return "Todas as Bancas";
    }
    const bankroll = bankrolls.find(
      (b) => b.id === parseInt(dashboardSelectedBankrollId, 10)
    );
    return bankroll?.name || "Banca Selecionada";
  }, [dashboardSelectedBankrollId, bankrolls]);

  const handleBankrollChange = (event: SelectChangeEvent) => {
    setDashboardSelectedBankrollId(event.target.value);
  };

  const hasData = totalEvents > 0 || totalBalance > 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        p: { xs: 1.5, sm: 2, md: 4 },
      }}
    >
      <Container maxWidth={false}>
        {/* Cabeçalho com título e seletor de banca */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Performance
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {selectedBankrollName}
            </Typography>
          </Box>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="bankroll-select-label">
              Selecione a banca
            </InputLabel>
            <Select
              labelId="bankroll-select-label"
              id="bankroll-select"
              value={dashboardSelectedBankrollId}
              label="Selecione a banca"
              onChange={handleBankrollChange}
            >
              <MenuItem value="all">Todas as bancas</MenuItem>
              {bankrolls?.map((bankroll: BankrollDto) => (
                <MenuItem key={bankroll.id} value={bankroll.id.toString()}>
                  {bankroll.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", minHeight: 300 }}
          >
            <CircularProgress />
          </Box>
        ) : !hasData ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            Nenhum dado disponível para exibir. Comece adicionando bancas e
            eventos.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {/* Cards de Métricas Principais */}
            <Grid item xs={6} sm={6} md={4} lg={2}>
              <MetricCard
                title="Unidades de Lucro"
                value={`${
                  totalProfitLoss >= 0 ? "+ " : " "
                }${totalProfitLoss} unids`}
                color={
                  totalProfitLoss >= 0 ? "#17ad1a" : theme.palette.error.main
                }
                subText={`Total de apostas: ${totalEvents}`}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4} lg={2}>
              <MetricCard
                title="Saldo Total"
                value={formatCurrency(totalBalance)}
                color={theme.palette.mode === "dark" ? "#73889d" : "#73889d"}
                valueColor={
                  theme.palette.mode === "dark" ? "#73889d" : undefined
                }
                subText={`Bancas: ${selectedBankrollName}`}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4} lg={2}>
              <MetricCard
                title="Entradas Pendentes"
                value={pendingEvents.length + " entradas"}
                color={pendingEvents.length > 0 ? "#E0A800" : "#17ad1a"}
                subText={`${
                  totalEvents > 0
                    ? ((pendingEvents.length / totalEvents) * 100).toFixed(1)
                    : 0
                }% do total`}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4} lg={2}>
              <MetricCard
                title="Stake Total Apostada"
                value={totalWagered + " unids"}
                color={theme.palette.info.main}
                subText={
                  totalEvents > 0
                    ? `Média: ${(totalWagered / totalEvents).toFixed(2)} unids`
                    : "Sem apostas"
                }
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4} lg={2}>
              <MetricCard
                title="Taxa de Vitórias"
                value={winRate.toFixed(1)}
                color={winRate > 50 ? "#17ad1a" : theme.palette.warning.main}
                isCurrency={false}
                subText={`Ganha/Perdida: ${winCount}/${lossCount}`}
              />
            </Grid>

            {/* ROI Card - Nova métrica adicionada */}
            <Grid item xs={6} sm={6} md={4} lg={2}>
              <MetricCard
                title="ROI"
                value={`${roi >= 0 ? "+" : ""}${roi.toFixed(2)}`}
                color={roi >= 0 ? "#17ad1a" : theme.palette.error.main}
                isCurrency={false}
                subText="Retorno sobre Investimento"
              />
            </Grid>

            {/* Gráficos */}
            <Grid
              item
              xs={12}
              lg={12}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Card elevation={0} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Evolução da Banca
                </Typography>
                <BankrollBalanceChart
                  bankrollId={
                    dashboardSelectedBankrollId === "all"
                      ? "all"
                      : parseInt(dashboardSelectedBankrollId, 10)
                  }
                />
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              lg={6}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Card elevation={0} sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  Distribuição por Modalidade
                </Typography>
                <ModalityBarChart
                  selectedBankrollId={
                    dashboardSelectedBankrollId === "all"
                      ? null
                      : Number(dashboardSelectedBankrollId)
                  }
                />
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              lg={6}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Card elevation={0} sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  Distribuição por Resultados
                </Typography>
                <ResultPieChart
                  selectedBankrollId={
                    dashboardSelectedBankrollId === "all"
                      ? null
                      : Number(dashboardSelectedBankrollId)
                  }
                />
              </Card>
            </Grid>

            {/* Chips das Bancas */}
            <Grid item xs={12}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Resumo das Bancas
                  </Typography>
                  <BankrollChips
                    bankrolls={
                      dashboardSelectedBankrollId === "all"
                        ? bankrolls
                        : bankrolls.filter(
                            (bank) =>
                              bank.id ===
                              parseInt(dashboardSelectedBankrollId, 10)
                          )
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default DashboardMainPage;
