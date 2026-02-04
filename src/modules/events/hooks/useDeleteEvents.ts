import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBet } from "@/lib/api/events/eventsApi";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => deleteBet(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["bankrolls"] });
    },
  });
};
