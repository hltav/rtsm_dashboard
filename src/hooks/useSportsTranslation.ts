// import { League } from "@/lib/api/theSportsDb/interface/theSportsDb.interface";
// import {
//   SportOption,
//   TranslatedLeague,
// } from "@/lib/api/theSportsDb/interface/translate.interface";
// import { translateLeague } from "@/utils/leaguesMap";
// import { translateSport } from "@/utils/sportsMap";

// export const useSportsTranslation = () => {
//   const getTranslatedSportsList = (sports: string[]): SportOption[] => {
//     return sports.map((sport) => ({
//       value: sport,
//       label: translateSport(sport),
//     }));
//   };

//   const getTranslatedLeaguesList = (leagues: League[]): TranslatedLeague[] => {
//     return leagues.map((league) => ({
//       ...league,
//       translatedLeague: translateLeague(league.strLeague),
//       translatedSport: translateSport(league.strSport),
//     }));
//   };

//   const getSportsForSelect = (leaguesData: League[]): SportOption[] => {
//     const uniqueSports = [...new Set(leaguesData.map((item) => item.strSport))];
//     return getTranslatedSportsList(uniqueSports);
//   };

//   return {
//     translateSport,
//     translateLeague,
//     getTranslatedSportsList,
//     getTranslatedLeaguesList,
//     getSportsForSelect,
//   };
// };

import { League } from "@/lib/api/theSportsDb/interface/theSportsDb.interface";
import {
  SportOption,
  TranslatedLeague,
} from "@/lib/api/theSportsDb/interface/translate.interface";
import { translateLeague, leagueTranslations } from "@/utils/leaguesMap";
import { translateSport } from "@/utils/sportsMap";

export const useSportsTranslation = () => {
  const leagueOrder = Object.keys(leagueTranslations);

  const getTranslatedSportsList = (sports: string[]): SportOption[] => {
    return sports.map((sport) => ({
      value: sport,
      label: translateSport(sport),
    }));
  };

  const getTranslatedLeaguesList = (leagues: League[]): TranslatedLeague[] => {
    const translated = leagues.map((league) => ({
      ...league,
      translatedLeague: translateLeague(league.strLeague).name,
      translatedSport: translateSport(league.strSport),
    }));

    // Ordena conforme a ordem do objeto leagueTranslations
    return translated.sort((a, b) => {
      const indexA = leagueOrder.indexOf(a.strLeague);
      const indexB = leagueOrder.indexOf(b.strLeague);

      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
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
