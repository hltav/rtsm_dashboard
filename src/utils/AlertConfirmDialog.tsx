// import React from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Button,
//   Alert,
//   AlertTitle,
// } from "@mui/material";

// interface AlertConfirmDialogProps {
//   open: boolean;
//   title?: string;
//   message: string;
//   severity?: "error" | "warning" | "info" | "success";
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// export const AlertConfirmDialog: React.FC<AlertConfirmDialogProps> = ({
//   open,
//   title,
//   message,
//   severity = "warning",
//   onConfirm,
//   onCancel,
// }) => {
//   return (
//     <Dialog open={open} onClose={onCancel}>
//       <DialogContent>
//         <Alert severity={severity}>
//           {title && <AlertTitle>{title}</AlertTitle>}
//           {message}
//         </Alert>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onCancel} color="inherit">
//           Cancelar
//         </Button>
//         <Button onClick={onConfirm} color="error" variant="contained">
//           Confirmar
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Alert,
  AlertTitle,
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
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        elevation: 0,
        sx: {
          backgroundColor: "#1A2B42",
          color: "white",
        },
      }}
    >
      <DialogContent>
        <Alert
          severity={severity}
          sx={{
            color: "white",
            "& .MuiAlertTitle-root": {
              color: "white",
            },
            backgroundColor: "#1A2B42",
          }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit" sx={{ color: "white" }}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
