import React from "react";
import {
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
  useTheme,
} from "@mui/material";
import {
  CancelOutlined as CancelIcon,
  CheckCircleOutline as SaveIcon,
} from "@mui/icons-material";
import { modalStyle } from "../interfaces/modalStyle";
import { FilterModalProps } from "../props/events.props";
import { translateSport } from "@/utils/sportsMap";

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  uniqueEvents,
  uniqueModalities,
  uniqueLeagues,
  uniqueMarkets,
  uniqueOdds,
  uniqueBanks,
  amountRanges,
}) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalStyle,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: theme.palette.text.primary }}
          >
            Filtros
          </Typography>
          <Box>
            <IconButton
              onClick={onClose}
              sx={{ color: theme.palette.error.main }}
            >
              <CancelIcon />
            </IconButton>
            <IconButton
              onClick={onClose}
              sx={{ color: theme.palette.success.main }}
            >
              <SaveIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              id="event-label"
              sx={{ color: theme.palette.text.secondary }}
            >
              Evento
            </InputLabel>
            <Select
              labelId="event-label"
              name="event"
              value={filters.event}
              onChange={onFilterChange}
              label="Evento"
            >
              <MenuItem value="">Todos</MenuItem>
              {uniqueEvents.map((evt) => (
                <MenuItem key={evt} value={evt}>
                  {evt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="modality-label"
              sx={{ color: theme.palette.text.secondary }}
            >
              Modalidade
            </InputLabel>
            <Select
              labelId="modality-label"
              name="modality"
              value={filters.modality}
              onChange={onFilterChange}
              label="Modalidade"
            >
              <MenuItem value="">Todos</MenuItem>
              {uniqueModalities.map((mod) => (
                <MenuItem key={mod} value={mod}>
                  {translateSport(mod)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="league-label"
              sx={{ color: theme.palette.text.secondary }}
            >
              Liga
            </InputLabel>
            <Select
              labelId="league-label"
              name="league"
              value={filters.league}
              onChange={onFilterChange}
              label="Liga"
            >
              <MenuItem value="">Todos</MenuItem>
              {uniqueLeagues.map((league) => (
                <MenuItem key={league} value={league}>
                  {league}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="market-label"
              sx={{ color: theme.palette.text.secondary }}
            >
              Mercado
            </InputLabel>
            <Select
              labelId="market-label"
              name="market"
              value={filters.market}
              onChange={onFilterChange}
              label="Mercado"
            >
              <MenuItem value="">Todos</MenuItem>
              {uniqueMarkets.map((mkt) => (
                <MenuItem key={mkt} value={mkt}>
                  {mkt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="amountRange-label"
              sx={{ color: theme.palette.text.secondary }}
            >
              Unids (Valor)
            </InputLabel>
            <Select
              labelId="amountRange-label"
              name="amountRange"
              value={filters.amountRange}
              onChange={onFilterChange}
              label="Unids (Valor)"
            >
              <MenuItem value="">Todos</MenuItem>
              {amountRanges.slice(1).map((range) => (
                <MenuItem key={range} value={range}>
                  ${range}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="odd-label"
              sx={{ color: theme.palette.text.secondary }}
            >
              Odd
            </InputLabel>
            <Select
              labelId="odd-label"
              name="odd"
              value={filters.odd}
              onChange={onFilterChange}
              label="Odd"
            >
              <MenuItem value="">Todos</MenuItem>
              {uniqueOdds.map((odd) => (
                <MenuItem key={odd} value={odd}>
                  {odd}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="bank-label"
              sx={{ color: theme.palette.text.secondary }}
            >
              Banca
            </InputLabel>
            <Select
              labelId="bank-label"
              name="bank"
              value={filters.bank}
              onChange={onFilterChange}
              label="Banca"
            >
              <MenuItem value="">Todos</MenuItem>
              {uniqueBanks.map((bank) => (
                <MenuItem key={bank} value={bank}>
                  {bank}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="result-label"
              sx={{ color: theme.palette.text.secondary }}
            >
              Resultado
            </InputLabel>
            <Select
              labelId="result-label"
              name="result"
              value={filters.result}
              onChange={onFilterChange}
              label="Resultado"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="win">Ganha</MenuItem>
              <MenuItem value="lose">Perdida</MenuItem>
              <MenuItem value="void">Retornada</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            gap: 1,
          }}
        >
          <Button
            onClick={onClearFilters}
            variant="outlined"
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              "&:hover": {
                borderColor: theme.palette.text.primary,
                backgroundColor: "transparent",
              },
            }}
          >
            Limpar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;
