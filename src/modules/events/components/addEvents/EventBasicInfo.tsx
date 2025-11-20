// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   CircularProgress,
//   SelectChangeEvent,
// } from "@mui/material";
// import { useTheSportsDb } from "@/hooks/useTheSportsDb";
// import {
//   League,
//   Sport,
//   NextEvents,
// } from "@/lib/api/theSportsDb/interface/theSportsDb.interface";
// import { EventBasicInfoProps } from "../../props/modalAddEvent.props";
// import { useSportsTranslation } from "@/modules/events/hooks/useSportsTranslation";
// import { leagueTranslations } from "@/utils/leaguesMap";
// import Image from "next/image";

// export const EventBasicInfo: React.FC<EventBasicInfoProps> = ({
//   newEvent,
//   onSelectChange,
// }) => {
//   const [selectedSport, setSelectedSport] = useState<string>("");
//   const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);

//   // Hook para buscar esportes (modalidades)
//   const {
//     data: sportsData,
//     loading: loadingSports,
//     error: errorSports,
//   } = useTheSportsDb("sports");

//   // Hook para buscar todas as ligas
//   const {
//     data: leaguesData,
//     loading: loadingLeagues,
//     error: errorLeagues,
//   } = useTheSportsDb("leagues");

//   // Hook para buscar próximos eventos da liga selecionada
//   const {
//     data: eventsData,
//     loading: loadingEvents,
//     error: errorEvents,
//   } = useTheSportsDb(
//     "events",
//     selectedLeagueId ? String(selectedLeagueId) : undefined
//   );

//   // Hook de tradução
//   const { getTranslatedSportsList, getTranslatedLeaguesList } =
//     useSportsTranslation();

//   // Traduzir os dados vindos da API
//   const translatedSports = Array.isArray(sportsData)
//     ? getTranslatedSportsList((sportsData as Sport[]).map((s) => s.strSport))
//     : [];

//   const translatedLeagues = Array.isArray(leaguesData)
//     ? getTranslatedLeaguesList(leaguesData as League[])
//     : [];

//   // Filtra as ligas com base no esporte selecionado
//   const filteredLeagues = translatedLeagues.filter(
//     (league) => league.strSport === selectedSport
//   );

//   useEffect(() => {
//     if (errorSports) console.error("Erro ao buscar esportes:", errorSports);
//     if (errorLeagues) console.error("Erro ao buscar ligas:", errorLeagues);
//     if (errorEvents) console.error("Erro ao buscar eventos:", errorEvents);
//   }, [errorSports, errorLeagues, errorEvents]);

//   const handleSportChange = (event: SelectChangeEvent<string>) => {
//     const sport = event.target.value;
//     setSelectedSport(sport);

//     const syntheticEvent = {
//       ...event,
//       target: {
//         ...event.target,
//         name: "modality",
//         value: sport,
//       },
//     } as SelectChangeEvent<string>;

//     onSelectChange(syntheticEvent);
//   };

//   const handleLeagueChange = (event: SelectChangeEvent<string>) => {
//     const leagueName = event.target.value;

//     onSelectChange({
//       ...event,
//       target: {
//         ...event.target,
//         name: "league",
//         value: leagueName,
//       },
//     } as SelectChangeEvent<string>);

//     const selectedLeague = translatedLeagues.find(
//       (l) => l.strLeague === leagueName
//     );

//     setSelectedLeagueId(
//       selectedLeague ? Number(selectedLeague.idLeague) : null
//     );
//   };

//   return (
//     <>
//       {/* SELECT de Modalidade */}
//       {/* <FormControl fullWidth margin="normal">
//         <InputLabel>Modalidade</InputLabel>
//         <Select
//           name="modality"
//           value={selectedSport}
//           onChange={handleSportChange}
//           label="Modalidade"
//         >
//           {loadingSports ? (
//             <MenuItem value="" disabled>
//               <CircularProgress size={20} sx={{ mr: 1 }} />
//               Carregando modalidades...
//             </MenuItem>
//           ) : (
//             translatedSports.map((sport) => (
//               <MenuItem key={sport.value} value={sport.value}>
//                 {sport.label}
//               </MenuItem>
//             ))
//           )}
//         </Select>
//       </FormControl> */}

//       {/* Filtra para deixar só Futebol */}
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Modalidade</InputLabel>
//         <Select
//           name="modality"
//           value={selectedSport}
//           onChange={handleSportChange}
//           label="Modalidade"
//         >
//           {loadingSports ? (
//             <MenuItem value="" disabled>
//               <CircularProgress size={20} sx={{ mr: 1 }} />
//               Carregando modalidades...
//             </MenuItem>
//           ) : (
//             translatedSports
//               .filter((sport) => sport.value === "Soccer")
//               .map((sport) => (
//                 <MenuItem key={sport.value} value={sport.value}>
//                   {sport.label}
//                 </MenuItem>
//               ))
//           )}
//         </Select>
//       </FormControl>

//       {/* SELECT de Ligas */}
//       <FormControl fullWidth margin="normal" disabled={!selectedSport}>
//         <InputLabel>Liga</InputLabel>
//         <Select
//           name="league"
//           value={newEvent.league}
//           onChange={handleLeagueChange}
//           label="Liga"
//         >
//           <MenuItem value="" disabled>
//             {loadingLeagues
//               ? "Carregando ligas..."
//               : selectedSport
//               ? "Selecione uma liga"
//               : "Selecione uma modalidade primeiro"}
//           </MenuItem>

