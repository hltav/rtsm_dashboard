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
  styled,
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
  const StyledTableCell = styled(TableCell)(() => ({
    color: "#fff",
  }));
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        bgcolor: "#1A2B42",
      }}
    >
      <Table aria-label="events table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Evento</StyledTableCell>
            <StyledTableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              Categoria
            </StyledTableCell>
            <StyledTableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              Mercado
            </StyledTableCell>
            <StyledTableCell
              align="right"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Valor
            </StyledTableCell>
            <StyledTableCell align="right">Resultado</StyledTableCell>
            <StyledTableCell
              align="right"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Ações
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <StyledTableCell component="th" scope="row">
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
                </StyledTableCell>
                <StyledTableCell
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.category}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.market}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  ${event.amount}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ width: isMobile ? "30%" : "auto" }}
                >
                  {event.result}
                </StyledTableCell>
                <StyledTableCell
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
                </StyledTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={5} align="center">
                Nenhum evento encontrado.
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;
