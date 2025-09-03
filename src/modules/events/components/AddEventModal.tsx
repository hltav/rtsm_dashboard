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
import { AddEventModalProps } from "../props/events.props";


const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onClose,
  newEvent,
  onNewEventChange,
  onSelectChange,
  onSave,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={onSave}>
        <Typography variant="h5" component="h2" mb={4}>
          Novo Evento
        </Typography>
        <TextField
          fullWidth
          label="Categoria (ex: Futebol)"
          name="category"
          value={newEvent.category}
          onChange={onNewEventChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tipo de Evento (ex: Pré-Jogo)"
          name="eventType"
          value={newEvent.eventType}
          onChange={onNewEventChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Evento (ex: Real Madrid vs Barcelona)"
          name="event"
          value={newEvent.event}
          onChange={onNewEventChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Mercado (ex: Vencedor do Jogo)"
          name="market"
          value={newEvent.market}
          onChange={onNewEventChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Valor da Aposta"
          name="amount"
          type="number"
          value={newEvent.amount}
          onChange={onNewEventChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Resultado</InputLabel>
          <Select
            name="result"
            value={newEvent.result}
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

export default AddEventModal;
