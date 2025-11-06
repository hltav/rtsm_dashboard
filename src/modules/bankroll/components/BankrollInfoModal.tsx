import React from "react";
import { Box, Typography, Button, Modal, Divider } from "@mui/material";
import { BankrollDto } from "../schema/bankroll.schema";
import { modalStyle } from "@/modules/events/interfaces/modalStyle";
import { formatCurrency } from "@/utils/formatCurrency";

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
  const withdrawals = bankrollModal.lastHistory?.withdrawals ?? 0;
  const addedBalance = bankrollModal.lastHistory?.addedBalance ?? 0;
  const gains = bankrollModal.lastHistory?.gains ?? 0;
  const losses = bankrollModal.lastHistory?.losses ?? 0;
  const profitAndLoss =
    bankrollModal.lastHistory?.profitAndLoss ?? gains - losses;
  const result =
    bankrollModal.lastHistory?.result ??
    bankrollModal.balance - (addedBalance - withdrawals);
  const deposits = bankrollModal.lastHistory?.deposits ?? 0;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" mb={3}>
          Detalhes da Banca
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Nome
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {bankrollModal.name}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Casa de Apostas
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {bankrollModal.bookmaker}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Saldo Atual
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="white">
            {formatCurrency(bankrollModal.balance)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Saldo Inicial
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {formatCurrency(bankrollModal.initialBalance)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Valor da Unidade
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {formatCurrency(bankrollModal.unidValue)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="white">
            Status de Sincronização
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {bankrollModal.statusSync === "Synchronized"
              ? "Sincronizado"
              : "Sincronizando..."}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

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
            Saldo Adicionado:
          </Typography>
          <Typography variant="body2" color="success.main" fontWeight="bold">
            + {formatCurrency(addedBalance)}
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

        <Divider sx={{ my: 2 }} />

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

        {bankrollModal.lastHistory && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="gray">
              Última atualização:{" "}
              {new Date(bankrollModal.lastHistory.date).toLocaleDateString(
                "pt-BR"
              )}
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
