"use client";
import CompleteProfileModal from "@/modules/complete-profile-modal/CompleteProfileModal";
import React, { useState } from "react";

export default function CompleteProfileModalPage() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return <CompleteProfileModal open={open} onClose={handleClose} />;
}
