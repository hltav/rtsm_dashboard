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

  // Derivamos o estado de autenticação da presença do objeto user
  const isAuthenticated = !!user;
  const router = useRouter();

  // Mantemos a lógica de perfil incompleto, pois é útil para a UI
  const checkProfileCompletion = useCallback((userData: GetUser | null) => {
    const isIncomplete =
      userData &&
      (!userData.clientData ||
        !userData.clientData.cpf ||
        !userData.clientData.phone);
    setHasIncompleteProfile(!!isIncomplete);
  }, []);

  // ESSENCIAL: Verifica se o cookie é válido chamando o backend
  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      // O backend lerá o cookie e retornará o usuário se estiver logado
      const res = await checkAuthStatusService();
      setUser(res);
      checkProfileCompletion(res);
      return res;
    } catch {
      // Se der 401 ou erro, limpamos o estado
      setUser(null);
      setHasIncompleteProfile(false);
      return null;
    } finally {
      setLoading(false);
    }
  }, [checkProfileCompletion]);

  const login = async (data: LoginData) => {
    try {
      const res = await loginService(data);
      // No sucesso, o backend já setou o cookie no navegador
      setUser(res.data.user);
      checkProfileCompletion(res.data.user);
      return res;
    } catch (err) {
      setUser(null);
      setHasIncompleteProfile(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutService(); // Backend limpa o cookie (expira ele)
      setUser(null);
      setHasIncompleteProfile(false);
      router.push("/login");
    } catch {
      setUser(null);
      router.push("/login");
    }
  };

  const updateUser = useCallback(
    (userData: GetUser) => {
      setUser(userData);
      checkProfileCompletion(userData);
    },
    [checkProfileCompletion],
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
