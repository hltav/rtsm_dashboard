import apiClient from "../apiBaseUrl";
import { League, NextEvents, Sport } from "./interface/theSportsDb.interface";
import { LookupEvent } from "@/modules/events/interfaces/Lookup.schema";

export const theSportsDbService = {
  async getAllSports(): Promise<Sport[]> {
    const response = await apiClient.get("/sportsdb/sports");
    return response.data.data;
  },

  async getAllLeagues(): Promise<League[]> {
    const response = await apiClient.get("/sportsdb/leagues");
    return response.data.data;
  },

  async getLeagueById(leagueId: string): Promise<League | null> {
    try {
      const response = await apiClient.get(`/sportsdb/leagues/${leagueId}`);
      console.log(response)
      return response.data?.data ?? null;
    } catch (error) {
      console.error(`Erro ao buscar liga com ID ${leagueId}:`, error);
      return null;
    }
  },

  async getNextEvents(leagueId: string): Promise<NextEvents[]> {
    const response = await apiClient.get(`/sportsdb/events/${leagueId}`);
    return response.data.data;
  },

  async getEventById(id: string): Promise<LookupEvent | null> {
    const response = await apiClient.get(`/sportsdb/event/${id}`);
    return response.data.data ?? null;
  },
};
