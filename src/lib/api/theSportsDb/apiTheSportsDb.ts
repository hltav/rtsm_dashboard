import apiClient from "../apiBaseUrl";
import { League, NextEvents, Sport } from "./interface/theSportsDb.interface";

export const theSportsDbService = {
  async getAllSports(): Promise<Sport[]> {
    const response = await apiClient.get("/sportsdb/sports");
    return response.data.data;
  },

  async getAllLeagues(): Promise<League[]> {
    const response = await apiClient.get("/sportsdb/leagues");
    return response.data.data;
  },

  async getNextEvents(leagueId: number): Promise<NextEvents[]> {
    const response = await apiClient.get(`/sportsdb/events/${leagueId}`);
    return response.data.data;
  },
};
