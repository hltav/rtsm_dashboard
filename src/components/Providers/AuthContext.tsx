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
import { LoginResponse } from "@/modules/user/schemas/loginResponse.schema";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const checkProfileCompletion = useCallback((userData: GetUser | null) => {
    if (!userData) {
      setHasIncompleteProfile(false);
      return;
    }

    const isIncomplete =
      !userData.clientData ||
      !userData.clientData.cpf ||
      !userData.clientData.phone;

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

  const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
      const res = await loginService(data);

      setUser(res.user);
      checkProfileCompletion(res.user);

      return res;
    } catch (err) {
      setUser(null);
      setHasIncompleteProfile(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      // 1) chama backend e AGUARDA apagar cookie
      await logoutService();
    } catch {
      // mesmo se falhar, seguimos limpando o client
    } finally {
      // 2) limpa estados do client
      setUser(null);

      // ✅ limpa cache de dados (muito importante)
      queryClient.clear();

      // 3) navega e força revalidação do App Router
      router.replace("/login");
      router.refresh();

      // (fallback nuclear se ainda tiver "travada")
      // window.location.href = "/login";
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
