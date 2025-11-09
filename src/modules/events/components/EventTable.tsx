import React, { useMemo, useState } from "react";
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
import { Info as InfoIcon, RemoveCircle } from "@mui/icons-material";
import { FullEvent } from "../schemas/EventItem";
import { useBankrolls } from "@/modules/bankroll/hook/useBankrolls";
import { useAuth } from "@/components/Providers/AuthContext";
import { SafeImage } from "@/components/SafeImage";
import { deleteEvent } from "@/lib/api/events/eventsApi";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { AlertConfirmDialog } from "@/utils/AlertConfirmDialog";
import { translateLeague } from "@/utils/leaguesMap";
import { translateSport } from "@/utils/sportsMap";
import { renderLeagueWithBadge } from "@/components/LeagueBadge";
import { formatEventDate } from "@/utils/date.utils";

interface EventTableProps {
  events: FullEvent[];
  onInfoClick: (event: FullEvent) => void;
  onEditClick: (event: FullEvent) => void;
  onEventDeleted?: (id: number) => void;
}

const StyledTableCell = styled(TableCell)(() => ({
  color: "#fff",
}));

const EventTable: React.FC<EventTableProps> = ({
  events,
  onInfoClick,
  onEventDeleted,
}) => {
  const [openConfirm, setOpenConfirm] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showNotification } = useNotification();
  const { user } = useAuth();

  const userId = user?.id;

  const { data: bankrolls } = useBankrolls(userId ?? 0);

  const banksMap = useMemo(() => {
    if (!bankrolls) return new Map();
    return new Map(bankrolls.map((bank) => [bank.id, bank.name]));
  }, [bankrolls]);

  const handleDelete = async (id: number) => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteEvent(String(id));
      showNotification("Evento deletado com sucesso!", "success");
      onEventDeleted?.(id);
    } catch (error) {
      console.error(error);
      showNotification("Erro ao deletar evento.", "error");
    } finally {
      setIsDeleting(false);
      setOpenConfirm(null);
    }
  };

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const aPending = a.result === "pending";
      const bPending = b.result === "pending";

      if (aPending && !bPending) return -1;
      if (!aPending && bPending) return 1;

      if (aPending && bPending) {
        const aDate = new Date(a.eventDate ?? 0).getTime();
        const bDate = new Date(b.eventDate ?? 0).getTime();
        return aDate - bDate;
      }

      const aDate = new Date(a.eventDate ?? 0).getTime();
      const bDate = new Date(b.eventDate ?? 0).getTime();
      return bDate - aDate;
    });
  }, [events]);

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
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Odd
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Banca
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Resultado
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              Ações
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: "3%",
                        width: "100%",
                      }}
                    >
                      <Box mr={6}>
                        <Typography
                          variant="body2"
                          sx={{
                            display: { xs: "block", sm: "none" },
                            color: "text.secondary",
                          }}
                        >
                          {event.league}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          align="right"
                          variant="body2"
                          sx={{
                            display: { xs: "block", sm: "none" },
                            color: "text.secondary",
                          }}
                        >
                          {event.market} - {event.optionMarket}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: 0.5,
                        }}
                      >
                        {/* Linha 1 - Time da casa */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: "1.5rem",
                                lineHeight: 1,
                              }}
                            ></Box>
                            <SafeImage
                              src={event.strHomeTeamBadge}
                              alt={event.homeTeam || ""}
                              width={30}
                              height={30}
                              fallback="/placeholder-team.png"
                            />
                            <Typography fontWeight={500}>
                              {event.homeTeam}
                            </Typography>
                          </Box>
                          <IconButton
                            sx={{ color: "#4CAF50" }}
                            onClick={() => onInfoClick(event)}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Box>
                        {/* Linha 2 - Time visitante */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: "1.5rem",
                                lineHeight: 1,
                              }}
                            ></Box>
                            <SafeImage
                              src={event.strAwayTeamBadge}
                              alt={event.awayTeam || ""}
                              width={30}
                              height={30}
                              fallback="/placeholder-team.png"
                            />
                            <Typography fontWeight={500}>
                              {event.awayTeam}
                            </Typography>
                          </Box>
                          <IconButton
                            onClick={() => setOpenConfirm(event.id ?? null)}
                            color="error"
                            disabled={isDeleting}
                            sx={{ ml: "auto" }}
                          >
                            <RemoveCircle color="inherit" />
                          </IconButton>
                        </Box>
                        <AlertConfirmDialog
                          open={openConfirm === event.id}
                          title="Confirmar exclusão"
                          message={`Deseja realmente excluir o evento "${event.event}"? Essa ação não pode ser desfeita.`}
                          severity="warning"
                          onConfirm={() => event.id && handleDelete(event.id)}
                          onCancel={() => setOpenConfirm(null)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </StyledTableCell>
                {/* Desktop columns */}
                <StyledTableCell
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                  align="center"
                >
                  <Box sx={{ fontSize: "12px", color: "#9e9da2" }}>
                    {formatEventDate(event.eventDate, "long")}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 3,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: 2,
                      }}
                    >
                      <SafeImage
                        src={event.strHomeTeamBadge}
                        alt={""}
                        width={30}
                        height={30}
                        fallback="/placeholder-team.png"
                        className="team-badge"
                      />
                      <Typography align="left">{event.homeTeam}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Typography align="left">{event.awayTeam}</Typography>
                      <SafeImage
                        src={event.strAwayTeamBadge}
                        alt={""}
                        width={30}
                        height={30}
                        fallback="/placeholder-team.png"
                        className="team-badge"
                      />
                    </Box>
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {translateSport(event.modality)}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {renderLeagueWithBadge(
                    translateLeague(event.league).name,
                    event.strBadge
                  )}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.market && event.optionMarket
                    ? `${event.market} - ${event.optionMarket}`
                    : event.market || event.optionMarket || "-"}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.amount} unids
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
                  {banksMap.get(event.bankId) || event.bankId}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.result}
                </StyledTableCell>
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
                    onClick={() => setOpenConfirm(event.id ?? null)}
                    color="error"
                    disabled={isDeleting}
                  >
                    <RemoveCircle color="inherit" />
                  </IconButton>
                  <AlertConfirmDialog
                    open={openConfirm === event.id}
                    title="Confirmar exclusão"
                    message={`Deseja realmente excluir o evento "${event.event}"? Essa ação não pode ser desfeita.`}
                    severity="warning"
                    onConfirm={() => event.id && handleDelete(event.id)}
                    onCancel={() => setOpenConfirm(null)}
                  />
                </StyledTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={9} align="center">
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
