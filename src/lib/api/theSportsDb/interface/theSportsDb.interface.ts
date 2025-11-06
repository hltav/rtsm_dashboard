import { z } from "zod";

const nullableUrl = z.preprocess(
  (val) => (typeof val === "string" && val.trim() ? val : null),
  z.string().url().nullable()
);

const nullableNumber = z.preprocess(
  (val) =>
    val === null || val === undefined || val === ""
      ? null
      : typeof val === "number"
      ? val
      : Number(val),
  z.number().nullable()
);

export const SportSchema = z.object({
  idSport: z.string(),
  strSport: z.string(),
  strFormat: z.string().nullable().optional(),
  strSportThumb: nullableUrl.optional(),
  strSportIconGreen: nullableUrl.optional(),
});

export type Sport = z.infer<typeof SportSchema>;

export const LeagueSchema = z.object({
  idLeague: z.string(),
  strLeague: z.string(),
  strSport: z.string(),
  strBadge: z.string().nullable(),
  strLogo: nullableUrl.optional(),
  strCountry: z.string().nullable().optional(),
  strDescriptionEN: z.string().nullable().optional(),
});

export type League = z.infer<typeof LeagueSchema>;

export const EventSchema = z.object({
  idEvent: z.string(),
  strEvent: z.string(),
  strSport: z.string(),
  idLeague: z.string(),
  strLeague: z.string(),
  strHomeTeam: z.string().nullable().optional(),
  strAwayTeam: z.string().nullable().optional(),
  intHomeScore: nullableNumber.optional(),
  intAwayScore: nullableNumber.optional(),
  dateEvent: z.string().nullable().optional(),
  strTimeLocal: z.string().nullable().optional(),
  strStatus: z.string().nullable().optional(),
  strThumb: nullableUrl.optional(),
  strPoster: nullableUrl.optional(),
  strVenue: z.string().nullable().optional(),
  idHomeTeam: z.string().nullable().optional(),
  idAwayTeam: z.string().nullable().optional(),
  strHomeTeamBadge: nullableUrl.optional(),
  strAwayTeamBadge: nullableUrl.optional(),
});

export type NextEvents = z.infer<typeof EventSchema>;
