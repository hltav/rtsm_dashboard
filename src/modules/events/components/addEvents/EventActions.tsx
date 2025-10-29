import React from "react";
import { Box, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ModalEventActionsProps } from "../../props/modalAddEvent.props";

export const ModalEventActions: React.FC<ModalEventActionsProps> = ({
  onClose,
}) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
    <Button
      onClick={onClose}
      sx={{
        mr: 2,
        color: "#E0E0E0",
        borderColor: "#E0E0E0",
        "&:hover": {
          color: alpha("#E0E0E0", 0.6),
          borderColor: alpha("#E0E0E0", 0.6),
          backgroundColor: "transparent",
        },
      }}
      variant="outlined"
    >
      Cancelar
    </Button>
    <Button
      sx={{
        bgcolor: "#E0E0E0",
        color: "#1A2B42",
        border: "1px solid transparent",
        "&:hover": {
          border: "1px solid #E0E0E0",
          color: "#E0E0E0",
          bgcolor: "transparent",
        },
      }}
      type="submit"
    >
      Salvar
    </Button>
  </Box>
);
