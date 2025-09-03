import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { modalStyle } from "../interfaces/modalStyle";
import { EventInfoModalProps } from "../props/events.props";

const EventInfoModal: React.FC<EventInfoModalProps> = ({
  open,
  onClose,
  event,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" mb={4}>
          Detalhes do Evento
        </Typography>
        {event && (
          <Box>
            <Typography>
              <Typography component="span" fontWeight="bold">
                ID:
              </Typography>
              {event.id}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Categoria:
              </Typography>
              {event.category}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Tipo:
              </Typography>
              {event.eventType}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Evento:
              </Typography>
              {event.event}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Mercado:
              </Typography>
              {event.market}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Aposta:
              </Typography>
              ${event.amount}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Resultado:
              </Typography>
              {event.result}
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

export default EventInfoModal;
