import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItemButton,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Chip,
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { DiscoverFixture } from "@/lib/cache/schemas/discoveryFixture.schema";
import { SafeImage } from "@/components/images/SafeImage";

interface FixtureSelectionModalProps {
  open: boolean;
  onClose: () => void;
  fixtures: DiscoverFixture[];
  loading: boolean;
  error: string | null;
  onSelectFixture: (previewId: string, fixture: DiscoverFixture) => void;
  selectedFixtureId: string;
  disabled: boolean;
  elevation?: number;
}

export const FixtureSelectionModal: React.FC<FixtureSelectionModalProps> = ({
  open,
  onClose,
  fixtures,
  loading,
  error,
  onSelectFixture,
  selectedFixtureId,
  disabled,
  elevation = 0,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFixtures = useMemo(() => {
    if (!fixtures || !searchTerm) return fixtures;

    return fixtures.filter((fixture) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        fixture.teams.home.name.toLowerCase().includes(searchLower) ||
        fixture.teams.away.name.toLowerCase().includes(searchLower)
      );
    });
  }, [fixtures, searchTerm]);

  const handleSelectFixture = (fixture: DiscoverFixture) => {
    onSelectFixture(fixture.previewId, fixture);
    onClose();
    setSearchTerm("");
  };

  const handleClose = () => {
    onClose();
    setSearchTerm("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ elevation }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1, pb: 1 }}
      >
        <Typography variant="h6" sx={{ flex: 1 }}>
          Selecionar Partida
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {!disabled && (
        <Box sx={{ px: 3, pb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar partida..."
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
      )}

      <DialogContent sx={{ p: 0 }}>
        {disabled ? (
          <Typography
            sx={{ p: 3, textAlign: "center", color: "text.secondary" }}
          >
            Selecione uma liga primeiro
          </Typography>
        ) : loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 3, textAlign: "center" }}>
            {error}
          </Typography>
        ) : (
          <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
            {filteredFixtures && filteredFixtures.length > 0 ? (
              filteredFixtures.map((fixture) => (
                <ListItemButton
                  key={fixture.previewId}
                  onClick={() => handleSelectFixture(fixture)}
                  selected={
                    fixture.apiSportsEventId?.toString() === selectedFixtureId
                  }
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    py: 2,
                    px: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <SafeImage
                          src={fixture.teams.home.logo}
                          alt={fixture.teams.home.name}
                          width={24}
                          height={24}
                        />
                        <Typography variant="body1" fontWeight={500}>
                          {fixture.teams.home.name}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <SafeImage
                          src={fixture.teams.away.logo}
                          alt={fixture.teams.away.name}
                          width={24}
                          height={24}
                        />
                        <Typography variant="body1" fontWeight={500}>
                          {fixture.teams.away.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={formatDate(fixture.date)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </ListItemButton>
              ))
            ) : (
              <Typography
                sx={{ p: 3, textAlign: "center", color: "text.secondary" }}
              >
                Nenhuma partida encontrada
              </Typography>
            )}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};
