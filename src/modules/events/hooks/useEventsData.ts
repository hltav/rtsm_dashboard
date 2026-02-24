import { useQuery } from "@tanstack/react-query";
import { getBets } from "@/lib/api/events/eventsApi";
import { FullBet } from "@/modules/events/schemas/EventItem";

export const useEventsData = () => {
  return useQuery<FullBet[]>({
    queryKey: ["events"],
    queryFn: getBets,
    refetchInterval: 5 * 60 * 1000,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
