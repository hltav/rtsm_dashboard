import { FullEvent } from "../schemas/EventItem";

export const initialEventState: Omit<FullEvent, "id"> = {
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
  apiEventId: null,
  homeTeam: null,
  awayTeam: null,
  eventDate: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};
