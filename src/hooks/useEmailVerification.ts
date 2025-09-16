"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { confirmEmailApi } from "@/lib/api/auth/confirm-email/confirm-emailApi";

export const useEmailVerification = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "loading" | "verified" | "invalid" | "error"
  >("loading");
  const [countdown, setCountdown] = useState(3);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const redirectTo = searchParams.get("redirectTo");

      // 🔧 Obter email da URL primeiro
      const emailFromUrl = searchParams.get("email");
      if (emailFromUrl) setEmail(emailFromUrl);

      if (!token) {
        setStatus("invalid");
        return;
      }

      try {
        const data = await confirmEmailApi(token);

        setStatus("verified");
        setEmail(data.email || emailFromUrl || null);

        if (redirectTo) {
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                window.location.href = redirectTo;
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          return () => clearInterval(timer);
        }
      } catch (error: unknown) {
        console.error("Erro ao verificar e-mail:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return { status, countdown, email };
};
