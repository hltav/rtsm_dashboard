import apiClient from "../apiBaseUrl";

export type LeagueSource = "APIFOOTBALL" | "THESPORTSDB" | "INTERNAL";

export type LogoSource = "LOCAL" | "EXTERNAL";

export type FavoriteLeaguePayload = {
  sport: string;
  source: LeagueSource;
  externalId: string;
  leagueName: string;
  country: string;
  leagueLogo?: string;
  leagueLogoSource?: LogoSource | null;
};

export type UserFavoriteLeague = {
  id: number;
  userId: number;
  sport: string;
  source: LeagueSource;
  externalId: string;
  leagueName: string;
  country: string;
  leagueLogo: string | null;
  createdAt: string;
  updatedAt: string;
};

const BASE_PATH = "/leagues/favorites";

export const favoriteLeaguesApi = {
  async getFavorites(sport?: string): Promise<UserFavoriteLeague[]> {
    const response = await apiClient.get<UserFavoriteLeague[]>(BASE_PATH, {
      params: sport ? { sport } : undefined,
    });

    return response.data;
  },

  async addFavorite(
    payload: FavoriteLeaguePayload,
  ): Promise<UserFavoriteLeague> {
    const response = await apiClient.post<UserFavoriteLeague>(
      BASE_PATH,
      payload,
    );

    return response.data;
  },

  async removeFavorite(payload: {
    sport: string;
    source: LeagueSource;
    externalId: string;
  }): Promise<{ deleted: boolean }> {
    const response = await apiClient.delete<{ deleted: boolean }>(BASE_PATH, {
      params: payload,
    });

    return response.data;
  },

  async checkFavorite(payload: {
    sport: string;
    source: LeagueSource;
    externalId: string;
  }): Promise<{ isFavorite: boolean }> {
    const response = await apiClient.get<{ isFavorite: boolean }>(
      `${BASE_PATH}/check`,
      {
        params: payload,
      },
    );

    return response.data;
  },

  async toggleFavorite(
    payload: FavoriteLeaguePayload,
  ): Promise<{
    action: "added" | "removed";
    favorite: UserFavoriteLeague | null;
  }> {
    const response = await apiClient.post<{
      action: "added" | "removed";
      favorite: UserFavoriteLeague | null;
    }>(`${BASE_PATH}/toggle`, payload);

    return response.data;
  },
};
