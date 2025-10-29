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
  onInfoClick: (event: EventItem) => void;
  onEditClick: (event: EventItem) => void;
}

const StyledTableCell = styled(TableCell)(() => ({
  color: "#fff",
}));

const EventTable: React.FC<EventTableProps> = ({
  events,
  onInfoClick,
  onEditClick,
}) => {
  console.log(events);
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
            <StyledTableCell align="center" sx={{ paddingRight: "" }}>
              Evento
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Modalidade
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Liga
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Mercado
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Unids
            </StyledTableCell>
            <StyledTableCell align="center">Odd</StyledTableCell>
            <StyledTableCell align="center">Banca</StyledTableCell>
            <StyledTableCell align="center">Resultado</StyledTableCell>
            <StyledTableCell
              align="center"
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
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{
                    display: { xs: "table-cell", sm: "none" },
                    bgcolor: "#1A2B42",
                  }}
                >
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
                    {/* Mobile info */}
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: "block", sm: "none" },
                        color: "text.secondary",
                      }}
                    >
                      {event.modality}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: "block", sm: "none" },
                        color: "text.secondary",
                      }}
                    >
                      {event.league}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: "block", sm: "none" },
                        color: "text.secondary",
                      }}
                    >
                      {event.market}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: "block", sm: "none" },
                        color: "text.secondary",
                      }}
                    >
                      Valor: {event.amount} unids
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
                {/* Desktop columns */}
                <StyledTableCell
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                  align="center"
                >
                  {event.event}
                </StyledTableCell>
                <StyledTableCell
                align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.modality}
                </StyledTableCell>
                <StyledTableCell
                align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.league}
                </StyledTableCell>
                <StyledTableCell
                align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.market}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.amount}
                </StyledTableCell>
                <StyledTableCell
                align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.odd}
                </StyledTableCell>
                <StyledTableCell
                align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.bankId}
                </StyledTableCell>
                <StyledTableCell align="center">{event.result}</StyledTableCell>
                <StyledTableCell
                  align="center"
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
              <StyledTableCell colSpan={7} align="center">
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
