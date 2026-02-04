import z from "zod";
import { CreateBetSchema } from "../schemas/CreateBetPlay.schema";

export type CreateBetFormState = z.input<typeof CreateBetSchema>;

export const initialCreateBetState: CreateBetFormState = {
  bankrollId: 0,
  sport: "",
  league: "",
  eventDescription: "",
  eventDate: null,
  homeTeam: null,
  awayTeam: null,
  market: "",
  marketCategory: "",
  marketSub: null,
  selection: "",
  odd: "",
  stake: "",
  unitValue: "1",
  externalMatchId: null,
  apiSportsEventId: null,
  tsdbEventId: null,
  confidence: null,
  notes: null,
  tags: [],
};
