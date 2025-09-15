import ResetPasswordContent from "@/modules/auth/reset-password/ResetPasswordContent";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  <Suspense fallback={<div>Carregando...</div>}>
    <ResetPasswordContent />
  </Suspense>;
}
