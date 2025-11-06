import { EventsContext } from "@/components/Providers/EventsContext";
import { useContext } from "react";

export const useEventsContext = () => {
  const context = useContext(EventsContext);

  if (context === undefined) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }

  return context;
};
