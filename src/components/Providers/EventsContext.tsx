import React, { createContext, useCallback } from "react";
import { getEvents } from "@/lib/api/events/eventsApi";
import { EventItem } from "@/modules/events/interfaces/EventItem";

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
  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [shouldRefetch, setShouldRefetch] = React.useState<number>(0);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
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
  }, []);

  React.useEffect(() => {
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
