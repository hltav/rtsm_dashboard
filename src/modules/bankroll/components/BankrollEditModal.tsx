// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Modal,
//   SelectChangeEvent,
// } from "@mui/material";
// import { modalStyle } from "@/modules/events/interfaces/modalStyle";
// import { formatCurrency } from "@/utils/formatCurrency";
// import { useUpdateBankroll } from "../hook/useBankrolls";
// import { useNotification } from "@/components/Providers/NotificationSnackbar";
// import { useAuth } from "@/components/Providers/AuthContext";
// import { BankrollDto } from "../schema/bankroll.schema";
// import { whiteSelectField, whiteTextField } from "@/utils/whiteStyles";

// interface BankrollEditModalProps {
//   open: boolean;
//   onClose: () => void;
//   bankroll: BankrollDto;
// }

// interface EditFormState {
//   editBalance: "" | "addedBalance" | "withdrawals";
//   addedBalance: number;
//   withdrawals: number;
//   unidValue: number;
// }

// const BankrollEditModal: React.FC<BankrollEditModalProps> = ({
//   open,
//   onClose,
//   bankroll,
// }) => {
//   const { user } = useAuth();
//   const { showNotification } = useNotification();
//   const updateBankroll = useUpdateBankroll(user?.id ?? 0);

//   const [formState, setFormState] = useState<EditFormState>({
//     editBalance: "",
//     addedBalance: 0,
//     withdrawals: 0,
//     unidValue: parseFloat(bankroll.unidValue.toString()) || 0,
//   });

//   useEffect(() => {
//     if (open) {
//       setFormState({
//         editBalance: "",
//         addedBalance: 0,
//         withdrawals: 0,
//         unidValue: parseFloat(bankroll.unidValue.toString()) || 0,
//       });
//     }
//   }, [open, bankroll]);

//   const handleSelectChange = (e: SelectChangeEvent<string>) => {
//     const typedValue = e.target.value as "" | "withdrawals" | "addedBalance";
//     setFormState((prev) => ({
//       ...prev,
//       editBalance: typedValue,
//       addedBalance: 0,
//       withdrawals: 0,
//     }));
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     const digitsOnly = value.replace(/\D/g, "");

//     if (!digitsOnly) {
//       setFormState((prev) => ({
//         ...prev,
//         [name]: 0,
//       }));
//       return;
//     }

//     const numericValue = Number(digitsOnly) / 100;

//     setFormState((prev) => ({
//       ...prev,
//       [name]: numericValue,
//     }));
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     // Converte diretamente as strings do backend para números
//     const currentBalance = parseFloat(bankroll.balance.toString()) || 0;
//     const addedBalanceValue = formState.addedBalance;
//     const withdrawalsValue = formState.withdrawals;

//     if (
//       formState.editBalance === "withdrawals" &&
//       withdrawalsValue > currentBalance
//     ) {
//       showNotification("Valor a retirar excede o saldo.", "error", 3000);
//       return;
//     }

//     if (
//       formState.editBalance &&
//       ((formState.editBalance === "addedBalance" && addedBalanceValue <= 0) ||
//         (formState.editBalance === "withdrawals" && withdrawalsValue <= 0))
//     ) {
//       showNotification(
//         "Informe um valor válido para a operação.",
//         "warning",
//         3000
//       );
//       return;
//     }

//     let newBalance = currentBalance;

//     if (formState.editBalance === "addedBalance" && addedBalanceValue > 0) {
//       newBalance += addedBalanceValue;
//     } else if (
//       formState.editBalance === "withdrawals" &&
//       withdrawalsValue > 0
//     ) {
//       newBalance -= withdrawalsValue;
//     }

//     const updatePayload: Omit<BankrollDto, "id" | "userId"> = {
//       name: bankroll.name,
//       bookmaker: bankroll.bookmaker,
//       balance: newBalance,
//       unidValue: formState.unidValue,
//       initialBalance: parseFloat(bankroll.initialBalance.toString()) || 0,
//     };

//     try {
//       await updateBankroll.mutateAsync({
//         id: bankroll.id.toString(),
//         data: updatePayload,
//       });

//       showNotification("Banca atualizada com sucesso!", "success", 2000);
//       onClose();
//     } catch (error) {
//       console.error("Erro ao atualizar banca:", error);
//       showNotification(
//         "Erro ao atualizar a banca. Tente novamente.",
//         "error",
//         3000
//       );
//     }
//   };

//   const formatDisplayValue = (value: number): string => {
//     return value === 0 ? "" : formatCurrency(value);
//   };

//   return (
//     <Modal open={open} onClose={() => {}} disableEscapeKeyDown>
//       <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
//         <Typography variant="h5" component="h2" mb={4}>
//           Editar Banca
//         </Typography>

//         <FormControl fullWidth margin="normal" sx={whiteSelectField}>
//           <InputLabel>Editar fundos</InputLabel>
//           <Select
//             name="editBalance"
//             value={formState.editBalance}
//             onChange={handleSelectChange}
//             label="Editar Fundos"
//           >
//             <MenuItem value="">O que deseja?</MenuItem>
//             <MenuItem value="addedBalance">Adicionar fundos</MenuItem>
//             <MenuItem value="withdrawals">Retirar fundos</MenuItem>
//           </Select>
//         </FormControl>

//         {formState.editBalance === "addedBalance" && (
//           <TextField
//             fullWidth
//             label="Valor a adicionar"
//             name="addedBalance"
//             value={formatDisplayValue(formState.addedBalance)}
//             onChange={handleInputChange}
//             margin="normal"
//             helperText={`Saldo atual: ${formatCurrency(bankroll.balance)}`}
//             sx={whiteTextField}
//           />
//         )}

