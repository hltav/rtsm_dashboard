"use client";
import React from "react";
import { Button, ButtonProps, useTheme } from "@mui/material";

interface CancelButtonProps extends ButtonProps {
  label?: string;
}

export const CancelButton = ({
  label = "Cancelar",
  ...props
}: CancelButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      sx={{
        minWidth: 100,
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
        "&:hover": {
          borderColor: theme.palette.text.primary,
          backgroundColor: theme.palette.action.hover,
        },
        ...props.sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};
