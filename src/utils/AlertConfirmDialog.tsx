import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Alert,
  AlertTitle,
  useTheme,
} from "@mui/material";

interface AlertConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  severity?: "error" | "warning" | "info" | "success";
  onConfirm: () => void;
  onCancel: () => void;
}

export const AlertConfirmDialog: React.FC<AlertConfirmDialogProps> = ({
  open,
  title,
  message,
  severity = "warning",
  onConfirm,
  onCancel,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        elevation: 0,
        sx: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
      }}
    >
      <DialogContent>
        <Alert
          severity={severity}
          sx={{
            color: theme.palette.text.primary,
            "& .MuiAlertTitle-root": {
              color: theme.palette.text.primary,
            },
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          color="inherit"
          sx={{ color: theme.palette.text.primary }}
        >
          Não
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};
