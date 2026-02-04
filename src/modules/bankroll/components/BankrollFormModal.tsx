"use client";
import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, useTheme } from "@mui/material";
import { BankrollFormModalProps } from "../interface/bankrollFormModalProps";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { formatCurrency } from "@/utils/formatCurrency";
import { CancelButton } from "@/lib/ui/buttons/CancelButton";
import { SaveButton } from "@/lib/ui/buttons/SaveButton";

export const BankrollFormModal = ({
  open,
  onClose,
  bankroll,
  onSave,
}: BankrollFormModalProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  // Removemos o useAuth() e o userId daqui.

  const [formState, setFormState] = useState({
    name: bankroll?.name || "",
    balance: bankroll?.balance ?? 0,
    unidValue: bankroll?.unidValue ?? 0,
    bookmaker: bankroll?.bookmaker || "",
  });

  useEffect(() => {
    if (open) {
      setFormState({
        name: bankroll?.name || "",
        balance: bankroll?.balance ?? 0,
        unidValue: bankroll?.unidValue ?? 0,
        bookmaker: bankroll?.bookmaker || "",
      });
    }
  }, [open, bankroll]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "balance" || name === "unidValue") {
      const digitsOnly = value.replace(/\D/g, "");

      if (!digitsOnly) {
        setFormState((prev) => ({ ...prev, [name]: 0 }));
        return;
      }

      const numericValue = Number(digitsOnly) / 100;
      setFormState((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatDisplayValue = (value: number): string => {
    return value === 0 ? "" : formatCurrency(value);
  };

  const handleSave = async () => {
    // Validações apenas de interface
    if (!formState.name || formState.name.length < 3) {
      showNotification("Nome deve ter pelo menos 3 caracteres", "warning");
      return;
    }

    if (formState.balance <= 0) {
      showNotification("Saldo deve ser maior que zero", "warning");
      return;
    }

    if (formState.unidValue <= 0) {
      showNotification("Valor por unidade deve ser maior que zero", "warning");
      return;
    }

    // O payload agora é limpo, sem userId.
    // Enviamos balance como initialBalance na criação.
    const payload = {
      ...formState,
      initialBalance: formState.balance,
    };

    try {
      setLoading(true);
      if (onSave) {
        await onSave(payload);
      }
      onClose();
    } catch (error) {
      // O erro de "Não autenticado" agora será tratado pelo interceptor ou pelo catch global
      console.error("Erro ao salvar banca:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: theme.palette.text.primary }}
        >
          Adicionar Nova Banca
        </Typography>

        <TextField
          label="Nome da Banca"
          name="name"
          value={formState.name}
          onChange={onChange}
          fullWidth
          variant="outlined"
          required
          error={formState.name.length > 0 && formState.name.length < 3}
          helperText={
            formState.name.length > 0 && formState.name.length < 3
              ? "Mínimo 3 caracteres"
              : ""
          }
        />

        <TextField
          label="Saldo (R$)"
          name="balance"
          value={formatDisplayValue(formState.balance)}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Valor por Unid"
          name="unidValue"
          value={formatDisplayValue(formState.unidValue)}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Casa de Apostas"
          name="bookmaker"
          value={formState.bookmaker}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <CancelButton onClick={onClose} />

          <SaveButton onClick={handleSave} disabled={loading} />
        </Box>
      </Box>
    </Modal>
  );
};
