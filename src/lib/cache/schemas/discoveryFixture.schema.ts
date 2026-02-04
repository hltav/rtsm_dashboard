import { z } from "zod";

export const DiscoverTeamSchema = z.object({
  name: z.string(),
  logo: z.string().url().optional(),
});

export const DiscoverLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  flag: z.string().url().optional(),
  logo: z.string().url().url().optional(),
});

export const DiscoverFixtureSchema = z.object({
  previewId: z.string(),

  apiSportsEventId: z.number().nullable(),
  tsdbEventId: z.string().nullable(),

  league: DiscoverLeagueSchema,

  season: z.number().nullable(),
  date: z.string(), // ISO string
  status: z.string(),

  teams: z.object({
    home: DiscoverTeamSchema,
    away: DiscoverTeamSchema,
  }),

  sources: z.object({
    apiSports: z.boolean(),
    theSportsDb: z.boolean(),
  }),

  confidence: z.number().min(0).max(1),
  canRegister: z.boolean(),

  sourcePriority: z.enum(["API_SPORTS", "TSDB", "BOTH", "NONE"]),
});

export type DiscoverFixture = z.infer<typeof DiscoverFixtureSchema>;
