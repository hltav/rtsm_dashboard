import { EventItem } from "@/modules/events/interfaces/EventItem";
import { apiEventsFetch } from "./apiEventsFetch";

export const createEvent = async (
  eventData: Omit<EventItem, "id">,
  userId: number,
  bankId: number
) => {
  const dataWithIds = { ...eventData, userId, bankId };
  return apiEventsFetch<EventItem>({
    endpoint: "/",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataWithIds),
  });
};

export const getEvents = async () => {
  return apiEventsFetch<EventItem[]>({
    endpoint: "/",
    method: "GET",
  });
};

export const getEventById = async (id: string) => {
  return apiEventsFetch<EventItem>({
    endpoint: `/${id}`,
    method: "GET",
  });
};

export const updateEvent = async (
  id: string,
  eventData: Partial<Omit<EventItem, "id" | "userId" | "bankId">>
) => {
  return apiEventsFetch<EventItem>({
    endpoint: `/${id}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
};

export const deleteEvent = async (id: string) => {
  return apiEventsFetch<EventItem>({
    endpoint: `/${id}`,
    method: "DELETE",
  });
};