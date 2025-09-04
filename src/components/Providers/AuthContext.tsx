import { AuthContextType } from "@/modules/auth/types/authContext.type";
import { GetUser } from "@/modules/user/schemas/user.schema";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api/apiUrl";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<GetUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasIncompleteProfile, setHasIncompleteProfile] = useState(false);
  const isAuthenticated = !!user;
  const router = useRouter();

  const checkProfileCompletion = useCallback((userData: GetUser | null) => {
    const isIncomplete =
      userData &&
      (!userData.clientData ||
        !userData.clientData.cpf ||
        !userData.clientData.phone);
    setHasIncompleteProfile(!!isIncomplete);
    return !!isIncomplete;
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const res = await fetch("api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const userData: GetUser = await res.json();
        setUser(userData);
        checkProfileCompletion(userData);
      } else {
        setUser(null);
        setHasIncompleteProfile(false);
      }
    } catch (error) {
      console.error("Erro ao verificar status de autenticação:", error);
      setUser(null);
      setHasIncompleteProfile(false);
    } finally {
      setLoading(false);
    }
  }, [checkProfileCompletion]);

  const login = async (data: { email: string; password: string; rememberMe: boolean }) => {
    setLoading(true); 
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: data.email, password: data.password, rememberMe: data.rememberMe }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha no login");
      }

      await checkAuthStatus();

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setHasIncompleteProfile(false);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const updateUser = (userData: GetUser) => {
    setUser(userData);
    checkProfileCompletion(userData);
  };

  const profileImageUrl = user?.clientData?.image ?? null;

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        hasIncompleteProfile,
        checkAuthStatus,
        updateUser,
        profileImageUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};