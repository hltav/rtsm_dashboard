// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { BankrollFormModalProps } from "../interface/bankrollFormModalProps";
// import { AlertColor } from "@mui/material/Alert";
// import { useAuth } from "@/components/Providers/AuthContext";
// import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
// import { useNotification } from "@/components/Providers/NotificationSnackbar";
// import axios from "axios";

// export const BankrollFormModal = ({
//   open,
//   onClose,
//   bankroll,
//   onSave,
// }: BankrollFormModalProps) => {
//   const [loading, setLoading] = useState(false);
//   const { showNotification } = useNotification();
//   const { user } = useAuth();
//   const userId = user?.id;
//   const [formState, setFormState] = useState(bankroll);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     if (open) {
//       setFormState(bankroll);
//     }
//   }, [open, bankroll]);

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({
//       ...prev,
//       [name]:
//         name === "balance" || name === "unidValue" ? Number(value) : value,
//     }));
//   };

//   const handleSave = async () => {
//     if (!userId) {
//       showNotification("Usuário não autenticado.", "warning");
//       return;
//     }

//     if (!formState.name || formState.name.length < 3) {
//       showNotification("Nome deve ter pelo menos 3 caracteres", "warning");
//       return;
//     }

//     if (formState.balance === null || formState.balance <= 0) {
//       showNotification("Saldo deve ser maior que zero", "warning");
//       return;
//     }

//     if (formState.unidValue === null || formState.unidValue <= 0) {
//       showNotification("Valor por unidade deve ser maior que zero", "warning");
//       return;
//     }

//     const apiData = {
//       name: formState.name,
//       balance: formState.balance as number,
//       unidValue: formState.unidValue as number,
//       bookmaker: formState.bookmaker,
//     };

//     try {
//       setLoading(true);
//       const saved = await bankrollApi.create(apiData, userId);

//       showNotification("Banca criada com sucesso!", "success");
//       if (onSave) onSave(saved);
//       onClose();
//     } catch (err) {
//       if (axios.isAxiosError(err) && err.response?.status === 409) {
//         showNotification("Já existe uma banca com este nome!", "error");
//       } else {
//         showNotification("Erro ao criar banca. Tente novamente.", "error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <>
//       <Modal open={open} onClose={onClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 400 },
//             bgcolor: "#1A2B42",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <Typography variant="h6" component="h2" sx={{ color: "#FFFFFF" }}>
//             Adicionar Nova Banca
//           </Typography>

//           <TextField
//             label="Nome da Banca"
//             name="name"
//             value={formState.name}
//             onChange={onChange}
//             fullWidth
//             variant="outlined"
//             required
//             error={formState.name.length > 0 && formState.name.length < 3}
//             helperText={
//               formState.name.length > 0 && formState.name.length < 3
//                 ? "Mínimo 3 caracteres"
//                 : ""
//             }
//             InputLabelProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "&.Mui-focused": { color: "#FFFFFF" },
//               },
//             }}
//             InputProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Saldo (R$)"
//             name="balance"
//             value={formState.balance}
//             onChange={onChange}
//             fullWidth
//             variant="outlined"
//             type="number"
//             inputProps={{ step: "0.01" }}
//             InputLabelProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "&.Mui-focused": { color: "#FFFFFF" },
//               },
//             }}
//             InputProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Valor por Unid"
//             name="unidValue"
//             value={formState.unidValue}
//             onChange={onChange}
//             fullWidth
//             variant="outlined"
//             type="number"
//             inputProps={{ step: "0.01" }}
//             InputLabelProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "&.Mui-focused": { color: "#FFFFFF" },
//               },
//             }}
//             InputProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Casa de Apostas"
//             name="bookmaker"
//             value={formState.bookmaker}
//             onChange={onChange}
//             fullWidth
//             variant="outlined"
//             InputLabelProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "&.Mui-focused": { color: "#FFFFFF" },
//               },
//             }}
//             InputProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//               },
//             }}
//           />
//           <Box
//             sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onClose}
//               disabled={loading}
//               sx={{
//                 color: "#FFFFFF",
//                 borderColor: "#FFFFFF",
//                 "&:hover": { borderColor: "#FFFFFF", opacity: 0.8 },
//               }}
//             >
//               Cancelar
//             </Button>
//             <Button
//               type="button"
//               variant="contained"
//               color="primary"
//               onClick={handleSave}
//               disabled={loading}
//             >
//               {loading ? "Salvando..." : "Salvar"}
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity as AlertColor}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

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
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const userId = user?.id;
  const [formState, setFormState] = useState({
    ...bankroll,
    balance: bankroll?.balance?.toString() ?? "",
    unidValue: bankroll?.unidValue?.toString() ?? "",
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
        balance: bankroll?.balance?.toString() ?? "",
        unidValue: bankroll?.unidValue?.toString() ?? "",
      });
    }
  }, [open, bankroll]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formState.balance || Number(formState.balance) <= 0) {
      showNotification("Saldo deve ser maior que zero", "warning");
      return;
    }

    if (!formState.unidValue || Number(formState.unidValue) <= 0) {
      showNotification("Valor por unidade deve ser maior que zero", "warning");
      return;
    }

    const payload = {
      ...formState,
      name: formState.name || "",
      balance: Number(formState.balance),
      unidValue: Number(formState.unidValue),
      bookmaker: formState.bookmaker || "",
    };

    try {
      setLoading(true);
      if (onSave) {
        await onSave(payload);
      }
      onClose();
    } catch {
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
            value={formatCurrency(formState.balance)}
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
            value={formatCurrency(formState.unidValue)}
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
            value={formState.bookmaker}
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
              type="button"
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
