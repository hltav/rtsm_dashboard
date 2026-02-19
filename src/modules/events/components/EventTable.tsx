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
  useTheme,
  Chip,
} from "@mui/material";
import { Info as InfoIcon, RemoveCircle } from "@mui/icons-material";
import { FullBet } from "../schemas/EventItem";
import { useBankrolls } from "@/modules/bankroll/hook/useBankrolls";
import { SafeImage } from "@/components/images/SafeImage";
import { deleteBet } from "@/lib/api/events/eventsApi";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { AlertConfirmDialog } from "@/utils/AlertConfirmDialog";
import { translateLeague } from "@/utils/leaguesMap";
import { translateSport } from "@/utils/sportsMap";
import { renderLeagueWithBadge } from "@/components/images/LeagueBadge";
import { formatEventDate } from "@/utils/date.utils";
import { resultConfig } from "../functions/chipResultColor";

interface EventTableProps {
  events: FullBet[];
  onInfoClick: (event: FullBet) => void;
  onEditClick: (event: FullBet) => void;
  onEventDeleted?: (id: number) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const EventTable: React.FC<EventTableProps> = ({
  events,
  onInfoClick,
  onEventDeleted,
}) => {
  const theme = useTheme();
  const [openConfirm, setOpenConfirm] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showNotification } = useNotification();
  const { data: bankrolls } = useBankrolls();

  const banksMap = useMemo(() => {
    if (!bankrolls) return new Map();
    return new Map(bankrolls.map((bank) => [bank.id, bank.name]));
  }, [bankrolls]);

  const handleDelete = async (id: number) => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteBet(Number(id));
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
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Table aria-label="events table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ paddingRight: "" }}>
              EVENTO
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              MODALIDADE
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              LIGA
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              MERCADO
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              UNID
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              ODD
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              BANCA
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              RESULTADO
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              AÇÕES
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
                    bgcolor: theme.palette.background.paper,
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
                            color: theme.palette.text.secondary,
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
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {event.market} - {event.selection}
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
                              src={event.homeTeamBadge}
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
                            sx={{ color: theme.palette.success.main }}
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
                              src={event.awayTeamBadge}
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
                          message={`Deseja realmente excluir o evento "${event.eventDescription}"? Essa ação não pode ser desfeita.`}
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
                  <Chip
                    label={formatEventDate(event.eventDate, "long")}
                    size="small"
                    variant="outlined"
                  />
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
                        src={event.homeTeamBadge}
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
                        src={event.awayTeamBadge}
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
                  {translateSport(event.sport)}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {renderLeagueWithBadge(
                    translateLeague(event.league).name,
                    event.leagueBadge,
                  )}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  <Box>{event.market}</Box>
                  <Box>{event.selection}</Box>
                  {/* {event.market && event.selection
                    ? `${event.market} - ${event.selection}`
                    : event.market || event.selection || "-"} */}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {event.stake} unids
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
                  {banksMap.get(event.bankrollId) || event.bankrollId}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  <Chip
                    label={resultConfig[event.result]?.label || event.result}
                    size="medium"
                    variant="outlined"
                    sx={{
                      width: 100,
                      justifyContent: "center",
                      backgroundColor:
                        resultConfig[event.result]?.color || "default",
                      borderColor:
                        resultConfig[event.result]?.color || "default",
                      color: "#1A2B42",
                      fontWeight: 600,
                    }}
                  />
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  <IconButton
                    sx={{ color: "#17ad1a" }}
                    onClick={() => onInfoClick(event)}
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setOpenConfirm(event.id ?? null)}
                    disabled={isDeleting}
                    sx={{ color: "#e42a2a" }}
                  >
                    <RemoveCircle color="inherit" />
                  </IconButton>
                  <AlertConfirmDialog
                    open={openConfirm === event.id}
                    title="Confirmar exclusão"
                    message={`Deseja realmente excluir o evento "${event.eventDescription}"? Essa ação não pode ser desfeita.`}
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
