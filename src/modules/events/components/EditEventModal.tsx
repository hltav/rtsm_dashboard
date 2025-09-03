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
import { modalStyle } from "../interfaces/modalStyle";
import { EditEventModalProps } from "../props/events.props";

const EditEventModal: React.FC<EditEventModalProps> = ({
  open,
  onClose,
  event,
  onChange,
  onSelectChange,
  onSave,
}) => {
  if (!event) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={onSave}>
        <Typography variant="h5" component="h2" mb={4}>
          Editar Evento
        </Typography>
        <TextField
          fullWidth
          label="Categoria"
          name="category"
          value={event.category}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tipo de Evento"
          name="eventType"
          value={event.eventType}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Evento"
          name="event"
          value={event.event}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Mercado"
          name="market"
          value={event.market}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Valor da Aposta"
          name="amount"
          type="number"
          value={event.amount}
          onChange={onChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Resultado</InputLabel>
          <Select
            name="result"
            value={event.result}
            onChange={onSelectChange}
            label="Resultado"
          >
            <MenuItem value="">Selecione o Resultado</MenuItem>
            <MenuItem value="Ganho">Ganho</MenuItem>
            <MenuItem value="Perda">Perda</MenuItem>
            <MenuItem value="Empate">Empate</MenuItem>
          </Select>
        </FormControl>
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

export default EditEventModal;
