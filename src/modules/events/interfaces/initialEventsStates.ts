import { EventItem } from "./EventItem";

export const initialEventState: Omit<EventItem, "id"> = {
  bankId: 0,
  modality: "",
  eventType: "",
  league: "",
  event: "",
  market: "",
  marketCategory: "",
  marketSub: "",
  optionMarket: "",
  amount: 0,
  odd: "",
  result: "pending",
  userId: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};