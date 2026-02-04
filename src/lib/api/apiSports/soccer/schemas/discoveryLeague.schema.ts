import { z } from "zod";

export const DiscoverLeagueSchema = z.object({
  previewId: z.string(),

  apiSportsLeagueId: z.number(),
  tsdbLeagueId: z.string().optional(),

  name: z.string(),
  country: z.string(),

  logo: z.string().url().optional().or(z.literal("")),
  flag: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .describe("URL da bandeira do país"),
  badge: z.string().url().optional().or(z.literal("")),
  banner: z.string().url().optional().or(z.literal("")),

  season: z.number(),
  isCurrent: z.boolean().optional(),
  seasonRange: z.string().optional(),

  hasFixtures: z.boolean(),
  hasStandings: z.boolean(),
  hasOdds: z.boolean(),

  highlighted: z.boolean(),

  sources: z.object({
    apiSports: z.boolean(),
    theSportsDb: z.boolean(),
  }),

  confidence: z.number(),
  sourcePriority: z.enum(["API_SPORTS", "TSDB", "BOTH"]),
});

export type DiscoverLeague = z.infer<typeof DiscoverLeagueSchema>;
