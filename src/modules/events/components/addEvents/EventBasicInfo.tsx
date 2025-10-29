import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import { useTheSportsDb } from "@/hooks/useTheSportsDb";
import {
  League,
  Sport,
  NextEvents,
} from "@/lib/api/theSportsDb/interface/theSportsDb.interface";
import { EventBasicInfoProps } from "../../props/modalAddEvent.props";
import { useSportsTranslation } from "@/hooks/useSportsTranslation";

export const EventBasicInfo: React.FC<EventBasicInfoProps> = ({
  newEvent,
  onSelectChange,
}) => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);

  // Hook para buscar esportes (modalidades)
  const {
    data: sportsData,
    loading: loadingSports,
    error: errorSports,
  } = useTheSportsDb("sports");

  // Hook para buscar todas as ligas
  const {
    data: leaguesData,
    loading: loadingLeagues,
    error: errorLeagues,
  } = useTheSportsDb("leagues");

  // Hook para buscar próximos eventos da liga selecionada
  const {
    data: eventsData,
    loading: loadingEvents,
    error: errorEvents,
  } = useTheSportsDb("events", selectedLeagueId || undefined);

  // Hook de tradução
  const { getTranslatedSportsList, getTranslatedLeaguesList } =
    useSportsTranslation();

  // Traduzir os dados vindos da API
  const translatedSports = Array.isArray(sportsData)
    ? getTranslatedSportsList((sportsData as Sport[]).map((s) => s.strSport))
    : [];

  const translatedLeagues = Array.isArray(leaguesData)
    ? getTranslatedLeaguesList(leaguesData as League[])
    : [];

  // Filtra as ligas com base no esporte selecionado
  const filteredLeagues = translatedLeagues.filter(
    (league) => league.strSport === selectedSport
  );

  useEffect(() => {
    if (errorSports) console.error("Erro ao buscar esportes:", errorSports);
    if (errorLeagues) console.error("Erro ao buscar ligas:", errorLeagues);
    if (errorEvents) console.error("Erro ao buscar eventos:", errorEvents);
  }, [errorSports, errorLeagues, errorEvents]);

  /** Ao mudar a modalidade */
  const handleSportChange = (event: SelectChangeEvent<string>) => {
    const sport = event.target.value;
    setSelectedSport(sport);

    const syntheticEvent = {
      ...event,
      target: {
        ...event.target,
        name: "modality",
        value: sport,
      },
    } as SelectChangeEvent<string>;

    onSelectChange(syntheticEvent);
  };

  /** Ao mudar a liga */
  const handleLeagueChange = (event: SelectChangeEvent<string>) => {
    const leagueName = event.target.value;

    // Atualiza no formulário pai
    onSelectChange({
      ...event,
      target: {
        ...event.target,
        name: "league",
        value: leagueName,
      },
    } as SelectChangeEvent<string>);

    // Localiza o ID da liga selecionada
    const selectedLeague = translatedLeagues.find(
      (l) => l.strLeague === leagueName
    );

    setSelectedLeagueId(
      selectedLeague ? Number(selectedLeague.idLeague) : null
    );
  };

  return (
    <>
      {/* SELECT de Modalidade */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Modalidade</InputLabel>
        <Select
          name="modality"
          value={selectedSport}
          onChange={handleSportChange}
          label="Modalidade"
        >
          {loadingSports ? (
            <MenuItem value="" disabled>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Carregando modalidades...
            </MenuItem>
          ) : (
            translatedSports.map((sport) => (
              <MenuItem key={sport.value} value={sport.value}>
                {sport.label}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* SELECT de Ligas */}
      <FormControl fullWidth margin="normal" disabled={!selectedSport}>
        <InputLabel>Liga</InputLabel>
        <Select
          name="league"
          value={newEvent.league}
          onChange={handleLeagueChange}
          label="Liga"
        >
          <MenuItem value="" disabled>
            {loadingLeagues
              ? "Carregando ligas..."
              : selectedSport
              ? "Selecione uma liga"
              : "Selecione uma modalidade primeiro"}
          </MenuItem>

          {filteredLeagues.map((l) => (
            <MenuItem key={l.idLeague} value={l.strLeague}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>{l.translatedLeague}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* SELECT de Eventos */}
      <FormControl
        fullWidth
        margin="normal"
        disabled={!selectedLeagueId || loadingEvents}
      >
        <InputLabel>Evento</InputLabel>
        <Select
          name="event"
          value={newEvent.event}
          onChange={onSelectChange}
          label="Evento"
        >
          <MenuItem value="" disabled>
            {loadingEvents
              ? "Carregando eventos..."
              : selectedLeagueId
              ? "Selecione um evento"
              : "Selecione uma liga primeiro"}
          </MenuItem>

          {Array.isArray(eventsData) &&
            (eventsData as NextEvents[]).map((e) => (
              <MenuItem key={e.idEvent} value={e.strEvent}>
                {e.strEvent}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};
