"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { modalStyle } from "@/modules/events/interfaces/modalStyle";
import { formatCurrency } from "@/utils/formatCurrency";
import { useUpdateBankroll } from "../hook/useBankrolls";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { BankrollDto } from "../schema/bankroll.schema";
import { CancelButton } from "@/lib/ui/buttons/CancelButton";
import { SaveButton } from "@/lib/ui/buttons/SaveButton";

interface BankrollEditModalProps {
  open: boolean;
  onClose: () => void;
  bankroll: BankrollDto;
}

interface EditFormState {
  editBalance: "" | "addedBalance" | "withdrawals";
  addedBalance: number;
  withdrawals: number;
  unidValue: number;
}

const BankrollEditModal: React.FC<BankrollEditModalProps> = ({
  open,
  onClose,
  bankroll,
}) => {
  const theme = useTheme();
  const { showNotification } = useNotification();

  // Limpeza: useUpdateBankroll agora não precisa de userId
  const updateBankroll = useUpdateBankroll();

  const [formState, setFormState] = useState<EditFormState>({
    editBalance: "",
    addedBalance: 0,
    withdrawals: 0,
    unidValue: Number(bankroll.unidValue) || 0,
  });

  useEffect(() => {
    if (open) {
      setFormState({
        editBalance: "",
        addedBalance: 0,
        withdrawals: 0,
        unidValue: Number(bankroll.unidValue) || 0,
      });
    }
  }, [open, bankroll]);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const typedValue = e.target.value as "" | "withdrawals" | "addedBalance";
    setFormState((prev) => ({
      ...prev,
      editBalance: typedValue,
      addedBalance: 0,
      withdrawals: 0,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const digitsOnly = value.replace(/\D/g, "");

    if (!digitsOnly) {
      setFormState((prev) => ({ ...prev, [name]: 0 }));
      return;
    }

    const numericValue = Number(digitsOnly) / 100;
    setFormState((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const currentBalance = Number(bankroll.balance) || 0;

    // Validações de negócio
    if (
      formState.editBalance === "withdrawals" &&
      formState.withdrawals > currentBalance
    ) {
      showNotification("Valor a retirar excede o saldo.", "error", 3000);
      return;
    }

    let newBalance = currentBalance;
    if (formState.editBalance === "addedBalance") {
      newBalance += formState.addedBalance;
    } else if (formState.editBalance === "withdrawals") {
      newBalance -= formState.withdrawals;
    }

    // Payload limpo sem userId
    const updatePayload: Omit<BankrollDto, "id" | "userId"> = {
      name: bankroll.name,
      bookmaker: bankroll.bookmaker,
      balance: newBalance,
      unidValue: formState.unidValue,
      initialBalance: Number(bankroll.initialBalance) || 0,
    };

    try {
      await updateBankroll.mutateAsync({
        id: bankroll.id, // Enviando como number (conforme o hook atualizado)
        data: updatePayload,
      });

      showNotification("Banca atualizada com sucesso!", "success", 2000);
      onClose();
    } catch {
      showNotification("Erro ao atualizar a banca.", "error", 3000);
    }
  };

  const formatDisplayValue = (value: number): string => {
    return value === 0 ? "" : formatCurrency(value);
  };

  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown>
      <Box
        sx={{
          ...modalStyle,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" mb={4}>
          Editar Banca
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Editar fundos</InputLabel>
          <Select
            name="editBalance"
            value={formState.editBalance}
            onChange={handleSelectChange}
            label="Editar Fundos"
          >
            <MenuItem value="">Manter saldo atual</MenuItem>
            <MenuItem value="addedBalance">Adicionar fundos</MenuItem>
            <MenuItem value="withdrawals">Retirar fundos</MenuItem>
          </Select>
        </FormControl>

        {formState.editBalance === "addedBalance" && (
          <TextField
            fullWidth
            label="Valor a adicionar"
            name="addedBalance"
            value={formatDisplayValue(formState.addedBalance)}
            onChange={handleInputChange}
            margin="normal"
            helperText={`Saldo atual: ${formatCurrency(bankroll.balance)}`}
          />
        )}

        {formState.editBalance === "withdrawals" && (
          <TextField
            fullWidth
            label="Valor a retirar"
            name="withdrawals"
            value={formatDisplayValue(formState.withdrawals)}
            onChange={handleInputChange}
            margin="normal"
            helperText={`Saldo disponível: ${formatCurrency(bankroll.balance)}`}
            error={formState.withdrawals > Number(bankroll.balance)}
          />
        )}

        <TextField
          fullWidth
          label="Valor da Unidade"
          name="unidValue"
          value={formatDisplayValue(formState.unidValue)}
          onChange={handleInputChange}
          margin="normal"
          helperText={`Valor atual: ${formatCurrency(bankroll.unidValue)}`}
        />

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          <CancelButton onClick={onClose} disabled={updateBankroll.isPending} />

          <SaveButton
            isLoading={updateBankroll.isPending}
            onClick={handleSubmit} // Se não for um formulário nativo
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default BankrollEditModal;