//         {formState.editBalance === "withdrawals" && (
//           <TextField
//             fullWidth
//             label="Valor a retirar"
//             name="withdrawals"
//             value={formatDisplayValue(formState.withdrawals)}
//             onChange={handleInputChange}
//             margin="normal"
//             helperText={`Saldo disponível: ${formatCurrency(
//               parseFloat(bankroll.balance.toString())
//             )}`}
//             error={
//               formState.withdrawals > parseFloat(bankroll.balance.toString())
//             }
//             sx={whiteTextField}
//           />
//         )}

//         <TextField
//           fullWidth
//           label="Valor da Unidade"
//           name="unidValue"
//           value={formatDisplayValue(formState.unidValue)}
//           onChange={handleInputChange}
//           margin="normal"
//           helperText={`Valor Atual da Unidade: ${formatCurrency(
//             parseFloat(bankroll.unidValue.toString())
//           )}`}
//           error={
//             formState.withdrawals > parseFloat(bankroll.unidValue.toString())
//           }
//           sx={whiteTextField}
//         />

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
//           <Button
//             onClick={onClose}
//             variant="outlined"
//             sx={{
//               mr: 2,
//               color: "white",
//               borderColor: "white",
//               "&:hover": {
//                 borderColor: "white",
//                 backgroundColor: "rgba(255, 255, 255, 0.08)",
//               },
//               "&.Mui-focusVisible": {
//                 borderColor: "white",
//               },
//             }}
//             disabled={updateBankroll.isPending}
//           >
//             Cancelar
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ bgcolor: "white", color: "#1A2B42" }}
//             disabled={updateBankroll.isPending}
//           >
//             {updateBankroll.isPending ? "Salvando..." : "Salvar"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default BankrollEditModal;

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
  Button,
  Modal,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { modalStyle } from "@/modules/events/interfaces/modalStyle";
import { formatCurrency } from "@/utils/formatCurrency";
import { useUpdateBankroll } from "../hook/useBankrolls";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { useAuth } from "@/components/Providers/AuthContext";
import { BankrollDto } from "../schema/bankroll.schema";

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
  const theme = useTheme(); // <--- aqui
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const updateBankroll = useUpdateBankroll(user?.id ?? 0);

  const [formState, setFormState] = useState<EditFormState>({
    editBalance: "",
    addedBalance: 0,
    withdrawals: 0,
    unidValue: parseFloat(bankroll.unidValue.toString()) || 0,
  });

  useEffect(() => {
    if (open) {
      setFormState({
        editBalance: "",
        addedBalance: 0,
        withdrawals: 0,
        unidValue: parseFloat(bankroll.unidValue.toString()) || 0,
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const currentBalance = parseFloat(bankroll.balance.toString()) || 0;

    if (
      formState.editBalance === "withdrawals" &&
      formState.withdrawals > currentBalance
    ) {
      showNotification("Valor a retirar excede o saldo.", "error", 3000);
      return;
    }

    if (
      formState.editBalance &&
      ((formState.editBalance === "addedBalance" &&
        formState.addedBalance <= 0) ||
        (formState.editBalance === "withdrawals" && formState.withdrawals <= 0))
    ) {
      showNotification(
        "Informe um valor válido para a operação.",
        "warning",
        3000
      );
      return;
    }

    let newBalance = currentBalance;

    if (formState.editBalance === "addedBalance") {
      newBalance += formState.addedBalance;
    } else if (formState.editBalance === "withdrawals") {
      newBalance -= formState.withdrawals;
    }

    const updatePayload: Omit<BankrollDto, "id" | "userId"> = {
      name: bankroll.name,
      bookmaker: bankroll.bookmaker,
      balance: newBalance,
      unidValue: formState.unidValue,
      initialBalance: parseFloat(bankroll.initialBalance.toString()) || 0,
    };

    try {
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
      <Box
        sx={{
          ...modalStyle,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          // opcional: borda sutil em light mode
          border:
            theme.palette.mode === "light"
              ? `1px solid ${theme.palette.divider}`
              : "none",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h5"
          component="h2"
          mb={4}
          sx={{ color: theme.palette.text.primary }}
        >
          Editar Banca
        </Typography>

        <FormControl
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            "& .MuiSelect-select": { color: theme.palette.text.primary },
          }}
        >
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
            helperText={`Saldo atual: ${formatCurrency(bankroll.balance)}`}
            sx={{
              "& .MuiInputBase-input": { color: theme.palette.text.primary },
              "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
              "& .MuiFormHelperText-root": {
                color: theme.palette.text.secondary,
              },
            }}
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
              parseFloat(bankroll.balance.toString())
            )}`}
            error={
              formState.withdrawals > parseFloat(bankroll.balance.toString())
            }
            sx={{
              "& .MuiInputBase-input": { color: theme.palette.text.primary },
              "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
              "& .MuiFormHelperText-root": {
                color: theme.palette.text.secondary,
              },
            }}
          />
        )}

        <TextField
          fullWidth
          label="Valor da Unidade"
          name="unidValue"
          value={formatDisplayValue(formState.unidValue)}
          onChange={handleInputChange}
          margin="normal"
          helperText={`Valor atual da unidade: ${formatCurrency(
            parseFloat(bankroll.unidValue.toString())
          )}`}
          error={
            formState.withdrawals > parseFloat(bankroll.unidValue.toString())
          }
          sx={{
            "& .MuiInputBase-input": { color: theme.palette.text.primary },
            "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            "& .MuiFormHelperText-root": {
              color: theme.palette.text.secondary,
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            disabled={updateBankroll.isPending}
            sx={{
              mr: 2,
              color: theme.palette.text.primary,
              borderColor: theme.palette.text.primary,
              "&:hover": {
                borderColor: theme.palette.text.primary,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              ml: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
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
