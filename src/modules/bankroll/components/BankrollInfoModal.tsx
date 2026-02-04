// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Modal,
//   Divider,
//   useTheme,
// } from "@mui/material";
// import { modalStyle } from "@/modules/events/interfaces/modalStyle";
// import { formatCurrency } from "@/utils/formatCurrency";
// import { BankrollDto } from "../schema/bankroll.schema";

// interface BankrollInfoModalProps {
//   open: boolean;
//   onClose: () => void;
//   bankrollModal: BankrollDto;
// }

// const BankrollInfoModal: React.FC<BankrollInfoModalProps> = ({
//   open,
//   onClose,
//   bankrollModal,
// }) => {
//   const theme = useTheme();

//   if (!bankrollModal) return null;

//   const history = bankrollModal.histories ?? [];

//   const deposits = history
//     .filter((h) => h.type === "DEPOSIT" && h.amount)
//     .reduce((acc, h) => acc + (h.amount ?? 0), 0);

//   // const addedBalance = history
//   //   .filter((h) => h.type === "BALANCE_ADJUSTMENT" && (h.amount ?? 0) > 0)
//   //   .reduce((acc, h) => acc + (h.amount ?? 0), 0);

//   const withdrawals = history
//     .filter((h) => h.type === "WITHDRAWAL" && h.amount)
//     .reduce((acc, h) => acc + (h.amount ?? 0), 0);

//   const gains = history
//     .filter((h) => h.type === "BET_WON" && h.totalReturn != null)
//     .reduce((acc, h) => acc + Number(h.totalReturn), 0);

//   const losses = history
//     .filter((h) => h.type === "BET_LOST")
//     .reduce((acc, h) => {
//       const amount = Math.abs(h.amount ?? 0);
//       const unid = h.unidValue ?? bankrollModal.unidValue ?? 1;
//       return acc + amount * unid;
//     }, 0);

//   const profitAndLoss = gains - losses;

//   const result = bankrollModal.balance - bankrollModal.initialBalance;

//   const lastHistory = history[history.length - 1];

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{ ...modalStyle, bgcolor: theme.palette.background.paper }}>
//         <Typography
//           variant="h5"
//           component="h2"
//           mb={3}
//           sx={{ color: theme.palette.text.primary }}
//         >
//           Detalhes da Banca
//         </Typography>

//         {/* Nome da banca */}
//         <Box sx={{ mb: 2 }}>
//           <Typography
//             variant="subtitle2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Nome
//           </Typography>
//           <Typography
//             variant="body1"
//             fontWeight="medium"
//             sx={{ color: theme.palette.text.primary }}
//           >
//             {bankrollModal.name}
//           </Typography>
//         </Box>

//         {/* Bookmaker */}
//         <Box sx={{ mb: 2 }}>
//           <Typography
//             variant="subtitle2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Casa de Apostas
//           </Typography>
//           <Typography
//             variant="body1"
//             fontWeight="medium"
//             sx={{ color: theme.palette.text.primary }}
//           >
//             {bankrollModal.bookmaker}
//           </Typography>
//         </Box>

//         <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

//         {/* Saldos */}
//         <Box sx={{ mb: 2 }}>
//           <Typography
//             variant="subtitle2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Saldo Atual
//           </Typography>
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             sx={{ color: theme.palette.text.primary }}
//           >
//             {formatCurrency(bankrollModal.balance)}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 2 }}>
//           <Typography
//             variant="subtitle2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Saldo Inicial
//           </Typography>
//           <Typography
//             variant="body1"
//             fontWeight="medium"
//             sx={{ color: theme.palette.text.primary }}
//           >
//             {formatCurrency(bankrollModal.initialBalance)}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 2 }}>
//           <Typography
//             variant="subtitle2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Valor da Unidade
//           </Typography>
//           <Typography
//             variant="body1"
//             fontWeight="medium"
//             sx={{ color: theme.palette.text.primary }}
//           >
//             {formatCurrency(bankrollModal.unidValue)}
//           </Typography>
//         </Box>

