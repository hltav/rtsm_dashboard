// import { getEvents } from "@/lib/api/events/eventsApi";
// import { EventItem } from "@/modules/events/interfaces/EventItem";
// import { useState, useEffect } from "react";

// interface UseFetchEventsResult {
//   events: EventItem[];
//   loading: boolean;
//   error: Error | null;
//   refetch: () => void;
// }

// export const useEvents = (): UseFetchEventsResult => {
//   const [events, setEvents] = useState<EventItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [shouldRefetch, setShouldRefetch] = useState<number>(0);

//   useEffect(() => {
//     const callEvents = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await getEvents();
//         setEvents(data);
//       } catch (err) {
//         console.error("Erro ao buscar eventos:", err);
//         setError(
//           err instanceof Error
//             ? err
//             : new Error("Ocorreu um erro desconhecido.")
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     callEvents();
//   }, [shouldRefetch]);

//   const refetch = () => {
//     setShouldRefetch((prev) => prev + 1);
//   };

//   return { events, loading, error, refetch };
// };

// hooks/useEventsContext.ts
import { EventsContext } from "@/components/Providers/EventsContext";
import { useContext } from "react";

export const useEventsContext = () => {
  const context = useContext(EventsContext);

  if (context === undefined) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }

  return context;
};