//           {filteredLeagues.map((l) => {
//             const translation = leagueTranslations[l.strLeague];

//             const isCountryCode = (flag?: string) =>
//               flag && /^[A-Z]{2}$/.test(flag);

//             return (
//               <MenuItem key={l.idLeague} value={l.strLeague}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   {translation?.logo ? (
//                     <Box
//                       sx={{
//                         width: 30,
//                         height: 25,
//                         position: "relative",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <Image
//                         src={translation.logo}
//                         alt={translation.name}
//                         width={25}
//                         height={25}
//                         style={{ objectFit: "contain" }}
//                       />
//                     </Box>
//                   ) : translation?.flag && isCountryCode(translation.flag) ? (
//                     <Box sx={{ width: 30, height: 25, flexShrink: 0 }}>
//                       <Image
//                         src={`https://flagcdn.com/w40/${translation.flag.toLowerCase()}.png`}
//                         alt={translation.name}
//                         width={25}
//                         height={25}
//                         style={{ objectFit: "cover" }}
//                       />
//                     </Box>
//                   ) : (
//                     <Typography>{translation?.flag}</Typography>
//                   )}

//                   <Typography>{translation?.name ?? l.strLeague}</Typography>
//                 </Box>
//               </MenuItem>
//             );
//           })}
//         </Select>
//       </FormControl>

//       {/* SELECT de Eventos */}
//       <FormControl
//         fullWidth
//         margin="normal"
//         disabled={!selectedLeagueId || loadingEvents}
//       >
//         <InputLabel>Evento</InputLabel>
//         <Select
//           name="event"
//           value={newEvent.apiEventId || ""}
//           onChange={onSelectChange}
//           label="Evento"
//         >
//           <MenuItem value="" disabled>
//             {loadingEvents
//               ? "Carregando eventos..."
//               : selectedLeagueId
//               ? "Selecione um evento"
//               : "Selecione uma liga primeiro"}
//           </MenuItem>

//           {Array.isArray(eventsData) &&
//             (eventsData as NextEvents[]).map((e) => (
//               <MenuItem key={e.idEvent} value={e.idEvent}>
//                 {e.strEvent}
//               </MenuItem>
//             ))}
//         </Select>
//       </FormControl>
//     </>
//   );
// };

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
  useTheme,
} from "@mui/material";
import { useTheSportsDb } from "@/hooks/useTheSportsDb";
import {
  League,
  Sport,
  NextEvents,
} from "@/lib/api/theSportsDb/interface/theSportsDb.interface";
import { EventBasicInfoProps } from "../../props/modalAddEvent.props";
import { useSportsTranslation } from "@/modules/events/hooks/useSportsTranslation";
import { leagueTranslations } from "@/utils/leaguesMap";
import Image from "next/image";

export const EventBasicInfo: React.FC<EventBasicInfoProps> = ({
  newEvent,
  onSelectChange,
}) => {
  const theme = useTheme();
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

  const handleLeagueChange = (event: SelectChangeEvent<string>) => {
    const leagueName = event.target.value;

    onSelectChange({
      ...event,
      target: {
        ...event.target,
        name: "league",
        value: leagueName,
      },
    } as SelectChangeEvent<string>);

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
      {/* <FormControl fullWidth margin="normal">
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
      </FormControl> */}

      {/* Filtra para deixar só Futebol */}
      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ color: theme.palette.text.secondary }}>
          Modalidade
        </InputLabel>
        <Select
          name="modality"
          value={selectedSport}
          onChange={handleSportChange}
          label="Modalidade"
          sx={{
            color: theme.palette.text.primary,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          {loadingSports ? (
            <MenuItem value="" disabled>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Carregando modalidades...
            </MenuItem>
          ) : (
            translatedSports
              .filter((sport) => sport.value === "Soccer")
              .map((sport) => (
                <MenuItem key={sport.value} value={sport.value}>
                  {sport.label}
                </MenuItem>
              ))
          )}
        </Select>
      </FormControl>

      {/* SELECT de Ligas */}
      <FormControl fullWidth margin="normal" disabled={!selectedSport}>
        <InputLabel sx={{ color: theme.palette.text.secondary }}>
          Liga
        </InputLabel>
        <Select
          name="league"
          value={newEvent.league}
          onChange={handleLeagueChange}
          label="Liga"
          sx={{
            color: theme.palette.text.primary,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          <MenuItem
            value=""
            disabled
            sx={{ color: theme.palette.text.secondary }}
          >
            {loadingLeagues
              ? "Carregando ligas..."
              : selectedSport
              ? "Selecione uma liga"
              : "Selecione uma modalidade primeiro"}
          </MenuItem>

          {filteredLeagues.map((l) => {
            const translation = leagueTranslations[l.strLeague];

            const isCountryCode = (flag?: string) =>
              flag && /^[A-Z]{2}$/.test(flag);

            return (
              <MenuItem key={l.idLeague} value={l.strLeague}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {translation?.logo ? (
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

                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {translation?.name ?? l.strLeague}
                  </Typography>
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
        <InputLabel sx={{ color: theme.palette.text.secondary }}>
          Evento
        </InputLabel>
        <Select
          name="event"
          value={newEvent.apiEventId || ""}
          onChange={onSelectChange}
          label="Evento"
          sx={{
            color: theme.palette.text.primary,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          <MenuItem
            value=""
            disabled
            sx={{ color: theme.palette.text.secondary }}
          >
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