//         <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

//         {/* Movimentações */}
//         <Typography
//           variant="subtitle1"
//           fontWeight="bold"
//           mb={2}
//           sx={{ color: theme.palette.text.primary }}
//         >
//           Movimentações
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//           <Typography
//             variant="body2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Depósitos:
//           </Typography>
//           <Typography variant="body2" color="success.main" fontWeight="bold">
//             + {formatCurrency(deposits)}
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//           <Typography
//             variant="body2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Retiradas:
//           </Typography>
//           <Typography variant="body2" color="error.main" fontWeight="bold">
//             - {formatCurrency(withdrawals)}
//           </Typography>
//         </Box>

//         {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//           <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
//             Saldo Adicionado:
//           </Typography>
//           <Typography variant="body2" color="success.main" fontWeight="bold">
//             + {formatCurrency(addedBalance)}
//           </Typography>
//         </Box> */}

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//           <Typography
//             variant="body2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Apostas
//           </Typography>
//           <Typography variant="body2" color="error.main" fontWeight="bold">
//             {formatCurrency(bankrollModal.totalStaked ?? 0)}
//           </Typography>
//         </Box>

//         <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

//         {/* Resultados */}
//         <Typography
//           variant="subtitle1"
//           fontWeight="bold"
//           mb={2}
//           sx={{ color: theme.palette.text.primary }}
//         >
//           Resultados
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//           <Typography
//             variant="body2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Ganhos:
//           </Typography>
//           <Typography variant="body2" color="success.main" fontWeight="bold">
//             + {formatCurrency(gains)}
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//           <Typography
//             variant="body2"
//             sx={{ color: theme.palette.text.secondary }}
//           >
//             Perdas:
//           </Typography>
//           <Typography variant="body2" color="error.main" fontWeight="bold">
//             - {formatCurrency(losses)}
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography
//             variant="body2"
//             fontWeight="bold"
//             sx={{ color: theme.palette.text.primary }}
//           >
//             Lucro/Prejuízo:
//           </Typography>
//           <Typography
//             variant="body2"
//             fontWeight="bold"
//             color={profitAndLoss >= 0 ? "success.main" : "error.main"}
//           >
//             {profitAndLoss >= 0 ? "+" : ""}
//             {formatCurrency(profitAndLoss)}
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography
//             variant="body2"
//             fontWeight="bold"
//             sx={{ color: theme.palette.text.primary }}
//           >
//             Resultado Final:
//           </Typography>
//           <Typography
//             variant="body2"
//             fontWeight="bold"
//             color={result >= 0 ? "success.main" : "error.main"}
//           >
//             {result >= 0 ? "+" : ""}
//             {formatCurrency(result)}
//           </Typography>
//         </Box>

//         {lastHistory && (
//           <Box sx={{ mb: 2 }}>
//             <Typography
//               variant="caption"
//               sx={{ color: theme.palette.text.disabled }}
//             >
//               Última atualização:{" "}
//               {new Date(lastHistory.date).toLocaleDateString("pt-BR")}
//             </Typography>
//           </Box>
//         )}

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
//           <Button
//             onClick={onClose}
//             variant="contained"
//             sx={{
//               bgcolor: theme.palette.primary.main,
//               color: theme.palette.primary.contrastText,
//               "&:hover": {
//                 bgcolor: theme.palette.primary.dark,
//               },
//             }}
//           >
//             Fechar
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default BankrollInfoModal;
import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Divider,
  useTheme,
} from "@mui/material";
import { modalStyle } from "@/modules/events/interfaces/modalStyle";
import { formatCurrency } from "@/utils/formatCurrency";
import { BankrollDto } from "../schema/bankroll.schema";

interface BankrollInfoModalProps {
  open: boolean;
  onClose: () => void;
  bankrollModal: BankrollDto;
}

