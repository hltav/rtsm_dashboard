import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Info as InfoIcon, Edit as EditIcon } from "@mui/icons-material";
import { EventItem } from "../interfaces/EventItem";

interface EventTableProps {
  events: EventItem[];
  isMobile: boolean;
  onInfoClick: (event: EventItem) => void;
  onEditClick: (event: EventItem) => void;
}

const EventTable: React.FC<EventTableProps> = ({
  events,
  isMobile,
  onInfoClick,
  onEditClick,
}) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table aria-label="events table">
        <TableHead>
          <TableRow>
            <TableCell>Evento</TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              Categoria
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              Mercado
            </TableCell>
            <TableCell
              align="right"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Valor
            </TableCell>
            <TableCell align="right">Resultado</TableCell>
            <TableCell
              align="right"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell component="th" scope="row">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {event.event}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: "block", sm: "none" },
                        color: "text.secondary",
                      }}
                    >
                      {`${event.category} - ${event.market}`}
                    </Typography>
                    <Box
                      sx={{
                        display: { xs: "flex", sm: "none" },
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <IconButton
                        sx={{ color: "#4CAF50" }}
                        onClick={() => onInfoClick(event)}
                      >
                        <InfoIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => onEditClick(event)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {event.category}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {event.market}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  ${event.amount}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ width: isMobile ? "30%" : "auto" }}
                >
                  {event.result}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  <IconButton
                    sx={{ color: "#4CAF50" }}
                    onClick={() => onInfoClick(event)}
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => onEditClick(event)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Nenhum evento encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;
