import { League } from "./theSportsDb.interface";

export interface TranslatedLeague extends League {
  translatedLeague: string;
  translatedSport: string;
}

export interface SportOption {
  value: string;
  label: string;
}
