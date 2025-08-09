"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  useTheme,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

interface Bankroll {
  id: string;
  name: string;
  balance: number;
  unidValue: number;
  bookmaker: string;
}

interface BankrollCardProps {
  bankroll: Bankroll;
  onEdit: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const BankrollCard = ({
  bankroll,
  onEdit,
  onViewDetails,
}: BankrollCardProps) => {
  const theme = useTheme();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border:
          theme.palette.mode === "dark"
            ? "1px solid transparent"
            : "1px solid rgba(26, 43, 66, 0.08)",
        bgcolor: "#1A2B42",
      }}
    >
      <CardContent sx={{ flexGrow: 1, position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              fontWeight: 600,
              color: "#FFFFFF",
              whiteSpace: "nowrap", 
              overflow: "hidden", 
              textOverflow: "ellipsis", 
              maxWidth: "70%", 
            }}
          >
            {bankroll.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 0.5, // espaçamento entre ícones
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                color: theme.palette.success.main,
                fontSize: "10px",
              }}
              onClick={() => onViewDetails(bankroll.id)}
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: theme.palette.warning.main }}
              onClick={() => onEdit(bankroll.id)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        <Stack spacing={0.5}>
          <Typography variant="caption" sx={{ color: "#D0D0D0" }}>
            <strong>Casa de Apostas:</strong> {bankroll.bookmaker}
          </Typography>
          <Typography variant="caption" sx={{ color: "#D0D0D0" }}>
            <strong>Saldo:</strong> {formatCurrency(bankroll.balance)}
          </Typography>
          <Typography variant="caption" sx={{ color: "#D0D0D0" }}>
            <strong>Valor por Unid:</strong>{" "}
            {formatCurrency(bankroll.unidValue)}
          </Typography>
          <Typography variant="caption" sx={{ color: "#D0D0D0" }}>
            <strong>Número de Unids:</strong>{" "}
            {(bankroll.balance / bankroll.unidValue).toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
