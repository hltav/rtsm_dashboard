import { z } from "zod";

export const DiscoverFixtureSchema = z.object({
  previewId: z.string(),

  apiSportsEventId: z.number().nullable(),
  tsdbEventId: z.string().nullable(),

  league: z.object({
    id: z.number(),
    name: z.string(),
    flag: z.string().nullable().optional(),
    logo: z.string().nullable().optional(),
  }),

  season: z.number().nullable(),
  date: z.string(),
  status: z.string(),

  teams: z.object({
    home: z.object({
      name: z.string(),
      logo: z.string().nullable().optional(),
    }),
    away: z.object({
      name: z.string(),
      logo: z.string().nullable().optional(),
    }),
  }),

  sources: z.object({
    apiSports: z.boolean(),
    theSportsDb: z.boolean(),
  }),

  confidence: z.number(),
  canRegister: z.boolean(),

  sourcePriority: z.enum(["API_SPORTS", "TSDB", "BOTH", "NONE"]),
});

export type DiscoverFixture = z.infer<typeof DiscoverFixtureSchema>;
