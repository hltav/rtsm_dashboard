import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents } from "@/lib/api/events/eventsApi";
import { EventItem } from "@/modules/events/schemas/EventItem";

export const useEventsData = () => {
  const queryClient = useQueryClient();
  return useQuery<EventItem[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const data = await getEvents();
      queryClient.invalidateQueries({ queryKey: ["bankrolls"] });
      return data;
    },
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 1000 * 30,
  });
};
