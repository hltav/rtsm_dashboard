"use client";
import React, { useState } from "react";
import CompleteProfileModal from "@/components/complete-profile-modal/CompleteProfileModal";

export default function CompleteProfileModalPage() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return <CompleteProfileModal open={open} onClose={handleClose} />;
}
