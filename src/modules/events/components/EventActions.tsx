import React from "react";
import { Button, IconButton, Box, useTheme } from "@mui/material";
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
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {isMobile ? (
        <IconButton
          onClick={onFilterClick}
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.success.main,
          }}
        >
          <FilterListIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={onFilterClick}
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.success.main,
            "&:hover": {
              bgcolor: theme.palette.action.hover,
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
            bgcolor: theme.palette.warning.main,
            color: theme.palette.background.paper,
            "&:hover": {
              bgcolor: theme.palette.warning.dark,
            },
          }}
        >
          <AddIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={onAddClick}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.tertiary,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              color: theme.palette.text.secondary,
            },
          }}
          startIcon={<AddIcon />}
        >
          Adicionar
        </Button>
      )}
    </Box>
  );
};

export default EventActions;
