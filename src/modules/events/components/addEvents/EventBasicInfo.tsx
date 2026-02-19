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
          "current",
        );
        const now = new Date();

        const normalizedData = data
          .filter((fixture) => new Date(fixture.date) > now) // 👈 filtra aqui
          .map((fixture) => ({
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
      (l) => l.apiSportsLeagueId === leagueData.leagueId,
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
      (f) => f.apiSportsEventId?.toString() === newEvent.apiSportsEventId,
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

      {/* Campo de Liga (abre modal LeagueSelectionModal ao clicar) */}
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

      {/* Campo de Partida (abre modal FixtureSelectionModal ao clicar) */}
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
