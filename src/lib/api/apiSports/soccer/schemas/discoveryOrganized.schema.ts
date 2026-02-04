import { z } from "zod";

// Schema de validação
export const GetOrganizedLeaguesDtoSchema = z.object({
  season: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "current" || !isNaN(Number(val)),
      'Season must be "current" or a valid number'
    ),

  refresh: z.preprocess((val) => val === "true" || val === true, z.boolean()),
});

// Tipo inferido do schema
export type GetOrganizedLeaguesDto = z.infer<
  typeof GetOrganizedLeaguesDtoSchema
>;

// 🟢 Tipos auxiliares
export const LeagueSourcesSchema = z.object({
  apiSports: z.boolean(),
  theSportsDb: z.boolean(),
});

export const OrganizedLeagueSchema = z.object({
  previewId: z.string(),
  apiSportsLeagueId: z.number(),
  tsdbLeagueId: z.string().optional(),
  name: z.string(),
  country: z.string(),
  logo: z.string(),
  flag: z.string(),
  season: z.number(),
  isCurrent: z.boolean(),
  highlighted: z.boolean(),
  seasonRange: z.string(),
  hasFixtures: z.boolean(),
  hasStandings: z.boolean(),
  hasOdds: z.boolean(),
  sources: LeagueSourcesSchema,
  confidence: z.number(),
  sourcePriority: z.enum(["API_SPORTS", "THE_SPORTS_DB", "BOTH"]),
});

export const OrganizedCountrySchema = z.object({
  country: z.string(),
  flag: z.string(),
  leagues: z.array(OrganizedLeagueSchema),
  leagueCount: z.number().optional(), // aparece em otherCountries
});

// 🔵 Resposta completa da rota
export const OrganizedLeaguesResponseSchema = z.object({
  mainCountries: z.array(OrganizedCountrySchema),
  otherCountries: z.array(OrganizedCountrySchema),
});

// 🟣 Tipos inferidos
export type LeagueSources = z.infer<typeof LeagueSourcesSchema>;
export type OrganizedLeague = z.infer<typeof OrganizedLeagueSchema>;
export type OrganizedCountry = z.infer<typeof OrganizedCountrySchema>;
export type OrganizedLeaguesResponse = z.infer<
  typeof OrganizedLeaguesResponseSchema
>;
