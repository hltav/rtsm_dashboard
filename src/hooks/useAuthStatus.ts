import { useEffect } from "react";
import { useAuth } from "@/components/Providers/AuthContext";

export const useAuthStatus = () => {
  const { checkAuthStatus, loading } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { loading };
};
