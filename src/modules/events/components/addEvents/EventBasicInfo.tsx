// import React, { useEffect, useState } from "react";
// import {
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   SelectChangeEvent,
//   Autocomplete,
//   TextField,
// } from "@mui/material";
// import { EventBasicInfoProps } from "../../props/modalAddEvent.props";
// import { soccerApi } from "@/lib/api/apiSports/soccer/soccerApi";
// import { DiscoverFixture } from "@/lib/cache/schemas/discoveryFixture.schema";
// import { CountriesListBox } from "../../utils/countriesListBox";
// import { OrganizedLeaguesResponse } from "@/lib/api/apiSports/soccer/schemas/discoveryOrganized.schema";

// export const EventBasicInfo: React.FC<EventBasicInfoProps> = ({
//   newEvent,
//   onSelectChange,
//   onFixtureSelect, // ✅ Recebe a prop
// }) => {
//   const [organizedLeagues, setOrganizedLeagues] =
//     useState<OrganizedLeaguesResponse | null>(null);
//   const [fixtures, setFixtures] = useState<DiscoverFixture[]>([]);
//   const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
//   const [loadingLeagues, setLoadingLeagues] = useState(false);
//   const [loadingFixtures, setLoadingFixtures] = useState(false);
//   const [errorLeagues, setErrorLeagues] = useState<string | null>(null);
//   const [errorFixtures, setErrorFixtures] = useState<string | null>(null);

//   // Buscar ligas ao montar
//   useEffect(() => {
//     const fetchOrganizedLeagues = async () => {
//       setLoadingLeagues(true);
//       setErrorLeagues(null);
//       try {
//         const data = await soccerApi.getOrganizedLeagues("current", false);
//         setOrganizedLeagues(data); // agora você guarda o objeto completo
//       } catch (error) {
//         console.error("Erro ao buscar ligas organizadas:", error);
//         setErrorLeagues("Erro ao carregar ligas organizadas");
//       } finally {
//         setLoadingLeagues(false);
//       }
//     };
//     fetchOrganizedLeagues();
//   }, []);

//   // Buscar fixtures quando liga selecionada
//   useEffect(() => {
//     if (!selectedLeagueId) {
//       setFixtures([]);
//       return;
//     }
//     const fetchFixtures = async () => {
//       setLoadingFixtures(true);
//       setErrorFixtures(null);
//       try {
//         const data = await soccerApi.getNextFixtures(
//           selectedLeagueId,
//           20,
//           "current"
//         );
//         const normalizedData = data.map((fixture) => ({
//           ...fixture,
//           league: {
//             ...fixture.league,
//             flag: fixture.league.flag ?? undefined,
//             logo: fixture.league.logo ?? undefined,
//           },
//           teams: {
//             home: {
//               ...fixture.teams.home,
//               logo: fixture.teams.home.logo ?? undefined,
//             },
//             away: {
//               ...fixture.teams.away,
//               logo: fixture.teams.away.logo ?? undefined,
//             },
//           },
//         }));
//         setFixtures(normalizedData);
//       } catch (error) {
//         console.error("Erro ao buscar fixtures:", error);
//         setErrorFixtures("Erro ao carregar partidas");
//       } finally {
//         setLoadingFixtures(false);
//       }
//     };
//     fetchFixtures();
//   }, [selectedLeagueId]);

//   const handleLeagueSelect = (leagueData: {
//     leagueId: number;
//     season: number | null;
//   }) => {
//     if (!organizedLeagues) return;

//     const allLeagues = [
//       ...organizedLeagues.mainCountries.flatMap((c) => c.leagues),
//       ...organizedLeagues.otherCountries.flatMap((c) => c.leagues),
//     ];

//     const selectedLeague = allLeagues.find(
//       (l) => l.apiSportsLeagueId === leagueData.leagueId
//     );

//     if (selectedLeague) {
//       onSelectChange({
//         target: { name: "league", value: selectedLeague.name },
//       } as SelectChangeEvent<string>);
//       setSelectedLeagueId(leagueData.leagueId);
//     }
//   };

//   const handleFixtureChange = (event: SelectChangeEvent<string>) => {
//     console.log("🎯 [EventBasicInfo] handleFixtureChange CHAMADO!");
//     console.log(
//       "📝 [EventBasicInfo] fixtureId selecionado:",
//       event.target.value
//     );

//     const fixtureId = event.target.value;
//     const selectedFixture = fixtures.find(
//       (f) => f.apiSportsEventId?.toString() === fixtureId
//     );

//     console.log("🔍 [EventBasicInfo] Fixture encontrado?", !!selectedFixture);
//     console.log("📦 [EventBasicInfo] Fixture completo:", selectedFixture);

//     if (selectedFixture) {
//       console.log("✅ [EventBasicInfo] Chamando onFixtureSelect...");
//       console.log(
//         "🔗 [EventBasicInfo] onFixtureSelect existe?",
//         !!onFixtureSelect
//       );

//       onFixtureSelect?.(selectedFixture.previewId, selectedFixture);

