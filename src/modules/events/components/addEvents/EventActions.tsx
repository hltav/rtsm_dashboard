import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ModalEventActionsProps } from "../../props/modalAddEvent.props";

export const ModalEventActions: React.FC<ModalEventActionsProps> = ({
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
      <Button
        onClick={onClose}
        sx={{
          mr: 2,
          color: theme.palette.text.primary,
          borderColor: theme.palette.text.primary,
          "&:hover": {
            color: alpha(theme.palette.text.primary, 0.6),
            borderColor: alpha(theme.palette.text.primary, 0.6),
            backgroundColor: "transparent",
          },
        }}
        variant="outlined"
      >
        Cancelar
      </Button>
      <Button
        sx={{
          bgcolor: theme.palette.text.primary,
          color: theme.palette.background.default,
          border: "1px solid transparent",
          "&:hover": {
            border: `1px solid ${theme.palette.text.primary}`,
            color: theme.palette.text.primary,
            bgcolor: "transparent",
          },
        }}
        type="submit"
      >
        Salvar
      </Button>
    </Box>
  );
};
