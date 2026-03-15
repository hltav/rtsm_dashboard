"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
} from "@mui/material";

import { formatCurrency } from "@/utils/formatCurrency";
import { BankrollDto } from "../schema/bankroll.schema";
import { useBankrolls } from "../hook/useBankrolls";

interface BookmakerDto {
  id: string;
  name: string;
}

const BankrollDetail: React.FC = () => {
  const theme = useTheme();
  const { data: bankrolls = [], isLoading } = useBankrolls();

  const [selectedBookmakerId, setSelectedBookmakerId] = useState<string>("");

  /**
   * Lista única de bookmakers
   */
  const bookmakers: BookmakerDto[] = useMemo(() => {
    const unique = new Map<string, BookmakerDto>();

    bankrolls.forEach((b) => {
      if (!unique.has(b.bookmaker)) {
        unique.set(b.bookmaker, {
          id: b.bookmaker,
          name: b.bookmaker,
        });
      }
    });

    return Array.from(unique.values());
  }, [bankrolls]);

  /**
   * Seleciona automaticamente a primeira banca
   */
  useEffect(() => {
    if (!selectedBookmakerId && bookmakers.length > 0) {
      setSelectedBookmakerId(bookmakers[0].id);
    }
  }, [bookmakers, selectedBookmakerId]);

  /**
   * Banca selecionada
   */
  const selectedBankroll: BankrollDto | null = useMemo(() => {
    if (!selectedBookmakerId) return null;

    return bankrolls.find((b) => b.bookmaker === selectedBookmakerId) ?? null;
  }, [bankrolls, selectedBookmakerId]);

  if (isLoading) {
    return <Typography>Carregando detalhes...</Typography>;
  }

  if (!selectedBankroll) {
    return (
      <Typography color="text.secondary">Nenhuma banca encontrada.</Typography>
    );
  }

  const deposits = selectedBankroll.totalDeposited ?? 0;
  const withdrawals = selectedBankroll.totalWithdrawn ?? 0;
  const totalStaked = selectedBankroll.totalStaked ?? 0;
  const gains = selectedBankroll.totalReturned ?? 0;

  const losses = totalStaked - gains;
  const profitAndLoss = gains - totalStaked;
  const result = selectedBankroll.balance - selectedBankroll.initialBalance;

  const lastHistory = selectedBankroll.lastHistory;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={3} fontWeight="bold">
        Detalhes da Banca
      </Typography>

      {/* SELECT BOOKMAKER */}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Casa de Apostas</InputLabel>

        <Select
          value={selectedBookmakerId}
          label="Casa de Apostas"
          onChange={(e) => setSelectedBookmakerId(e.target.value)}
        >
          {bookmakers.map((bookmaker) => (
            <MenuItem key={bookmaker.id} value={bookmaker.id}>
              {bookmaker.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ mb: 3 }} />

      {/* SALDOS */}

      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Saldos
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <Typography variant="caption">Saldo Atual</Typography>
          <Typography variant="h6" fontWeight="bold">
            {formatCurrency(selectedBankroll.balance)}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption">Saldo Inicial</Typography>
          <Typography fontWeight="medium">
            {formatCurrency(selectedBankroll.initialBalance)}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption">Valor da Unidade</Typography>
          <Typography fontWeight="medium">
            {formatCurrency(selectedBankroll.unidValue)}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* MOVIMENTAÇÕES */}

      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Movimentações
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption">Depósitos</Typography>
          <Typography color="success.main" fontWeight="bold">
            + {formatCurrency(deposits)}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption">Retiradas</Typography>
          <Typography color="error.main" fontWeight="bold">
            - {formatCurrency(withdrawals)}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption">Total Apostado</Typography>
          <Typography color="error.main" fontWeight="bold">
            {formatCurrency(totalStaked)}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption">Retorno Total</Typography>
          <Typography color="success.main" fontWeight="bold">
            + {formatCurrency(gains)}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* RESULTADOS */}

      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Resultados
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption">Perdas</Typography>
          <Typography color="error.main" fontWeight="bold">
            - {formatCurrency(losses)}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption">Lucro / Prejuízo</Typography>
          <Typography
            fontWeight="bold"
            color={profitAndLoss >= 0 ? "success.main" : "error.main"}
          >
            {profitAndLoss >= 0 ? "+" : ""}
            {formatCurrency(profitAndLoss)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption">Resultado Final</Typography>
          <Typography
            fontWeight="bold"
            color={result >= 0 ? "success.main" : "error.main"}
          >
            {result >= 0 ? "+" : ""}
            {formatCurrency(result)}
          </Typography>
        </Grid>
      </Grid>

      {lastHistory && (
        <Box mt={3}>
          <Typography variant="caption" color="text.disabled">
            Última atualização:{" "}
            {new Date(lastHistory.date).toLocaleDateString("pt-BR")}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default BankrollDetail;
