import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/lib/api/apiBaseUrl";
import { AxiosError } from "axios";

export function useResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    if (!token) {
      console.log(token);
      setError("Token inválido ou expirado.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log("Enviando para /auth/reset-password:", {
        token,
        newPassword,
      });

      await apiClient.post("/auth/reset-password", { token, newPassword });

      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
}
