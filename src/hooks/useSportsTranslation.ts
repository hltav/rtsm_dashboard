import { League } from "@/lib/api/theSportsDb/interface/theSportsDb.interface";
import {
  SportOption,
  TranslatedLeague,
} from "@/lib/api/theSportsDb/interface/translate.interface";
import { translateLeague } from "@/utils/leaguesMap";
import { translateSport } from "@/utils/sportsMap";

export const useSportsTranslation = () => {
  const getTranslatedSportsList = (sports: string[]): SportOption[] => {
    return sports.map((sport) => ({
      value: sport,
      label: translateSport(sport),
    }));
  };

  const getTranslatedLeaguesList = (leagues: League[]): TranslatedLeague[] => {
    return leagues.map((league) => ({
      ...league,
      translatedLeague: translateLeague(league.strLeague),
      translatedSport: translateSport(league.strSport),
    }));
  };

  const getSportsForSelect = (leaguesData: League[]): SportOption[] => {
    const uniqueSports = [...new Set(leaguesData.map((item) => item.strSport))];
    return getTranslatedSportsList(uniqueSports);
  };

  return {
    translateSport,
    translateLeague,
    getTranslatedSportsList,
    getTranslatedLeaguesList,
    getSportsForSelect,
  };
};
