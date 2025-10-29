import apiClient from "../../apiBaseUrl";

export const soccerApi = {
  // 🟢 Buscar partidas ao vivo
  async getLiveMatches() {
    const response = await apiClient.get("/soccer/live");
    return response.data;
  },

  // 🏆 Buscar ligas
  async getLeagues() {
    const response = await apiClient.get("/soccer/leagues");
    return response.data;
  },

  // ⚽ Buscar times de uma liga em uma temporada específica
  async getTeams(leagueId: number, season: number) {
    const response = await apiClient.get("/soccer/teams", {
      params: { leagueId, season },
    });
    return response.data;
  },

  // 📊 Buscar classificação (standings)
  async getStandings(leagueId: number, season: number) {
    const response = await apiClient.get("/soccer/standings", {
      params: { leagueId, season },
    });
    return response.data;
  },
};
