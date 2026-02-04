import { z } from "zod";

export const CountryWidgetItemSchema = z.object({
  previewId: z.string(),
  apiSportsLeagueId: z.number(),
  tsdbLeagueId: z.string(),
  name: z.string(),
  country: z.string(),
  logo: z.string(),
  flag: z.string().nullable(),
  season: z.number(),
  isCurrent: z.boolean(),
  highlighted: z.boolean(),
  seasonRange: z.string(),
  hasFixtures: z.boolean(),
  hasStandings: z.boolean(),
  hasOdds: z.boolean(),
  sources: z.object({
    apiSports: z.boolean(),
    theSportsDb: z.boolean(),
  }),
  confidence: z.number(),
  sourcePriority: z.string(),
});

export type CountryWidgetItemDTO = z.infer<typeof CountryWidgetItemSchema>;
