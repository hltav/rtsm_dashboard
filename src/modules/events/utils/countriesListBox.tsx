import { forwardRef, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SafeImage } from "@/components/images/SafeImage";
import {
  OrganizedCountry,
  OrganizedLeaguesResponse,
} from "@/lib/api/apiSports/soccer/schemas/discoveryOrganized.schema";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { CONTINENT_ICONS } from "../types/countryTypes";
import { FavoriteLeagueButton } from "../ui/favorateButton";
import { useFavorateLeagues } from "../hooks/useFavorateLeagues";

export const CountriesListBox = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLElement> & {
    data: OrganizedLeaguesResponse;
    onSelectLeague: (league: {
      leagueId: number;
      season: number | null;
    }) => void;
  }
>(function CountriesListbox(props, ref) {
  const { data, onSelectLeague, ...other } = props;

  const [openCountries, setOpenCountries] = useState<Record<string, boolean>>(
    {},
  );
  const { favoriteLeagueIds, toggleFavoriteLeague } = useFavorateLeagues();

  const toggleCountry = (country: string) => {
    setOpenCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  const allCountries = useMemo(
    () => [...data.mainCountries, ...data.otherCountries],
    [data.mainCountries, data.otherCountries],
  );

  const favoriteLeaguesList = useMemo(
    () =>
      allCountries
        .flatMap((country) => country.leagues)
        .filter((league) => favoriteLeagueIds.has(league.apiSportsLeagueId)),
    [allCountries, favoriteLeagueIds],
  );

  const renderCountryGroup = (group: OrganizedCountry) => {
    const isContinent = Boolean(CONTINENT_ICONS[group.country]);
    const iconSrc = CONTINENT_ICONS[group.country] || group.flag || "";

    return (
      <Box key={group.country} component="li" sx={{ mb: 0.5 }}>
        <Box
          onClick={() => toggleCountry(group.country)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            borderRadius: 1,
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: isContinent ? 0 : "50%",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SafeImage
                src={iconSrc}
                alt={group.country}
                width={24}
                height={24}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: isContinent ? "contain" : "cover",
                }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "text.primary" }}
            >
              {group.country}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", mr: 1 }}
            >
              {group.leagueCount}
            </Typography>
            {openCountries[group.country] ? (
              <ExpandLess fontSize="small" sx={{ color: "text.disabled" }} />
            ) : (
              <ExpandMore fontSize="small" sx={{ color: "text.disabled" }} />
            )}
          </Box>
        </Box>

        {openCountries[group.country] && (
          <Box sx={{ mt: 0.5, mb: 1.5 }}>
            {group.leagues.map((league) => (
              <Box
                key={league.previewId}
                onClick={() =>
                  onSelectLeague({
                    leagueId: league.apiSportsLeagueId,
                    season: league.season,
                  })
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pl: 5,
                  pr: 1,
                  py: 0.8,
                  cursor: "pointer",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "action.selected",
                    "& .pin-icon": { opacity: 1 },
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {league.logo && (
                    <SafeImage
                      src={league.logo}
                      alt={`Logo da ${league.name}`}
                      width={20}
                      height={20}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {league.name}
                  </Typography>
                </Box>

                <FavoriteLeagueButton
                  className="pin-icon"
                  isFavorite={favoriteLeagueIds.has(league.apiSportsLeagueId)}
                  onToggle={(e) => {
                    e.stopPropagation(); // segurança extra
                    toggleFavoriteLeague(league);
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      component="ul"
      ref={ref}
      {...other}
      sx={{
        listStyle: "none",
        p: 1,
        m: 0,
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      {favoriteLeaguesList.length > 0 && (
        <>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <StarRoundedIcon sx={{ color: "secondary.dark" }} />
            <Typography
              variant="overline"
              sx={{
                px: 1,
                color: "text.primary",
                fontWeight: "bold",
                display: "block",
                mb: 1,
              }}
            >
              FAVORITAS
            </Typography>
          </Box>

          {favoriteLeaguesList.map((league) => (
            <Box
              key={league.previewId}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 2,
                pr: 1,
                py: 0.8,
                cursor: "pointer",
                borderRadius: 1,
                "&:hover": { backgroundColor: "action.selected" },
              }}
              onClick={() =>
                onSelectLeague({
                  leagueId: league.apiSportsLeagueId,
                  season: league.season,
                })
              }
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {league.logo && (
                  <SafeImage
                    src={league.logo}
                    alt={`Logo da ${league.name}`}
                    width={20}
                    height={20}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                )}
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {league.name}
                </Typography>
              </Box>

              <FavoriteLeagueButton
                isFavorite={favoriteLeagueIds.has(league.apiSportsLeagueId)}
                onToggle={(e) => {
                  e.stopPropagation(); // segurança extra
                  toggleFavoriteLeague(league);
                }}
              />
            </Box>
          ))}

          <Box
            sx={{ my: 2, borderBottom: "1px solid", borderColor: "divider" }}
          />
        </>
      )}

      <Typography
        variant="overline"
        sx={{
          px: 1,
          color: "text.primary",
          fontWeight: "bold",
          display: "block",
          mb: 1,
        }}
      >
        PRINCIPAIS
      </Typography>
      {data.mainCountries.map(renderCountryGroup)}

      <Box sx={{ my: 2, borderBottom: "1px solid", borderColor: "divider" }} />

      <Typography
        variant="overline"
        sx={{
          px: 1,
          color: "text.disabled",
          fontWeight: "bold",
          display: "block",
          mb: 1,
        }}
      >
        A-Z
      </Typography>
      {data.otherCountries.map(renderCountryGroup)}
    </Box>
  );
});
