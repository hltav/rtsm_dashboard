import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { modalStyle } from "@/modules/events/interfaces/modalStyle";
import { BankrollModalProps } from "../props/bankrollModal.props";

const BankrollInfoModal: React.FC<BankrollModalProps> = ({
  open,
  onClose,
  bankrollModal,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" mb={4}>
          Detalhes da Banca
        </Typography>
        {bankrollModal && (
          <Box>
            <Typography>
              <Typography component="span" fontWeight="bold">
                ID:
              </Typography>
              {bankrollModal.id}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Retiradas:
              </Typography>
              {bankrollModal.withdrawals}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Saldo Adicionado:
              </Typography>
              {bankrollModal.addedBalance}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Ganhos:
              </Typography>
              {bankrollModal.gains}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Perdas:
              </Typography>
              {bankrollModal.losses}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Lucro/Prejuízo:
              </Typography>
              ${bankrollModal.profitAndLoss}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Resultado:
              </Typography>
              {bankrollModal.result}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button onClick={onClose} variant="outlined">
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BankrollInfoModal;
