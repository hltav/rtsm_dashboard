import React from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { EventDetailsProps } from "../../props/modalAddEvent.props";
import { getSoccerMarketOptions, soccerMarket } from "../../libs/soccerMarket";
import { unidValues, getUnidLabel } from "../../libs/unidValues";

export const EventDetails: React.FC<EventDetailsProps> = ({
  newEvent,
  onNewEventChange,
}) => {
  const categories = Object.keys(soccerMarket);

  const marketOptions =
    newEvent.marketCategory && newEvent.market
      ? getSoccerMarketOptions(newEvent.marketCategory, newEvent.market)
      : [];

  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;

    const convertedValue =
      name === "amount" ? parseFloat(value as string) : value;

    onNewEventChange({
      target: { name, value: convertedValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Box>
      {/* 🏷️ Categoria de Mercado */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de Mercado</InputLabel>
        <Select
          name="marketCategory"
          value={newEvent.marketCategory || ""}
          onChange={handleSelectChange}
          label="Tipo de Mercado"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 🏆 Submercado */}
      {newEvent.marketCategory && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Mercado</InputLabel>
          <Select
            name="market"
            value={newEvent.market || ""}
            onChange={handleSelectChange}
            label="Mercado"
          >
            {Object.keys(soccerMarket[newEvent.marketCategory]).map((sub) => (
              <MenuItem key={sub} value={sub}>
                {sub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* ⚙️ Opções do Mercado */}
      {newEvent.market && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Opções do Mercado</InputLabel>
          <Select
            name="optionMarket"
            value={newEvent.optionMarket || ""}
            onChange={handleSelectChange}
            label="Opções do Mercado"
          >
            {marketOptions.map((opt: string) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* 💰 Valor da Aposta (unidades) */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Valor(Unids)</InputLabel>
        <Select
          name="amount"
          value={newEvent.amount ? newEvent.amount.toFixed(2) : ""}
          onChange={handleSelectChange}
          label="Valor(Unids)"
        >
          {Object.keys(unidValues).map((value) => (
            <MenuItem key={value} value={value}>
              {getUnidLabel(value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
