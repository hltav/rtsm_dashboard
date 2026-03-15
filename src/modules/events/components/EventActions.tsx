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
        <IconButton onClick={onFilterClick}>
          <FilterListIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={onFilterClick}
          startIcon={<FilterListIcon />}
        >
          Filtros
        </Button>
      )}
      {isMobile ? (
        <IconButton onClick={onAddClick}>
          <AddIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={onAddClick}
          startIcon={<AddIcon />}
        >
          Adicionar
        </Button>
      )}
    </Box>
  );
};

export default EventActions;
