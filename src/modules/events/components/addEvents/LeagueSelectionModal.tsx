"use client"
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { OrganizedLeaguesResponse } from "@/lib/api/apiSports/soccer/schemas/discoveryOrganized.schema";
import { CountriesListBox } from "../../utils/countriesListBox";

interface LeagueSelectionModalProps {
  open: boolean;
  onClose: () => void;
  organizedLeagues: OrganizedLeaguesResponse | null;
  loading: boolean;
  error: string | null;
  onSelectLeague: (leagueData: { leagueId: number; season: number | null }) => void;
  selectedLeagueName: string;
  elevation?: number;
}

export const LeagueSelectionModal: React.FC<LeagueSelectionModalProps> = ({
  open,
  onClose,
  organizedLeagues,
  loading,
  error,
  onSelectLeague,
  elevation = 0,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeagues = useMemo(() => {
    if (!organizedLeagues) return { mainCountries: [], otherCountries: [] };

    if (!searchTerm) return organizedLeagues;

    const filterCountries = (countries: typeof organizedLeagues.mainCountries) =>
      countries
        .map((country) => ({
          ...country,
          leagues: country.leagues.filter((league) =>
            league.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((country) => country.leagues.length > 0);

    return {
      mainCountries: filterCountries(organizedLeagues.mainCountries),
      otherCountries: filterCountries(organizedLeagues.otherCountries),
    };
  }, [organizedLeagues, searchTerm]);

  const handleSelectLeague = (leagueData: {
    leagueId: number;
    season: number | null;
  }) => {
    onSelectLeague(leagueData);
    onClose();
    setSearchTerm("");
  };

  const handleClose = () => {
    onClose();
    setSearchTerm("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ elevation }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 1 }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          Selecionar Liga
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ px: 3, pb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar liga..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 3, textAlign: "center" }}>
            {error}
          </Typography>
        ) : (
          <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
            {filteredLeagues && (
              <CountriesListBox
                data={filteredLeagues}
                onSelectLeague={handleSelectLeague}
              />
            )}
            {filteredLeagues.mainCountries.length === 0 &&
              filteredLeagues.otherCountries.length === 0 && (
                <Typography
                  sx={{ p: 3, textAlign: "center", color: "text.secondary" }}
                >
                  Nenhuma liga encontrada
                </Typography>
              )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};