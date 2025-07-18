"use client";
import { ConfirmationSide } from "@/components/auth/confirm-email/ConfirmationSide";
import { MarketingSide } from "@/components/auth/confirm-email/MarketingSide";
import { LoadingState } from "@/components/auth/confirm-email/LoadingState";
import { useRouter } from "next/navigation";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { ConfirmEmailMainLayout } from "./ConfirmEmailMainLayout";

const ConfirmEmailContent = () => {
  const router = useRouter();
  const { status, countdown } = useEmailVerification();

  const handleRedirectToLogin = () => {
    router.push("/login");
  };

  if (status === "loading") {
    return <LoadingState />;
  }

  return (
    <ConfirmEmailMainLayout>
      <MarketingSide />
      <ConfirmationSide
        onRedirectToLogin={handleRedirectToLogin}
        status={status}
        countdown={countdown}
      />
    </ConfirmEmailMainLayout>
  );
};

export default ConfirmEmailContent;
