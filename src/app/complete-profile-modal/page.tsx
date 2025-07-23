'use client';
import React, { useState } from "react";
import CompleteProfileModal from "@/components/complete-profile-modal/CompleteProfileModal";

export default function CompleteProfileModalPage() {
  const [open, setOpen] = useState(true); // modal abre automaticamente

  const handleClose = () => {
    setOpen(false);
    // Aqui você pode adicionar redirecionamento ou outra ação se quiser
  };

  return (
    <CompleteProfileModal open={open} onClose={handleClose} />
  );
}
