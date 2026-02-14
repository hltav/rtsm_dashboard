import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FavoriteLeaguePayload,
  favoriteLeaguesApi,
  LeagueSource,
} from "@/lib/api/events/favoriteLeaguesApi";
import { OrganizedLeague } from "@/lib/api/apiSports/soccer/schemas/discoveryOrganized.schema";
import { inferLogoSource } from "../functions/inferLogoSource";

const SPORT = "Soccer";
const SOURCE: LeagueSource = "APIFOOTBALL";
const STORAGE_KEY = "rtsm:favorites:soccer:apisports";

type UseFavorateLeaguesReturn = {
  favoriteLeagueIds: Set<number>;
  isLoading: boolean;
  toggleFavoriteLeague: (league: OrganizedLeague) => Promise<void>;
  isFavoriteLeague: (leagueId: number) => boolean;
};

const readFromStorage = (): Set<number> => {
  if (typeof window === "undefined") return new Set<number>();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set<number>();

    const parsed = JSON.parse(raw) as number[];

    return new Set(parsed.filter((id) => Number.isFinite(id)));
  } catch (error) {
    console.error("Erro ao ler favoritos do localStorage:", error);
    return new Set<number>();
  }
};

const persistToStorage = (favoriteIds: Set<number>) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteIds]));
  } catch (error) {
    console.error("Erro ao salvar favoritos no localStorage:", error);
  }
};

const toPayload = (league: OrganizedLeague): FavoriteLeaguePayload => {
  const logo = league.logo || undefined;
  const leagueLogoSource = inferLogoSource(logo);

  return {
    sport: SPORT,
    source: SOURCE,
    externalId: String(league.apiSportsLeagueId),
    leagueName: league.name,
    country: league.country,
    leagueLogo: logo,
    leagueLogoSource, // ✅ agora vai junto
  };
};

export const useFavorateLeagues = (): UseFavorateLeaguesReturn => {
  const [favoriteLeagueIds, setFavoriteLeagueIds] = useState<Set<number>>(
    new Set(),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const hydrateFavorites = async () => {
      const localFavorites = readFromStorage();

      if (active) {
        setFavoriteLeagueIds(localFavorites);
      }

      try {
        const serverFavorites = await favoriteLeaguesApi.getFavorites(SPORT);

        if (!active) return;

        const apiSportsIds = serverFavorites
          .filter((favorite) => favorite.source === SOURCE)
          .map((favorite) => Number(favorite.externalId))
          .filter((id) => Number.isFinite(id));

        const merged = new Set([...localFavorites, ...apiSportsIds]);
        setFavoriteLeagueIds(merged);
        persistToStorage(merged);
      } catch (error) {
        if (active) {
          console.error("Erro ao carregar favoritos do backend:", error);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    hydrateFavorites();

    return () => {
      active = false;
    };
  }, []);

  const isFavoriteLeague = useCallback(
    (leagueId: number) => favoriteLeagueIds.has(leagueId),
    [favoriteLeagueIds],
  );

  const toggleFavoriteLeague = useCallback(async (league: OrganizedLeague) => {
    const leagueId = league.apiSportsLeagueId;
    const payload = toPayload(league);

    let action: "add" | "remove" = "add";

    setFavoriteLeagueIds((prev) => {
      const next = new Set(prev);

      if (prev.has(leagueId)) {
        next.delete(leagueId);
        action = "remove";
      } else {
        next.add(leagueId);
        action = "add";
      }

      persistToStorage(next);
      return next;
    });

    try {
      if (action === "add") {
        await favoriteLeaguesApi.addFavorite(payload);
      } else {
        await favoriteLeaguesApi.removeFavorite({
          sport: payload.sport,
          source: payload.source,
          externalId: payload.externalId,
        });
      }
    } catch {
      // Rollback
      setFavoriteLeagueIds((prev) => {
        const rollback = new Set(prev);

        if (action === "add") {
          rollback.delete(leagueId);
        } else {
          rollback.add(leagueId);
        }

        persistToStorage(rollback);
        return rollback;
      });
    }
  }, []);

  return useMemo(
    () => ({
      favoriteLeagueIds,
      isLoading,
      toggleFavoriteLeague,
      isFavoriteLeague,
    }),
    [favoriteLeagueIds, isFavoriteLeague, isLoading, toggleFavoriteLeague],
  );
};
