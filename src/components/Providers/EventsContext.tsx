"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { getEvents } from "@/lib/api/events/eventsApi";
import { useResultUpdater } from "@/hooks/useResultUpdater";
import { useAuth } from "@/components/Providers/AuthContext";
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

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState<number>(0);

  const { updateAllResults } = useResultUpdater();

  const fetchEvents = useCallback(async () => {
    if (!userId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await updateAllResults();

      const data = await getEvents();
      const filtered = data.filter((e) => e.userId === userId);

      setEvents(filtered);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
      setError(err instanceof Error ? err : new Error("Ocorreu um erro."));
    } finally {
      setLoading(false);
    }
  }, [updateAllResults, userId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, shouldRefetch]);

  const refetch = useCallback(() => {
    setShouldRefetch((prev) => prev + 1);
  }, []);

  return (
    <EventsContext.Provider value={{ events, loading, error, refetch }}>
      {children}
    </EventsContext.Provider>
  );
};
