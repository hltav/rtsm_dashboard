"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { getEvents } from "@/lib/api/events/eventsApi";
import { useResultUpdater } from "@/hooks/useResultUpdater";
import { EventItem } from "@/modules/events/schemas/EventItem";

interface EventsContextType {
  events: EventItem[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const EventsContext = createContext<EventsContextType | undefined>(
  undefined
);

interface EventsProviderProps {
  children: React.ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState<number>(0);

  const { updateAllResults } = useResultUpdater();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await updateAllResults();
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
      setError(
        err instanceof Error ? err : new Error("Ocorreu um erro desconhecido.")
      );
    } finally {
      setLoading(false);
    }
  }, [updateAllResults]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, shouldRefetch]);

  const refetch = useCallback(() => {
    setShouldRefetch((prev) => prev + 1);
  }, []);

  const value: EventsContextType = {
    events,
    loading,
    error,
    refetch,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};
