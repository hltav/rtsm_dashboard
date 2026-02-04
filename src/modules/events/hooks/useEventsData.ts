import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBets } from "@/lib/api/events/eventsApi";
import { FullBet } from "@/modules/events/schemas/EventItem";

export const useEventsData = () => {
  const queryClient = useQueryClient();
  return useQuery<FullBet[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const data = await getBets();
      queryClient.invalidateQueries({ queryKey: ["bankrolls"] });
      return data;
    },
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 1000 * 30,
  });
};
