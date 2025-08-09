"use client";
import { ConfirmationSide } from "@/modules/auth/confirm-email/components/ConfirmationSide";
import { LoadingState } from "@/modules/auth/confirm-email/components/LoadingState";
import { useRouter } from "next/navigation";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { ConfirmEmailMainLayout } from "./components/ConfirmEmailMainLayout";
import { MarketingSide } from "./components/MarketingSide";

const ConfirmEmailContent = () => {
  const router = useRouter();
  const { status, countdown } = useEmailVerification();

  const handleRedirectToLogin = () => {
    router.push("/login");
  };

  const isVerificationInvalid = status === "invalid" || status === "error";

  if (status === "loading") {
    return <LoadingState />;
  }

  return (
    <ConfirmEmailMainLayout>
      <MarketingSide isInvalid={isVerificationInvalid} />
      <ConfirmationSide
        onRedirectToLogin={handleRedirectToLogin}
        status={status}
        countdown={countdown}
      />
    </ConfirmEmailMainLayout>
  );
};

export default ConfirmEmailContent;
