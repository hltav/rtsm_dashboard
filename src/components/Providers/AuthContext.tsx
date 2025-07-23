import { AuthContextType } from "@/modules/auth/types/authContext.type";
import { GetUser } from "@/modules/user/schemas/user.schema";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation"; 

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<GetUser | null>(null);
  const [loading, setLoading] = useState(true); 
  const isAuthenticated = !!user;
  const router = useRouter();

  
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      const res = await fetch("/api/users/me", { 
        method: "GET",
        credentials: "include", 
      });

      if (res.ok) {
        const userData: GetUser = await res.json();
        setUser(userData);
      } else {
        setUser(null); 
      }
    } catch (error) {
      console.error("Erro ao verificar status de autenticação:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    checkAuthStatus();
  }, []); 

  const login = (userData: GetUser) => { 
    setUser(userData);
    
  };

  const logout = async () => {
    try {
      
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", 
      });
      setUser(null); 
      router.push("/login"); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
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