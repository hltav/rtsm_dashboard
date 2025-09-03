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
} from "@mui/material";
import {
  CancelOutlined as CancelIcon,
  CheckCircleOutline as SaveIcon,
} from "@mui/icons-material";
import { modalStyle } from "../interfaces/modalStyle";
import { FilterModalProps } from "../props/events.props";

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  uniqueCategories,
  uniqueEventTypes,
  uniqueEvents,
  uniqueMarkets,
  amountRanges,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Filtros
          </Typography>
          <Box>
            <IconButton onClick={onClose} sx={{ color: "red" }}>
              <CancelIcon />
            </IconButton>
            <IconButton onClick={onClose} color="primary">
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
            <InputLabel id="category-label">Categoria</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={filters.category}
              onChange={onFilterChange}
              label="Categoria"
            >
              <MenuItem value="">Todos</MenuItem>
              {uniqueCategories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="eventType-label">Tipo de Evento</InputLabel>
            <Select
              labelId="eventType-label"
              name="eventType"
              value={filters.eventType}
              onChange={onFilterChange}
              label="Tipo de Evento"
            >
              <MenuItem value="">Todos</MenuItem>
              {uniqueEventTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="event-label">Evento</InputLabel>
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
            <InputLabel id="market-label">Mercado</InputLabel>
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
            <InputLabel id="amountRange-label">Valor</InputLabel>
            <Select
              labelId="amountRange-label"
              name="amountRange"
              value={filters.amountRange}
              onChange={onFilterChange}
              label="Valor"
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
            <InputLabel id="result-label">Resultado</InputLabel>
            <Select
              labelId="result-label"
              name="result"
              value={filters.result}
              onChange={onFilterChange}
              label="Resultado"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Ganho">Ganho</MenuItem>
              <MenuItem value="Perda">Perda</MenuItem>
              <MenuItem value="Empate">Empate</MenuItem>
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
            sx={{ color: "white", borderColor: "white" }}
          >
            Limpar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;
