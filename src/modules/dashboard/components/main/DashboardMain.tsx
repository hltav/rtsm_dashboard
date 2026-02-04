/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { useEventsData } from "@/modules/events/hooks/useEventsData";
import { useBankrolls } from "@/modules/bankroll/hook/useBankrolls";
import { formatCurrency } from "@/utils/formatCurrency";
import { FullBet } from "@/modules/events/schemas/EventItem";
import MetricCard from "../../metrics/MetricCard";
import ModalityBarChart from "../../charts/main/ModalityBarChart";
import ResultPieChart from "../../charts/main/ResultPieChart";
import BankrollBalanceChart from "../../charts/BankrollBalanceChart";
import BankrollChips from "./mainComponents/BankrollChips";

const DashboardMainPage: React.FC = () => {
  // 1. Usando hooks do TanStack Query em vez de Contextos manuais
  const { data: events = [], isLoading: eventsLoading } = useEventsData();
  const { data: bankrolls = [], isLoading: bankrollLoading } = useBankrolls();

  const loading = eventsLoading || bankrollLoading;

  const [dashboardSelectedBankrollId, setDashboardSelectedBankrollId] =
    useState<string>("all");

  // Ajusta a seleção inicial baseada nos dados carregados
  useEffect(() => {
    if (bankrolls.length === 1) {
      setDashboardSelectedBankrollId(String(bankrolls[0].id));
    } else if (bankrolls.length === 0) {
      setDashboardSelectedBankrollId("all");
    }
  }, [bankrolls]);

  const getFilteredEvents = useCallback(
    (bankrollId: string): FullBet[] => {
      if (bankrollId === "all") return events;
      const bankrollIdNum = parseInt(bankrollId, 10);
      return events.filter((event) => event.bankrollId === bankrollIdNum);
    },
    [events],
  );

  const getBankrollBalance = useCallback(
    (bankrollId: string): number => {
      if (!bankrolls.length) return 0;

      if (bankrollId === "all") {
        return bankrolls.reduce(
          (sum, bank) => sum + (Number(bank.balance) || 0),
          0,
        );
      }

      // Comparação robusta de ID (string com string)
      const bankroll = bankrolls.find((b) => String(b.id) === bankrollId);
      return bankroll ? Number(bankroll.balance) || 0 : 0;
    },
    [bankrolls],
  );

  const metrics = useMemo(() => {
    const filteredEvents = getFilteredEvents(dashboardSelectedBankrollId);
    let profitLoss = 0,
      wagered = 0,
      wageredInUnits = 0;
    let wins = 0,
      losses = 0,
      voids = 0,
      totalROI = 0;
    const pending: FullBet[] = [];

    filteredEvents.forEach((event) => {
      const amount = Number(event.stake) || 0;
      const unitsStaked = Number(event.stakeInUnits) || 0;
      wageredInUnits += unitsStaked;

      if (!event.result || event.result === "pending") {
        pending.push(event);
        return;
      }

      wagered += amount;
      if (event.result === "win") {
        const profit = amount * (parseFloat(event.odd) || 1) - amount;
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

    const decided = wins + losses;
    return {
      totalProfitLoss: Number(profitLoss.toFixed(2)),
      totalWageredInUnits: Number(wageredInUnits.toFixed(2)),
      winRate: decided > 0 ? Number(((wins / decided) * 100).toFixed(2)) : 0,
      roi: wagered > 0 ? Number(((totalROI / wagered) * 100).toFixed(2)) : 0,
      totalEvents: filteredEvents.length,
      winCount: wins,
      lossCount: losses,
      pendingEvents: pending,
    };
  }, [dashboardSelectedBankrollId, getFilteredEvents]);

  const totalBalance = useMemo(() => {
    return getBankrollBalance(dashboardSelectedBankrollId);
  }, [dashboardSelectedBankrollId, getBankrollBalance]);

  const selectedBankrollName = useMemo(() => {
    if (dashboardSelectedBankrollId === "all") return "Todas as Bancas";
    const bankroll = bankrolls.find(
      (b) => String(b.id) === dashboardSelectedBankrollId,
    );
    return bankroll?.name || "Banca Selecionada";
  }, [dashboardSelectedBankrollId, bankrolls]);

  const handleBankrollChange = (event: SelectChangeEvent) => {
    setDashboardSelectedBankrollId(event.target.value);
  };

  const hasData = metrics.totalEvents > 0 || totalBalance > 0;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        p: { xs: 1.5, sm: 2, md: 4 },
      }}
    >
      <Container maxWidth={false}>
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
            <InputLabel>Selecione a banca</InputLabel>
            <Select
              value={dashboardSelectedBankrollId}
              label="Selecione a banca"
              onChange={handleBankrollChange}
            >
              <MenuItem value="all">Todas as bancas</MenuItem>
              {bankrolls.map((bankroll) => (
                <MenuItem key={bankroll.id} value={String(bankroll.id)}>
                  {bankroll.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {!hasData ? (
          <Alert severity="info">
            Nenhum dado disponível. Adicione bancas e eventos para começar.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {/* Metric Cards */}
            <Grid item xs={6} md={4} lg={2}>
              <MetricCard
                title="Lucro"
                value={`${metrics.totalProfitLoss} unids`}
                color={metrics.totalProfitLoss >= 0 ? "#17ad1a" : "#e42a2a"}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <MetricCard
                title="Saldo Total"
                value={formatCurrency(totalBalance)}
                color="#73889d"
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <MetricCard
                title="Entradas Pendentes"
                value={`${metrics.pendingEvents.length} entradas`}
                color={metrics.pendingEvents.length > 0 ? "#E0A800" : "#17ad1a"}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <MetricCard
                title="Total de Stakes Investidas"
                value={`${metrics.totalWageredInUnits} unids`}
                color="#09acf8"
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <MetricCard
                title="Taxa de Acerto"
                value={`${metrics.winRate}`}
                isCurrency={false}
                color={metrics.winRate > 50 ? "#17ad1a" : "#E0A800"}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <MetricCard
                title="Rentabilidade (ROI)"
                value={`${metrics.roi}`}
                isCurrency={false}
                color={metrics.roi >= 0 ? "#17ad1a" : "#e42a2a"}
              />
            </Grid>

            {/* Charts & Table */}
            <Grid item xs={12}>
              <Card elevation={0} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Evolução da Banca
                </Typography>
                <BankrollBalanceChart
                  bankrollId={
                    dashboardSelectedBankrollId === "all"
                      ? "all"
                      : Number(dashboardSelectedBankrollId)
                  }
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <ModalityBarChart
                selectedBankrollId={
                  dashboardSelectedBankrollId === "all"
                    ? null
                    : Number(dashboardSelectedBankrollId)
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ResultPieChart
                selectedBankrollId={
                  dashboardSelectedBankrollId === "all"
                    ? null
                    : Number(dashboardSelectedBankrollId)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <BankrollChips
                bankrolls={
                  dashboardSelectedBankrollId === "all"
                    ? bankrolls
                    : bankrolls.filter(
                        (b) => String(b.id) === dashboardSelectedBankrollId,
                      )
                }
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default DashboardMainPage;
