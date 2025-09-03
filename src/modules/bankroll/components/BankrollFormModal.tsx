"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { BankrollFormModalProps } from "../interface/bankrollFormModalProps";
import { AlertColor } from "@mui/material/Alert";
import { createBankroll } from "@/lib/api/bankroll/methodsApiBankroll";
import { useAuth } from "@/components/Providers/AuthContext";

export const BankrollFormModal = ({
  open,
  onClose,
  bankroll,
  onChange,
  onSave,
}: BankrollFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { user } = useAuth();

  const userId = user?.id;

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!bankroll.name || bankroll.name.length < 3) {
        setSnackbar({
          open: true,
          message: "Nome deve ter pelo menos 3 caracteres",
          severity: "error",
        });
        return;
      }

      if (!bankroll.balance || parseFloat(bankroll.balance) <= 0) {
        setSnackbar({
          open: true,
          message: "Saldo deve ser maior que zero",
          severity: "error",
        });
        return;
      }

      if (!bankroll.unidValue || parseFloat(bankroll.unidValue) <= 0) {
        setSnackbar({
          open: true,
          message: "Valor por unidade deve ser maior que zero",
          severity: "error",
        });
        return;
      }

      const newBankroll = await createBankroll({
        name: bankroll.name,
        balance: parseFloat(bankroll.balance),
        unidValue: parseFloat(bankroll.unidValue),
        bookmaker: bankroll.bookmaker || "Unknown",
      }, userId!);

      console.log(newBankroll);

      onClose();

      setSnackbar({
        open: true,
        message: "Banca criada com sucesso!",
        severity: "success",
      });

      if (onSave) onSave(newBankroll);
    } catch (error) {
      console.error("Erro ao salvar banca:", error);
      setSnackbar({
        open: true,
        message: "Erro ao criar banca. Tente novamente.",
        severity: "error",
      });
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
            bgcolor: "#1A2B42",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ color: "#FFFFFF" }}>
            Adicionar Nova Banca
          </Typography>

          <TextField
            label="Nome da Banca"
            name="name"
            value={bankroll.name}
            onChange={onChange}
            fullWidth
            variant="outlined"
            required
            error={bankroll.name.length > 0 && bankroll.name.length < 3}
            helperText={
              bankroll.name.length > 0 && bankroll.name.length < 3
                ? "Mínimo 3 caracteres"
                : ""
            }
            InputLabelProps={{
              sx: {
                color: "#FFFFFF",
                "&.Mui-focused": { color: "#FFFFFF" },
              },
            }}
            InputProps={{
              sx: {
                color: "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
              },
            }}
          />
          <TextField
            label="Saldo (R$)"
            name="balance"
            value={bankroll.balance}
            onChange={onChange}
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{ step: "0.01" }}
            InputLabelProps={{
              sx: {
                color: "#FFFFFF",
                "&.Mui-focused": { color: "#FFFFFF" },
              },
            }}
            InputProps={{
              sx: {
                color: "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
              },
            }}
          />
          <TextField
            label="Valor por Unid"
            name="unidValue"
            value={bankroll.unidValue}
            onChange={onChange}
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{ step: "0.01" }}
            InputLabelProps={{
              sx: {
                color: "#FFFFFF",
                "&.Mui-focused": { color: "#FFFFFF" },
              },
            }}
            InputProps={{
              sx: {
                color: "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
              },
            }}
          />
          <TextField
            label="Casa de Apostas"
            name="bookmaker"
            value={bankroll.bookmaker}
            onChange={onChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              sx: {
                color: "#FFFFFF",
                "&.Mui-focused": { color: "#FFFFFF" },
              },
            }}
            InputProps={{
              sx: {
                color: "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF",
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
                color: "#FFFFFF",
                borderColor: "#FFFFFF",
                "&:hover": { borderColor: "#FFFFFF", opacity: 0.8 },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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
