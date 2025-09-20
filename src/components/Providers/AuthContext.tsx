import { AuthContextType } from "@/modules/auth/types/authContext.type";
import { GetUser } from "@/modules/user/schemas/user.schema";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { LoginData } from "@/modules/auth/login/interface/loginData.schema";
import {
  checkAuthStatusService,
  loginService,
  logoutService,
} from "@/lib/api/auth/login/loginApi";

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
      const res = await checkAuthStatusService();
      setUser(res);
      checkProfileCompletion(res);
    } catch (err) {
      console.error("Erro ao verificar status de autenticação:", err);
      setUser(null);
      setHasIncompleteProfile(false);
    } finally {
      setLoading(false);
    }
  }, [checkProfileCompletion]);

  const login = async (data: LoginData) => {
    try {
      const res = await loginService(data);
      setUser(res.data.user);
      console.log(res);
      return res;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
      setHasIncompleteProfile(false);
      router.push("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  const updateUser = useCallback(
    (userData: GetUser) => {
      setUser(userData);
      checkProfileCompletion(userData);
    },
    [checkProfileCompletion]
  );

  const profileImageUrl = user?.clientData?.image ?? null;

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
            {children}   {" "}
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
