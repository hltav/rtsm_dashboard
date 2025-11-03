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
import { leagueTranslations } from "@/utils/leaguesMap";
import Image from "next/image";

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
  } = useTheSportsDb(
    "events",
    selectedLeagueId ? String(selectedLeagueId) : undefined
  );

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

    console.log(leagueName);

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

    console.log(selectedLeague);

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

          {/* {filteredLeagues.map((l) => {
            const translation = leagueTranslations[l.strLeague];
            if (!translation) {
              console.log("Sem tradução:", l.strLeague);
            }
            return (
              <MenuItem key={l.idLeague} value={l.strLeague}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {translation?.flag && (
                    <Typography>{translation.flag}</Typography>
                  )}
                  <Typography>
                    {translation?.name ?? l.strLeague}{" "}
                    
                  </Typography>
                </Box>
              </MenuItem>
            );
          })} */}

          {/* {filteredLeagues.map((l) => {
            const translation = leagueTranslations[l.strLeague];
            return (
              <MenuItem key={l.idLeague} value={l.strLeague}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {translation?.flag && (
                    <Box sx={{ width: 20, height: 15, position: "relative" }}>
                      <Image
                        src={`https://flagcdn.com/w40/${translation.flag}.png`}
                        alt={translation.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  )}
                  <Typography>{translation?.name ?? l.strLeague}</Typography>
                </Box>
              </MenuItem>
            );
          })} */}

          {/* {filteredLeagues.map((l) => {
            const translation = leagueTranslations[l.strLeague];

            // Função que verifica se o flag é um código de país (2 letras)
            const isCountryCode = (flag?: string) =>
              flag && /^[A-Z]{2}$/.test(flag);

            return (
              <MenuItem key={l.idLeague} value={l.strLeague}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {translation?.flag && isCountryCode(translation.flag) ? (
                    <Box sx={{ width: 20, height: 15, position: "relative" }}>
                      <Image
                        src={`https://flagcdn.com/w40/${translation.flag.toLowerCase()}.png`}
                        alt={translation.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  ) : (
                    <Typography>{translation?.flag}</Typography> // fallback: emoji ou texto
                  )}
                  <Typography>{translation?.name ?? l.strLeague}</Typography>
                </Box>
              </MenuItem>
            );
          })} */}
          {filteredLeagues.map((l) => {
            const translation = leagueTranslations[l.strLeague];

            const isCountryCode = (flag?: string) =>
              flag && /^[A-Z]{2}$/.test(flag);

            return (
              <MenuItem key={l.idLeague} value={l.strLeague}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {translation?.logo ? (
                    // Logo da competição
                    <Box
                      sx={{
                        width: 30,
                        height: 25,
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={translation.logo}
                        alt={translation.name}
                        width={25}
                        height={25}
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                  ) : translation?.flag && isCountryCode(translation.flag) ? (
                    <Box sx={{ width: 30, height: 25, flexShrink: 0 }}>
                      <Image
                        src={`https://flagcdn.com/w40/${translation.flag.toLowerCase()}.png`}
                        alt={translation.name}
                        width={25}
                        height={25}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  ) : (
                    <Typography>{translation?.flag}</Typography>
                  )}

                  <Typography>{translation?.name ?? l.strLeague}</Typography>
                </Box>
              </MenuItem>
            );
          })}
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
          value={newEvent.apiEventId || ""}
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
              <MenuItem key={e.idEvent} value={e.idEvent}>
                {e.strEvent}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};
