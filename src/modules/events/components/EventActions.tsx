import React from "react";
import { Button, IconButton, Box } from "@mui/material";
import {
  Add as AddIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { EventActionsProps } from "../props/events.props";

const EventActions: React.FC<EventActionsProps> = ({
  isMobile,
  onAddClick,
  onFilterClick,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {isMobile ? (
        <IconButton
          onClick={onFilterClick}
          sx={{ bgcolor: "#1A2B42", color: "#4CAF50" }}
        >
          <FilterListIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={onFilterClick}
          sx={{
            bgcolor: "#1A2B42",
            "&:hover": {
              bgcolor: "#2A4060",
            },
          }}
          startIcon={<FilterListIcon />}
        >
          Filtros
        </Button>
      )}
      {isMobile ? (
        <IconButton
          onClick={onAddClick}
          sx={{
            bgcolor: "#E0A800",
            "&:hover": {
              bgcolor: "#E0A800",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={onAddClick}
          sx={{ bgcolor: "#E0A800" }}
          startIcon={<AddIcon />}
        >
          Adicionar
        </Button>
      )}
    </Box>
  );
};

export default EventActions;
