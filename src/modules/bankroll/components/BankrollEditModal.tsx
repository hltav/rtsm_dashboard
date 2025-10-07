import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
  SelectChangeEvent,
} from "@mui/material";
import { modalStyle } from "@/modules/events/interfaces/modalStyle";
import { formatCurrency } from "@/utils/formatCurrency";
import { useUpdateBankroll } from "../hook/useBankrolls";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { useAuth } from "@/components/Providers/AuthContext";
import { BankrollDto } from "../schema/bankroll.schema";
import { whiteSelectField, whiteTextField } from "@/utils/whiteStyles";

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
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const updateBankroll = useUpdateBankroll(user?.id ?? 0);

  const [formState, setFormState] = useState<EditFormState>({
    editBalance: "",
    addedBalance: 0,
    withdrawals: 0,
    unidValue: bankroll.unidValue,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

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
  };

  const parseCurrencyToNumber = (currencyString: string | number): number => {
    if (typeof currencyString === "number") return currencyString;

    const cleanString = currencyString.replace(/[^\d,]/g, "").replace(",", ".");

    return parseFloat(cleanString) || 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const currentBalance = parseCurrencyToNumber(bankroll.balance);
    const addedBalanceValue = formState.addedBalance;
    const withdrawalsValue = formState.withdrawals;

    if (
      formState.editBalance === "withdrawals" &&
      withdrawalsValue > currentBalance
    ) {
      showNotification("Valor a retirar excede o saldo.", "error", 3000);
      return;
    }

    if (
      formState.editBalance &&
      ((formState.editBalance === "addedBalance" && addedBalanceValue <= 0) ||
        (formState.editBalance === "withdrawals" && withdrawalsValue <= 0))
    ) {
      showNotification(
        "Informe um valor válido para a operação.",
        "warning",
        3000
      );
      return;
    }

    let newBalance = currentBalance;

    if (formState.editBalance === "addedBalance" && addedBalanceValue > 0) {
      newBalance += addedBalanceValue;
    } else if (
      formState.editBalance === "withdrawals" &&
      withdrawalsValue > 0
    ) {
      newBalance -= withdrawalsValue;
    }

    const updatePayload: Omit<BankrollDto, "id" | "userId"> = {
      name: bankroll.name,
      bookmaker: bankroll.bookmaker,
      balance: newBalance,
      unidValue: formState.unidValue,
    };

    try {
      console.log("📤 Atualizando banca:", {
        id: bankroll.id,
        balanceAnterior: currentBalance,
        addedBalance: addedBalanceValue,
        withdrawals: withdrawalsValue,
        novoBalance: newBalance,
        unidValue: formState.unidValue,
      });

      await updateBankroll.mutateAsync({
        id: bankroll.id.toString(),
        data: updatePayload,
      });

      showNotification("Banca atualizada com sucesso!", "success", 2000);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar banca:", error);
      showNotification(
        "Erro ao atualizar a banca. Tente novamente.",
        "error",
        3000
      );
    }
  };

  const formatDisplayValue = (value: number): string => {
    return value === 0 ? "" : formatCurrency(value);
  };

  return (
    <Modal open={open} onClose={() => {}} disableEscapeKeyDown>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h2" mb={4}>
          Editar Banca
        </Typography>

        <FormControl fullWidth margin="normal" sx={whiteSelectField}>
          <InputLabel>Editar fundos</InputLabel>
          <Select
            name="editBalance"
            value={formState.editBalance}
            onChange={handleSelectChange}
            label="Editar Fundos"
          >
            <MenuItem value="">O que deseja?</MenuItem>
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
            helperText={`Saldo atual: ${formatCurrency(
              parseCurrencyToNumber(bankroll.balance)
            )}`}
            sx={whiteTextField}
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
            helperText={`Saldo disponível: ${formatCurrency(
              parseCurrencyToNumber(bankroll.balance)
            )}`}
            error={
              formState.withdrawals > parseCurrencyToNumber(bankroll.balance)
            }
            sx={whiteTextField}
          />
        )}

        <TextField
          fullWidth
          label="Valor da Unidade"
          name="unidValue"
          value={formatDisplayValue(formState.unidValue)}
          onChange={handleInputChange}
          margin="normal"
          helperText={`Valor Atual da Unidade: ${formatCurrency(
            parseCurrencyToNumber(bankroll.unidValue)
          )}`}
          error={
            formState.withdrawals > parseCurrencyToNumber(bankroll.unidValue)
          }
          sx={whiteTextField}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              mr: 2,
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
              "&.Mui-focusVisible": {
                borderColor: "white",
              },
            }}
            disabled={updateBankroll.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "white", color: "#1A2B42" }}
            disabled={updateBankroll.isPending}
          >
            {updateBankroll.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BankrollEditModal;
