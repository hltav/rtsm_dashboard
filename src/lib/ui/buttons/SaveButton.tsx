"use client";
import React from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface SaveButtonProps extends ButtonProps {
  isLoading?: boolean;
  label?: string;
}

export const SaveButton = ({
  isLoading,
  label = "Salvar",
  ...props
}: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={isLoading || props.disabled}
      startIcon={
        isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          props.startIcon
        )
      }
      sx={{
        minWidth: 100,
        ...props.sx,
        border: "1px solid",
        borderColor:"text.primary"
      }}
      {...props}
    >
      {isLoading ? "Salvando..." : label}
    </Button>
  );
};
