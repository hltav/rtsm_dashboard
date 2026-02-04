"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { FullBet } from "@/modules/events/schemas/EventItem";
import { getBets } from "@/lib/api/events/eventsApi";
import { useAuth } from "./AuthContext";

interface EventsContextType {
  events: FullBet[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const EventsContext = createContext<EventsContextType | undefined>(
  undefined,
);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<FullBet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getBets();
      setEvents(data);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
      setError(err instanceof Error ? err : new Error("Ocorreu um erro."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchEvents();
  }, [isAuthenticated, fetchEvents]);

  const refetch = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <EventsContext.Provider value={{ events, loading, error, refetch }}>
      {children}
    </EventsContext.Provider>
  );
};
