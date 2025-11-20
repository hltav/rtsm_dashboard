"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { BankrollFormModalProps } from "../interface/bankrollFormModalProps";
import { AlertColor } from "@mui/material/Alert";
import { useAuth } from "@/components/Providers/AuthContext";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { formatCurrency } from "@/utils/formatCurrency";

export const BankrollFormModal = ({
  open,
  onClose,
  bankroll,
  onSave,
}: BankrollFormModalProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const userId = user?.id;
  const [formState, setFormState] = useState({
    ...bankroll,
    balance: bankroll?.balance ?? 0,
    unidValue: bankroll?.unidValue ?? 0,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (open) {
      setFormState({
        ...bankroll,
        balance: bankroll?.balance ?? 0,
        unidValue: bankroll?.unidValue ?? 0,
      });
    }
  }, [open, bankroll]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "balance" || name === "unidValue") {
      const digitsOnly = value.replace(/\D/g, "");

      if (!digitsOnly) {
        setFormState((prev) => ({
          ...prev,
          [name]: 0,
        }));
        return;
      }

      const numericValue = Number(digitsOnly) / 100;
      setFormState((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const formatDisplayValue = (value: number): string => {
    return value === 0 ? "" : formatCurrency(value);
  };

  const handleSave = async () => {
    if (!userId) {
      showNotification("Usuário não autenticado.", "warning");
      return;
    }

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

    const payload = {
      ...formState,
      balance: formState.balance,
      unidValue: formState.unidValue,
      name: formState.name || "",
      bookmaker: formState.bookmaker || "",
      initialBalance: formState.balance,
    };

    try {
      setLoading(true);
      if (onSave) {
        await onSave(payload);
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
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
            InputLabelProps={{
              sx: {
                color: theme.palette.text.primary,
                "&.Mui-focused": { color: theme.palette.text.primary },
              },
            }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <TextField
            label="Saldo (R$)"
            name="balance"
            value={formatDisplayValue(formState.balance)}
            onChange={onChange}
            fullWidth
            variant="outlined"
            inputProps={{ step: "0.01" }}
            InputLabelProps={{
              sx: {
                color: theme.palette.text.primary,
                "&.Mui-focused": { color: theme.palette.text.primary },
              },
            }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <TextField
            label="Valor por Unid"
            name="unidValue"
            value={formatDisplayValue(formState.unidValue)}
            onChange={onChange}
            fullWidth
            variant="outlined"
            inputProps={{ step: "0.01" }}
            InputLabelProps={{
              sx: {
                color: theme.palette.text.primary,
                "&.Mui-focused": { color: theme.palette.text.primary },
              },
            }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <TextField
            label="Casa de Apostas"
            name="bookmaker"
            value={formState.bookmaker}
            onChange={onChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              sx: {
                color: theme.palette.text.primary,
                "&.Mui-focused": { color: theme.palette.text.primary },
              },
            }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={loading}
              sx={{
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
                "&:hover": {
                  borderColor: theme.palette.text.primary,
                  opacity: 0.8,
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={loading}
              sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  opacity: 0.8,
                },
              }}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
