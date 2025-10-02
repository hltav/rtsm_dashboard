import React from "react";
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
} from "@mui/material";
import { BankrollEditModalProps } from "../props/bankrollModal.props";
import { modalStyle } from "@/modules/events/interfaces/modalStyle";

const BankrollEditModal: React.FC<BankrollEditModalProps> = ({
  open,
  onClose,
  bankrollItemModal,
  onChange,
  onSelectChange,
  onSave,
}) => {
  if (!bankrollItemModal) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={onSave}>
        <Typography variant="h5" component="h2" mb={4}>
          Editar Banca
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Editar fundos</InputLabel>
          <Select
            name="editBalance"
            value={bankrollItemModal.editBalance}
            onChange={onSelectChange}
            label="Editar Fundos"
          >
            <MenuItem value="">O que deseja?</MenuItem>
            <MenuItem value="addedBalance">Adicionar fundos</MenuItem>
            <MenuItem value="withdrawals">Retirar fundos</MenuItem>
          </Select>
        </FormControl>

        {/* Renderiza condicionalmente */}
        {bankrollItemModal.editBalance === "addedBalance" && (
          <TextField
            fullWidth
            label="Valor a adicionar"
            name="addedBalance"
            value={bankrollItemModal.addedBalance}
            onChange={onChange}
            margin="normal"
          />
        )}

        {bankrollItemModal.editBalance === "withdrawals" && (
          <TextField
            fullWidth
            label="Valor a retirar"
            name="withdrawals"
            value={bankrollItemModal.withdrawals}
            onChange={onChange}
            margin="normal"
          />
        )}
        <TextField
          fullWidth
          label="Valor da Unidade"
          name="unidValue"
          value={bankrollItemModal.unidValue}
          onChange={onChange}
          margin="normal"
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button onClick={onClose} sx={{ mr: 2 }} variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: "#E0A800" }}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BankrollEditModal;
