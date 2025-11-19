"use client";
import React, { useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
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
  const {
    bankrolls,
    isLoading: bankrollLoading,
    selectedBankrollId,
  } = useBankrollContext();

  const loading = eventsLoading || bankrollLoading;

  const {
    totalProfitLoss,
    totalWagered,
    winRate,
    totalEvents,
    winCount,
    lossCount,
    pendingEvents,
  } = useMemo(() => {
    let profitLoss = 0;
    let wagered = 0;
    let wins = 0;
    let losses = 0;
    let voids = 0;

    const pending: EventItem[] = [];

    events.forEach((event: EventItem) => {
      const amount = Number(event.amount) || 0;
      if (!event.result || event.result === "pending") {
        pending.push(event);
        return;
      }
      wagered += amount;

      if (event.result === "win") {
        const oddValue = parseFloat(event.odd) || 1;
        profitLoss += amount * oddValue - amount;
        wins++;
      } else if (event.result === "lose") {
        profitLoss -= amount;
        losses++;
      } else if (event.result === "void" || event.result === "returned") {
        voids++;
      }
    });

    const total = events.length;
    const decidedEvents = wins + losses;
    const rate = decidedEvents > 0 ? (wins / decidedEvents) * 100 : 0;

    return {
      totalProfitLoss: parseFloat(profitLoss.toFixed(2)),
      totalWagered: parseFloat(wagered.toFixed(2)),
      winRate: rate,
      totalEvents: total,
      winCount: wins,
      lossCount: losses,
      voidCount: voids,
      pendingEvents: pending,
    };
  }, [events]);

  const totalBalance = useMemo(() => {
    return (
      bankrolls?.reduce((sum: number, bank: BankrollDto) => {
        const balanceAsNumber = Number(bank.balance) || 0;
        return sum + balanceAsNumber;
      }, 0) ?? 0
    );
  }, [bankrolls]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 4 }}>
      <Container maxWidth={false}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Dashboard de Performance
        </Typography>

        {loading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", minHeight: 300 }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <MetricCard
                title="Unidades de Lucro"
                value={totalProfitLoss + " unids"}
                color={
                  totalProfitLoss >= 0 ? "#17ad1a" : theme.palette.error.main
                }
                subText={`Total de apostas: ${totalEvents}`}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <MetricCard
                title="Saldo Total"
                value={formatCurrency(totalBalance)}
                color={theme.palette.mode === "dark" ? "#73889d" : "#73889d"}
                valueColor={
                  theme.palette.mode === "dark" ? "#73889d" : undefined
                }
                subText={`Bancas: ${bankrolls.length}`}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <MetricCard
                title="Entradas Pendentes"
                value={pendingEvents.length + " entradas"}
                color={
                  totalProfitLoss >= 0 ? "#E0A800" : theme.palette.error.main
                }
                subText={`Total de apostas: ${totalEvents}`}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <MetricCard
                title="Stake Total Apostada"
                value={totalWagered + " unids"}
                color={theme.palette.info.main}
                subText={
                  totalEvents > 0
                    ? `Média: ${formatCurrency(totalWagered / totalEvents)}`
                    : "Sem apostas"
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <MetricCard
                title="Taxa de vitórias"
                value={winRate}
                color={winRate > 50 ? "#17ad1a" : theme.palette.warning.main}
                isCurrency={false}
                subText={`Ganha/Perdida: ${winCount}/${lossCount}`}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <BankrollBalanceChart bankrollId={selectedBankrollId} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <ModalityBarChart />
            </Grid>

            <Grid item xs={12} lg={6}>
              <ResultPieChart />
            </Grid>
            <Grid item xs={12}>
              <Card elevation={0}>
                <CardContent>
                  <BankrollChips bankrolls={bankrolls} />
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
