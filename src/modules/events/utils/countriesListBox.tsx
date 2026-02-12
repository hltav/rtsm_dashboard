// import { forwardRef, useState } from "react";
// import { Box, Typography, IconButton } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { SafeImage } from "@/components/images/SafeImage";
// import {
//   OrganizedCountry,
//   OrganizedLeaguesResponse,
// } from "@/lib/api/apiSports/soccer/schemas/discoveryOrganized.schema";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";
// import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
// import { CONTINENT_ICONS } from "../types/countryTypes";

// export const CountriesListBox = forwardRef<
//   HTMLUListElement,
//   React.HTMLAttributes<HTMLElement> & {
//     data: OrganizedLeaguesResponse;
//     onSelectLeague: (league: {
//       leagueId: number;
//       season: number | null;
//     }) => void;
//   }
// >(function CountriesListbox(props, ref) {
//   const { data, onSelectLeague, ...other } = props;

//   // Estados locais para UI e favoritos
//   const [openCountries, setOpenCountries] = useState<Record<string, boolean>>(
//     {},
//   );
//   const [favoriteLeagues, setFavoriteLeagues] = useState<Set<number>>(
//     new Set(),
//   );

//   const toggleCountry = (country: string) => {
//     setOpenCountries((prev) => ({ ...prev, [country]: !prev[country] }));
//   };

//   const toggleFavoriteLeague = (e: React.MouseEvent, leagueId: number) => {
//     e.stopPropagation();
//     setFavoriteLeagues((prev) => {
//       const newFavs = new Set(prev);
//       if (newFavs.has(leagueId)) {
//         newFavs.delete(leagueId);
//       } else {
//         newFavs.add(leagueId);
//       }
//       return newFavs;
//     });
//   };

//   const renderCountryGroup = (group: OrganizedCountry) => (

//     <Box key={group.country} component="li" sx={{ mb: 0.5 }}>
//       {/* Header do País */}
//       <Box
//         onClick={() => toggleCountry(group.country)}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           p: 1,
//           borderRadius: 1,
//           cursor: "pointer",
//           transition: "0.2s",
//           "&:hover": { backgroundColor: "action.hover" },
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           {/* Container circular para a bandeira */}
//           <Box
//             sx={{
//               width: 24,
//               height: 24,
//               borderRadius: "50%",
//               overflow: "hidden",
//               flexShrink: 0,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <SafeImage
//               src={group.flag || ""}
//               alt={group.country}
//               width={24}
//               height={24}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>
//           <Typography
//             variant="body2"
//             sx={{ fontWeight: 500, color: "text.primary" }}
//           >
//             {group.country}
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Typography variant="caption" sx={{ color: "text.secondary", mr: 1 }}>
//             {group.leagueCount}
//           </Typography>
//           {openCountries[group.country] ? (
//             <ExpandLess fontSize="small" sx={{ color: "text.disabled" }} />
//           ) : (
//             <ExpandMore fontSize="small" sx={{ color: "text.disabled" }} />
//           )}
//         </Box>
//       </Box>

