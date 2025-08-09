"use client";
import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import CompleteProfilePage from "../../modules/complete-profile/CompleteProfile";

interface CompleteProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogContent sx={{ p: 0 }}>
        <CompleteProfilePage onComplete={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CompleteProfileModal;
