import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const useEmailVerification = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "loading" | "verified" | "invalid" | "error"
  >("loading");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const redirectTo = searchParams.get("redirectTo");

      if (!token) {
        setStatus("invalid");
        return;
      }

      try {
        const response = await fetch("/api/auth/confirm-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        console.log("Token sendo enviado:", token);

        if (response.ok) {
          setStatus("verified");

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
        } else {
          const errorData = await response.json();
          console.error("Erro na verificação:", errorData);
          setStatus("invalid");
        }
      } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return { status, countdown };
};