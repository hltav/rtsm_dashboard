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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<GetUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasIncompleteProfile, setHasIncompleteProfile] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  const updateUser = (userData: GetUser) => {
    setUser(userData);
    checkProfileCompletion(userData);
  };

  const profileImageUrl = user?.clientData?.image ?? null;

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
      setLoading(true);

      const res = await fetch(`/api/users/me`, {
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

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = (userData: GetUser, token: string) => {
    setUser(userData);
    setToken(token);
    checkProfileCompletion(userData);
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
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
        token,
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