//       console.log("✅ [EventBasicInfo] onFixtureSelect chamado!");
//     } else {
//       console.warn("⚠️ [EventBasicInfo] Fixture NÃO encontrado na lista!");
//     }
//   };

//   return (
//     <>
//       {/* Modalidade */}
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Modalidade</InputLabel>
//         <Select name="sport" value="Soccer" disabled label="Modalidade">
//           <MenuItem value="Soccer">Futebol</MenuItem>
//         </Select>
//       </FormControl>

//       {/* SELECT de Ligas */}
//       <FormControl fullWidth margin="normal" sx={{ position: "relative" }}>
//         <Autocomplete
//           options={
//             organizedLeagues
//               ? [
//                   ...organizedLeagues.mainCountries.flatMap((c) => c.leagues),
//                   ...organizedLeagues.otherCountries.flatMap((c) => c.leagues),
//                 ]
//               : []
//           }
//           getOptionLabel={(option) => option.name}
//           value={
//             organizedLeagues
//               ? [
//                   ...organizedLeagues.mainCountries.flatMap((c) => c.leagues),
//                   ...organizedLeagues.otherCountries.flatMap((c) => c.leagues),
//                 ].find((l) => l.name === newEvent.league) || null
//               : null
//           }
//           onChange={(_, value) => {
//             if (value && value.apiSportsLeagueId) {
//               handleLeagueSelect({
//                 leagueId: value.apiSportsLeagueId,
//                 season: value.season,
//               });
//             }
//           }}
//           noOptionsText={errorLeagues || "Nenhuma liga encontrada"}
//           loadingText="Carregando ligas..."
//           loading={loadingLeagues}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label="Liga"
//               placeholder="Selecione uma liga"
//               error={!!errorLeagues}
//             />
//           )}
//           ListboxComponent={(props) =>
//             organizedLeagues && (
//               <CountriesListBox
//                 {...props}
//                 data={organizedLeagues}
//                 onSelectLeague={handleLeagueSelect}
//               />
//             )
//           }
//         />
//       </FormControl>

//       {/* SELECT de Partidas */}
//       <FormControl
//         fullWidth
//         margin="normal"
//         disabled={!selectedLeagueId || loadingFixtures}
//       >
//         <InputLabel>Partida</InputLabel>
//         <Select
//           name="apiEventId"
//           value={newEvent.apiEventId || ""}
//           onChange={handleFixtureChange}
//           label="Partida"
//         >
//           <MenuItem value="" disabled>
//             {loadingFixtures
//               ? "Carregando partidas..."
//               : selectedLeagueId
//               ? "Selecione uma partida"
//               : "Selecione uma liga primeiro"}
//           </MenuItem>

//           {errorFixtures && (
//             <MenuItem value="" disabled>
//               {errorFixtures}
//             </MenuItem>
//           )}

//           {fixtures.map((fixture) => (
//             <MenuItem
//               key={fixture.previewId}
//               value={fixture.apiSportsEventId?.toString() || ""}
//             >
//               {`${fixture.teams.home.name} vs ${
//                 fixture.teams.away.name
//               } - ${new Date(fixture.date).toLocaleDateString("pt-BR")}`}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { EventBasicInfoProps } from "../../props/modalAddEvent.props";
import { soccerApi } from "@/lib/api/apiSports/soccer/soccerApi";
import { DiscoverFixture } from "@/lib/cache/schemas/discoveryFixture.schema";
import { OrganizedLeaguesResponse } from "@/lib/api/apiSports/soccer/schemas/discoveryOrganized.schema";
import { LeagueSelectionModal } from "./LeagueSelectionModal";
import { FixtureSelectionModal } from "./FixtureSelectionModal";

