import React from "react";
import { Box, Typography, Button, Modal, Divider } from "@mui/material";
import { modalStyle } from "@/modules/events/interfaces/modalStyle";
import { formatCurrency } from "@/utils/formatCurrency";
import { useBankrollContext } from "@/components/Providers/BankrollContext";

interface BankrollInfoModalProps {
  open: boolean;
  onClose: () => void;
}

const BankrollInfoModal: React.FC<BankrollInfoModalProps> = ({
  open,
  onClose,
}) => {
  const { selectedBankroll } = useBankrollContext();

  if (!selectedBankroll) return null;

  const history = selectedBankroll.histories ?? [];

  const deposits = history
    .filter((h) => h.type === "DEPOSIT" && h.amount)
    .reduce((acc, h) => acc + (h.amount ?? 0), 0);

  // const addedBalance = history
  //   .filter((h) => h.type === "BALANCE_ADJUSTMENT" && (h.amount ?? 0) > 0)
  //   .reduce((acc, h) => acc + (h.amount ?? 0), 0);

  const withdrawals = history
    .filter((h) => h.type === "WITHDRAWAL" && h.amount)
    .reduce((acc, h) => acc + (h.amount ?? 0), 0);

  const gains = history
    .filter((h) => h.type === "BET_WON" && h.actualReturn != null)
    .reduce((acc, h) => acc + Number(h.actualReturn), 0);

  const losses = history
    .filter((h) => h.type === "BET_LOST")
    .reduce((acc, h) => {
      const amount = Math.abs(h.amount ?? 0);
      const unid = h.unidValue ?? selectedBankroll.unidValue ?? 1;
      return acc + amount * unid;
    }, 0);

  const profitAndLoss = gains - losses;

  const result = selectedBankroll.balance - selectedBankroll.initialBalance;

  const lastHistory = history[history.length - 1];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" mb={3}>
          Detalhes da Banca
        </Typography>

        {/* Nome da banca */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Nome
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {selectedBankroll.name}
          </Typography>
        </Box>

        {/* Bookmaker */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Casa de Apostas
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {selectedBankroll.bookmaker}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Saldos */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Saldo Atual
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="white">
            {formatCurrency(selectedBankroll.balance)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Saldo Inicial
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {formatCurrency(selectedBankroll.initialBalance)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Valor da Unidade
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {formatCurrency(selectedBankroll.unidValue)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Movimentações */}
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Movimentações
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="white">
            Depósitos:
          </Typography>
          <Typography variant="body2" color="success.main" fontWeight="bold">
            + {formatCurrency(deposits)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="white">
            Retiradas:
          </Typography>
          <Typography variant="body2" color="error.main" fontWeight="bold">
            - {formatCurrency(withdrawals)}
          </Typography>
        </Box>

        {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="white">
            Saldo Adicionado:
          </Typography>
          <Typography variant="body2" color="success.main" fontWeight="bold">
            + {formatCurrency(addedBalance)}
          </Typography>
        </Box> */}

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="white">
            Apostas
          </Typography>
          <Typography variant="body2" color="error.warning" fontWeight="bold">
            {formatCurrency(selectedBankroll.totalStaked ?? 0)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Resultados */}
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Resultados
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="white">
            Ganhos:
          </Typography>
          <Typography variant="body2" color="success.main" fontWeight="bold">
            + {formatCurrency(gains)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="white">
            Perdas:
          </Typography>
          <Typography variant="body2" color="error.main" fontWeight="bold">
            - {formatCurrency(losses)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body2" fontWeight="bold">
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
          <Typography variant="body2" fontWeight="bold">
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
            <Typography variant="caption" color="gray">
              Última atualização:{" "}
              {new Date(lastHistory.date).toLocaleDateString("pt-BR")}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ bgcolor: "white", color: "#1A2B42" }}
          >
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BankrollInfoModal;
