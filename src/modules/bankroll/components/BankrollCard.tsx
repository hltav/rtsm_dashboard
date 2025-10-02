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
import { BankrollCardProps } from "../props/bankrollCard.props";
import { formatCurrency } from "@/utils/formatCurrency";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export const BankrollCard = ({
  bankroll,
  onEdit,
  onViewDetails,
  onDelete,
}: BankrollCardProps) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        minWidth: 220,
        maxWidth: 350,
        width: "100%",
        border:
          theme.palette.mode === "dark"
            ? "1px solid transparent"
            : "1px solid rgba(26, 43, 66, 0.08)",
        bgcolor: "#1A2B42",
        p: 2,
      }}
    >
      <CardContent sx={{ flexGrow: 1, position: "relative", p: 0 }}>
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
            {(bankroll.balance / Number(bankroll.unidValue)).toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
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
        <IconButton
          size="small"
          sx={{ color: theme.palette.error.main }}
          onClick={() => onDelete(bankroll.id)} // ← aqui chamamos a função
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Box>
    </Card>
  );
};
