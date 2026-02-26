import apiClient from "../../apiBaseUrl";
import { DiscoverFixture } from "./schemas/discoveryFixture.schema";
// import { DiscoverLeague } from "./schemas/discoveryLeague.schema";
import { OrganizedLeaguesResponse } from "./schemas/discoveryOrganized.schema";

export const soccerApi = {
  // 🏆 Buscar ligas (current | season específica)
  // async getLeagues(season?: string): Promise<DiscoverLeague[]> {
  //   const response = await apiClient.get("/soccer/discovery/leagues", {
  //     params: season ? { season } : undefined,
  //   });

  //   console.log("Ligas recebidas da API:", response.data);
  //   return response.data;
  // },

  // ⚽ Buscar próximas partidas de uma liga
  async getNextFixtures(
    leagueId: number,
    next = 10,
    season?: number | "current",
  ): Promise<DiscoverFixture[]> {
    const response = await apiClient.get("/soccer/discovery/next-fixtures", {
      params: {
        league: leagueId,
        next,
        ...(season ? { season } : {}),
      },
    });

    return response.data;
  },

  // 🟢 Buscar temporada atual de uma liga
  async getCurrentSeason(
    leagueId: number,
  ): Promise<{ league: number; currentSeason: number | null }> {
    const response = await apiClient.get("/soccer/discovery/current-season", {
      params: { league: leagueId },
    });

    return response.data;
  },

  async getOrganizedLeagues(
    scope?: "current" | "all",
    refresh = false,
  ): Promise<OrganizedLeaguesResponse> {
    const response = await apiClient.get(
      "/soccer/discovery/leagues/organized",
      {
        params: {
          ...(scope ? { scope } : {}),
          refresh,
        },
      },
    );

    console.log("Ligas organizadas recebidas da API:", response.data);
    return response.data;
  },
};