export const EventBasicInfo: React.FC<EventBasicInfoProps> = ({
  newEvent,
  onSelectChange,
  onFixtureSelect,
}) => {
  const [organizedLeagues, setOrganizedLeagues] =
    useState<OrganizedLeaguesResponse | null>(null);
  const [fixtures, setFixtures] = useState<DiscoverFixture[]>([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [loadingFixtures, setLoadingFixtures] = useState(false);
  const [errorLeagues, setErrorLeagues] = useState<string | null>(null);
  const [errorFixtures, setErrorFixtures] = useState<string | null>(null);
  // Estados dos modais
  const [leagueModalOpen, setLeagueModalOpen] = useState(false);
  const [fixtureModalOpen, setFixtureModalOpen] = useState(false);
  // Buscar ligas ao montar
  useEffect(() => {
    const fetchOrganizedLeagues = async () => {
      setLoadingLeagues(true);
      setErrorLeagues(null);
      try {
        const data = await soccerApi.getOrganizedLeagues("current", false);
        setOrganizedLeagues(data);
      } catch (error) {
        console.error("Erro ao buscar ligas organizadas:", error);
        setErrorLeagues("Erro ao carregar ligas organizadas");
      } finally {
        setLoadingLeagues(false);
      }
    };
    fetchOrganizedLeagues();
  }, []);

  // Buscar fixtures quando liga selecionada
  useEffect(() => {
    if (!selectedLeagueId) {
      setFixtures([]);
      return;
    }
    const fetchFixtures = async () => {
      setLoadingFixtures(true);
      setErrorFixtures(null);
      try {
        const data = await soccerApi.getNextFixtures(
          selectedLeagueId,
          20,
          "current"
        );
        const normalizedData = data.map((fixture) => ({
          ...fixture,
          league: {
            ...fixture.league,
            flag: fixture.league.flag ?? undefined,
            logo: fixture.league.logo ?? undefined,
          },
          teams: {
            home: {
              ...fixture.teams.home,
              logo: fixture.teams.home.logo ?? undefined,
            },
            away: {
              ...fixture.teams.away,
              logo: fixture.teams.away.logo ?? undefined,
            },
          },
        }));
        setFixtures(normalizedData);
      } catch (error) {
        console.error("Erro ao buscar fixtures:", error);
        setErrorFixtures("Erro ao carregar partidas");
      } finally {
        setLoadingFixtures(false);
      }
    };
    fetchFixtures();
  }, [selectedLeagueId]);

  const handleLeagueSelect = (leagueData: {
    leagueId: number;
    season: number | null;
  }) => {
    if (!organizedLeagues) return;

    const allLeagues = [
      ...organizedLeagues.mainCountries.flatMap((c) => c.leagues),
      ...organizedLeagues.otherCountries.flatMap((c) => c.leagues),
    ];

    const selectedLeague = allLeagues.find(
      (l) => l.apiSportsLeagueId === leagueData.leagueId
    );

    if (selectedLeague) {
      onSelectChange({
        target: { name: "league", value: selectedLeague.name },
      } as SelectChangeEvent<string>);
      setSelectedLeagueId(leagueData.leagueId);
    }
  };

  const handleFixtureSelect = (previewId: string, fixture: DiscoverFixture) => {
    console.log("🎯 [EventBasicInfo] handleFixtureSelect CHAMADO!");
    console.log("📝 [EventBasicInfo] previewId:", previewId);
    console.log("📦 [EventBasicInfo] Fixture completo:", fixture);

    onFixtureSelect?.(previewId, fixture);
  };

  // Formatar o texto exibido no campo de partida
  const getFixtureDisplayText = () => {
    if (!newEvent.apiSportsEventId) return "";
    
    const selectedFixture = fixtures.find(
      (f) => f.apiSportsEventId?.toString() === newEvent.apiSportsEventId
    );

    if (selectedFixture) {
      return `${selectedFixture.teams.home.name} vs ${selectedFixture.teams.away.name}`;
    }

    return newEvent.apiSportsEventId;
  };

  return (
    <>
      {/* Modalidade */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Modalidade</InputLabel>
        <Select name="sport" value="Soccer" disabled label="Modalidade">
          <MenuItem value="Soccer">Futebol</MenuItem>
        </Select>
      </FormControl>

      {/* Campo de Liga (abre modal ao clicar) */}
      <TextField
        fullWidth
        margin="normal"
        label="Liga"
        value={newEvent.league || ""}
        onClick={() => setLeagueModalOpen(true)}
        placeholder="Selecione uma liga"
        InputProps={{
          readOnly: true,
        }}
        sx={{
          cursor: "pointer",
          "& .MuiInputBase-root": {
            cursor: "pointer",
          },
        }}
      />

      {/* Campo de Partida (abre modal ao clicar) */}
      <TextField
        fullWidth
        margin="normal"
        label="Partida"
        value={getFixtureDisplayText()}
        onClick={() => selectedLeagueId && setFixtureModalOpen(true)}
        placeholder={
          selectedLeagueId
            ? "Selecione uma partida"
            : "Selecione uma liga primeiro"
        }
        disabled={!selectedLeagueId || loadingFixtures}
        InputProps={{
          readOnly: true,
        }}
        sx={{
          cursor: selectedLeagueId ? "pointer" : "not-allowed",
          "& .MuiInputBase-root": {
            cursor: selectedLeagueId ? "pointer" : "not-allowed",
          },
        }}
      />

      {/* Modal de Seleção de Liga */}
      <LeagueSelectionModal
        open={leagueModalOpen}
        onClose={() => setLeagueModalOpen(false)}
        organizedLeagues={organizedLeagues}
        loading={loadingLeagues}
        error={errorLeagues}
        onSelectLeague={handleLeagueSelect}
        selectedLeagueName={newEvent.league}
      />

      {/* Modal de Seleção de Partida */}
      <FixtureSelectionModal
        open={fixtureModalOpen}
        onClose={() => setFixtureModalOpen(false)}
        fixtures={fixtures}
        loading={loadingFixtures}
        error={errorFixtures}
        onSelectFixture={handleFixtureSelect}
        selectedFixtureId={newEvent.apiSportsEventId || ""}
        disabled={!selectedLeagueId}
      />
    </>
  );
};