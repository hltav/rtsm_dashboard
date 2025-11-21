import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
} from "@mui/material";
import { modalStyle } from "../interfaces/modalStyle";
import { EventInfoModalProps } from "../props/events.props";

const EventInfoModal: React.FC<EventInfoModalProps> = ({
  open,
  onClose,
  event,
}) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalStyle,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          mb={4}
          sx={{ color: theme.palette.text.primary }}
        >
          Detalhes do Evento
        </Typography>

        {event && (
          <TableContainer
            component={Paper}
            elevation={2}
            sx={{
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Evento
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {event.event}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Mercado
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {event.market}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Odd
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {event.odd}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Aposta
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {event.amount} unidades
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Resultado
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {event.result}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              "&:hover": {
                borderColor: theme.palette.text.primary,
                backgroundColor: "transparent",
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

export default EventInfoModal;
