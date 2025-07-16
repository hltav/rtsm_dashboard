'use client';
import ConfirmEmailContent from "@/components/confirm-email/ConfirmEmailContent";
import { Suspense } from "react";

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmailContent />
    </Suspense>
  );
}