//       {/* Ligas do País (Accordion) */}
//       {openCountries[group.country] && (
//         <Box sx={{ mt: 0.5, mb: 1.5 }}>
//           {group.leagues.map((league) => (
//             <Box
//               key={league.previewId}
//               onClick={() =>
//                 onSelectLeague({
//                   leagueId: league.apiSportsLeagueId,
//                   season: league.season,
//                 })
//               }
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 pl: 5,
//                 pr: 1,
//                 py: 0.8,
//                 cursor: "pointer",
//                 borderRadius: 1,
//                 "&:hover": {
//                   backgroundColor: "action.selected",
//                   "& .pin-icon": { opacity: 1 },
//                 },
//               }}
//             >
//               {/* Esquerda: logo + nome */}
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 {league.logo && (
//                   <SafeImage
//                     src={league.logo}
//                     alt={`Logo da ${league.name}`}
//                     width={20}
//                     height={20}
//                     style={{ objectFit: "contain" }}
//                   />
//                 )}
//                 <Typography variant="caption" sx={{ color: "text.secondary" }}>
//                   {league.name}
//                 </Typography>
//               </Box>

//               {/* Direita: pin */}
//               <IconButton
//                 size="small"
//                 className="pin-icon"
//                 onClick={(e) =>
//                   toggleFavoriteLeague(e, league.apiSportsLeagueId)
//                 }
//                 sx={{
//                   opacity: favoriteLeagues.has(league.apiSportsLeagueId)
//                     ? 1
//                     : 0,
//                   transition: "0.2s",
//                 }}
//               >
//                 {favoriteLeagues.has(league.apiSportsLeagueId) ? (
//                   <StarRoundedIcon sx={{ fontSize: 20 }} color="primary" />
//                 ) : (
//                   <StarOutlineRoundedIcon sx={{ fontSize: 20 }} />
//                 )}
//               </IconButton>
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );

//   // Extrai ligas favoritas
//   const allCountries = [...data.mainCountries, ...data.otherCountries];

//   const favoriteLeaguesList = allCountries
//     .flatMap((c) => c.leagues)
//     .filter((l) => favoriteLeagues.has(l.apiSportsLeagueId));

//   return (
//     <Box
//       component="ul"
//       ref={ref}
//       {...other}
//       sx={{
//         listStyle: "none",
//         p: 1,
//         m: 0,
//         maxHeight: "100%",
//         overflowY: "auto",
//       }}
//     >
//       {/* SEÇÃO: LIGAS FAVORITAS */}
//       {favoriteLeaguesList.length > 0 && (
//         <>
//           <Box sx={{ display: "flex", flexDirection: "row" }}>
//             <StarRoundedIcon sx={{ color: "secondary.dark" }} />
//             <Typography
//               variant="overline"
//               sx={{
//                 px: 1,
//                 color: "text.primary",
//                 fontWeight: "bold",
//                 display: "block",
//                 mb: 1,
//               }}
//             >
//               FAVORITAS
//             </Typography>
//           </Box>

//           {favoriteLeaguesList.map((league) => (
//             <Box
//               key={league.previewId}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 pl: 2,
//                 pr: 1,
//                 py: 0.8,
//                 cursor: "pointer",
//                 borderRadius: 1,
//                 "&:hover": { backgroundColor: "action.selected" },
//               }}
//               onClick={() =>
//                 onSelectLeague({
//                   leagueId: league.apiSportsLeagueId,
//                   season: league.season,
//                 })
//               }
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 {league.logo && (
//                   <SafeImage
//                     src={league.logo}
//                     alt={`Logo da ${league.name}`}
//                     width={20}
//                     height={20}
//                     style={{
//                       borderRadius: "50%",
//                       objectFit: isContinent ? "contain" : "cover",
//                     }}
//                   />
//                 )}
//                 <Typography variant="caption" sx={{ color: "text.secondary" }}>
//                   {league.name}
//                 </Typography>
//               </Box>
//               <StarRoundedIcon sx={{ fontSize: 20, color: "secondary.dark" }} />
//             </Box>
//           ))}
//           <Box
//             sx={{ my: 2, borderBottom: "1px solid", borderColor: "divider" }}
//           />
//         </>
//       )}

//       {/* SEÇÃO: PAÍSES PRINCIPAIS */}
//       <Typography
//         variant="overline"
//         sx={{
//           px: 1,
//           color: "text.primary",
//           fontWeight: "bold",
//           display: "block",
//           mb: 1,
//         }}
//       >
//         PRINCIPAIS
//       </Typography>
//       {data.mainCountries.map(renderCountryGroup)}

//       <Box sx={{ my: 2, borderBottom: "1px solid", borderColor: "divider" }} />

//       {/* SEÇÃO: TODOS OS PAÍSES */}
//       <Typography
//         variant="overline"
//         sx={{
//           px: 1,
//           color: "text.disabled",
//           fontWeight: "bold",
//           display: "block",
//           mb: 1,
//         }}
//       >
//         A-Z
//       </Typography>
//       {data.otherCountries.map(renderCountryGroup)}
//     </Box>
//   );
// });
import { forwardRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SafeImage } from "@/components/images/SafeImage";
import {
  OrganizedCountry,
  OrganizedLeaguesResponse,
} from "@/lib/api/apiSports/soccer/schemas/discoveryOrganized.schema";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { CONTINENT_ICONS } from "../types/countryTypes";

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

  // Estados locais para UI e favoritos
  const [openCountries, setOpenCountries] = useState<Record<string, boolean>>(
    {},
  );
  const [favoriteLeagues, setFavoriteLeagues] = useState<Set<number>>(
    new Set(),
  );

  const toggleCountry = (country: string) => {
    setOpenCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  const toggleFavoriteLeague = (e: React.MouseEvent, leagueId: number) => {
    e.stopPropagation();
    setFavoriteLeagues((prev) => {
      const next = new Set(prev);
      if (next.has(leagueId)) next.delete(leagueId);
      else next.add(leagueId);
      return next;
    });
  };

  /**
   * ✅ Render de um "grupo": pode ser País (bandeira) ou Continente (ícone)
   * A lógica do ícone entra AQUI, no header do group.
   */
  const renderCountryGroup = (group: OrganizedCountry) => {
    const isContinent = Boolean(CONTINENT_ICONS[group.country]);
    const iconSrc = CONTINENT_ICONS[group.country] || group.flag || "";

    return (
      <Box key={group.country} component="li" sx={{ mb: 0.5 }}>
        {/* Header do País / Continente */}
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
            {/* Container do ícone/bandeira */}
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

        {/* Ligas do País/Continente (Accordion) */}
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
                {/* Esquerda: logo + nome */}
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

                {/* Direita: pin */}
                <IconButton
                  size="small"
                  className="pin-icon"
                  onClick={(e) =>
                    toggleFavoriteLeague(e, league.apiSportsLeagueId)
                  }
                  sx={{
                    opacity: favoriteLeagues.has(league.apiSportsLeagueId)
                      ? 1
                      : 0,
                    transition: "0.2s",
                  }}
                >
                  {favoriteLeagues.has(league.apiSportsLeagueId) ? (
                    <StarRoundedIcon sx={{ fontSize: 20 }} color="primary" />
                  ) : (
                    <StarOutlineRoundedIcon sx={{ fontSize: 20 }} />
                  )}
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  };

  // Extrai ligas favoritas
  const allCountries = [...data.mainCountries, ...data.otherCountries];

  const favoriteLeaguesList = allCountries
    .flatMap((c) => c.leagues)
    .filter((l) => favoriteLeagues.has(l.apiSportsLeagueId));

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
      {/* SEÇÃO: LIGAS FAVORITAS */}
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

              <StarRoundedIcon sx={{ fontSize: 20, color: "secondary.dark" }} />
            </Box>
          ))}

          <Box
            sx={{ my: 2, borderBottom: "1px solid", borderColor: "divider" }}
          />
        </>
      )}

      {/* SEÇÃO: PAÍSES PRINCIPAIS */}
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

      {/* SEÇÃO: TODOS OS PAÍSES */}
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
