// import { useState, useEffect } from "react";
// import {
//   League,
//   NextEvents,
//   Sport,
// } from "@/lib/api/theSportsDb/interface/theSportsDb.interface";
// import { theSportsDbService } from "@/lib/api/theSportsDb/apiTheSportsDb";

// type TheSportsDbData = Sport[] | League[] | NextEvents[];

// interface UseTheSportsDbResult<T> {
//   data: T;
//   loading: boolean;
//   error: Error | null;
//   refetch: () => void;
// }

// type FetchType = "sports" | "leagues" | "events";

// export const useTheSportsDb = (
//   fetchType: FetchType,
//   leagueId?: string
// ): UseTheSportsDbResult<TheSportsDbData> => {
//   const [data, setData] = useState<TheSportsDbData>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [shouldRefetch, setShouldRefetch] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         let response: TheSportsDbData = [];

//         switch (fetchType) {
//           case "sports":
//             response = await theSportsDbService.getAllSports();
//             break;

//           case "leagues":
//             response = await theSportsDbService.getAllLeagues();
//             break;

//           case "events":
//             if (!leagueId)
//               throw new Error(
//                 "É necessário fornecer leagueId para buscar eventos."
//               );
//             response = await theSportsDbService.getNextEvents(leagueId);
//             break;

//           default:
//             throw new Error("Tipo de busca inválido para useTheSportsDb.");
//         }

//         setData(response);
//       } catch (err) {
//         console.error("Erro ao buscar dados do TheSportsDb:", err);
//         setError(
//           err instanceof Error
//             ? err
//             : new Error("Ocorreu um erro desconhecido.")
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [fetchType, leagueId, shouldRefetch]);

//   const refetch = () => {
//     setShouldRefetch((prev) => prev + 1);
//   };

//   return { data, loading, error, refetch };
// };

import { useState, useEffect } from "react";
import {
  League,
  NextEvents,
  Sport,
} from "@/lib/api/theSportsDb/interface/theSportsDb.interface";
import { theSportsDbService } from "@/lib/api/theSportsDb/apiTheSportsDb";

type TheSportsDbData = Sport[] | League[] | NextEvents[];

interface UseTheSportsDbResult<T> {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

type FetchType = "sports" | "leagues" | "events";

export const useTheSportsDb = (
  fetchType: FetchType,
  leagueId?: string
): UseTheSportsDbResult<TheSportsDbData> => {
  const [data, setData] = useState<TheSportsDbData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let response: TheSportsDbData = [];

        switch (fetchType) {
          case "sports":
            response = await theSportsDbService.getAllSports();
            break;

          case "leagues":
            response = await theSportsDbService.getAllLeagues();
            break;

          case "events":
            // ✅ Só faz a requisição se tiver leagueId
            if (!leagueId) {
              setLoading(false);
              return; // Não lança erro, apenas aguarda o leagueId
            }
            response = await theSportsDbService.getNextEvents(leagueId);
            break;

          default:
            throw new Error("Tipo de busca inválido para useTheSportsDb.");
        }

        setData(response);
      } catch (err) {
        console.error("Erro ao buscar dados do TheSportsDb:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Ocorreu um erro desconhecido.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchType, leagueId, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch((prev) => prev + 1);
  };

  return { data, loading, error, refetch };
};