const BankrollInfoModal: React.FC<BankrollInfoModalProps> = ({
  open,
  onClose,
  bankrollModal,
}) => {
  const theme = useTheme();

  if (!bankrollModal) return null;

  // Usar campos pré-calculados do DTO
  const deposits = bankrollModal.totalDeposited ?? 0;
  const withdrawals = bankrollModal.totalWithdrawn ?? 0;
  const totalStaked = bankrollModal.totalStaked ?? 0;
  const gains = bankrollModal.totalReturned ?? 0;

  // Perdas = total apostado - total retornado
  const losses = totalStaked - gains;

  // Lucro/Prejuízo = ganhos - perdas (ou simplesmente totalReturned - totalStaked)
  const profitAndLoss = gains - totalStaked;

  // Resultado final = saldo atual - saldo inicial
  const result = bankrollModal.balance - bankrollModal.initialBalance;

  const lastHistory = bankrollModal.lastHistory;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, bgcolor: theme.palette.background.paper }}>
        <Typography
          variant="h5"
          component="h2"
          mb={3}
          sx={{ color: theme.palette.text.primary }}
        >
          Detalhes da Banca
        </Typography>

        {/* Nome da banca */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Nome
          </Typography>
          <Typography
            variant="body1"
            fontWeight="medium"
            sx={{ color: theme.palette.text.primary }}
          >
            {bankrollModal.name}
          </Typography>
        </Box>

        {/* Bookmaker */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Casa de Apostas
          </Typography>
          <Typography
            variant="body1"
            fontWeight="medium"
            sx={{ color: theme.palette.text.primary }}
          >
            {bankrollModal.bookmaker}
          </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

        {/* Saldos */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Saldo Atual
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: theme.palette.text.primary }}
          >
            {formatCurrency(bankrollModal.balance)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Saldo Inicial
          </Typography>
          <Typography
            variant="body1"
            fontWeight="medium"
            sx={{ color: theme.palette.text.primary }}
          >
            {formatCurrency(bankrollModal.initialBalance)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Valor da Unidade
          </Typography>
          <Typography
            variant="body1"
            fontWeight="medium"
            sx={{ color: theme.palette.text.primary }}
          >
            {formatCurrency(bankrollModal.unidValue)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

        {/* Movimentações */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          sx={{ color: theme.palette.text.primary }}
        >
          Movimentações
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Depósitos:
          </Typography>
          <Typography variant="body2" color="success.main" fontWeight="bold">
            + {formatCurrency(deposits)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Retiradas:
          </Typography>
          <Typography variant="body2" color="error.main" fontWeight="bold">
            - {formatCurrency(withdrawals)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Total Apostado:
          </Typography>
          <Typography variant="body2" color="error.main" fontWeight="bold">
            {formatCurrency(totalStaked)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

        {/* Resultados */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          sx={{ color: theme.palette.text.primary }}
        >
          Resultados
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Retorno Total:
          </Typography>
          <Typography variant="body2" color="success.main" fontWeight="bold">
            + {formatCurrency(gains)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Perdas:
          </Typography>
          <Typography variant="body2" color="error.main" fontWeight="bold">
            - {formatCurrency(losses)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ color: theme.palette.text.primary }}
          >
            Lucro/Prejuízo:
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            color={profitAndLoss >= 0 ? "success.main" : "error.main"}
          >
            {profitAndLoss >= 0 ? "+" : ""}
            {formatCurrency(profitAndLoss)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ color: theme.palette.text.primary }}
          >
            Resultado Final:
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            color={result >= 0 ? "success.main" : "error.main"}
          >
            {result >= 0 ? "+" : ""}
            {formatCurrency(result)}
          </Typography>
        </Box>

        {lastHistory && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.disabled }}
            >
              Última atualização:{" "}
              {new Date(lastHistory.date).toLocaleDateString("pt-BR")}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BankrollInfoModal;
