import { EventItem } from "@/modules/events/interfaces/EventItem";
import apiClient from "../apiBaseUrl";

export const createEvent = async (
  eventData: Omit<EventItem, "id">,
  userId: number,
  bankId: number
) => {
  const dataWithIds = { ...eventData, userId, bankId };
  const response = await apiClient.post<EventItem>("/events", dataWithIds);
  return response.data;
};

export const getEvents = async () => {
  const response = await apiClient.get<EventItem[]>("/events");
  return response.data;
};

export const getEventById = async (id: string) => {
  const response = await apiClient.get<EventItem>(`/events/${id}`);
  return response.data;
};

export const updateEvent = async (
  id: string,
  eventData: Partial<Omit<EventItem, "id" | "userId" | "bankId">>
) => {
  const response = await apiClient.put<EventItem>(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: number | string) => {
  const response = await apiClient.delete<EventItem>(`/events/${id}`);
  return response.data;
};
