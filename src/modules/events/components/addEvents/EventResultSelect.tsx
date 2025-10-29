/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { EventResultSelectProps } from "../../props/modalAddEvent.props";
import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
import { useAuth } from "@/components/Providers/AuthContext";
import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import { parseCurrency } from "@/utils/parseCurrency";

export const EventResultSelect: React.FC<EventResultSelectProps> = ({
  newEvent,
  onSelectChange,
  onOddChange,
  validationErrors,
}) => {
  const { user } = useAuth();
  const [banks, setBanks] = useState<BankrollDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [rawValue, setRawValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    const fetchBanks = async () => {
      if (!user?.id) {
        console.error("Usuário não encontrado");
        return;
      }
      try {
        setLoading(true);
        const data = await bankrollApi.getAll(user.id);
        setBanks(data);
      } catch (err) {
        console.error("Erro ao carregar bancas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, "");
    setRawValue(cleaned);
    const formatted = parseCurrency(cleaned).toFixed(2);
    setDisplayValue(formatted);
    onOddChange(formatted);
  };

  const handleBankChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;

    const bankId = Number(value);

    onSelectChange({
      target: { name: "bankId", value: bankId },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <FormControl fullWidth margin="normal">
        <TextField
          name="odd"
          label="Valor da Odd"
          type="tel"
          value={displayValue}
          onChange={handleChange}
          error={!!validationErrors.odd}
          helperText={validationErrors.odd}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
            "& .MuiInputBase-input": {
              borderRadius: 1,
            },
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal" error={!!validationErrors.bankId}>
        <InputLabel>Banca</InputLabel>
        <Select
          name="bankId"
          value={newEvent.bankId === 0 ? "" : String(newEvent.bankId)}
          onChange={handleBankChange}
          label="Banca"
          disabled={loading || !user}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
            </MenuItem>
          ) : banks.length > 0 ? (
            banks.map((bank) => (
              <MenuItem key={bank.id} value={String(bank.id)}>
                {bank.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Nenhuma banca encontrada</MenuItem>
          )}
        </Select>
        {validationErrors.bankId && (
          <FormHelperText>{validationErrors.bankId}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};
