import { LoginResponse } from "@/modules/user/schemas/loginResponse.schema";
import { GetUser } from "@/modules/user/schemas/user.schema";

export interface AuthContextType {
  user: GetUser | null;
  login: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<LoginResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  hasIncompleteProfile: boolean;
  checkAuthStatus: () => Promise<GetUser | null>;
  updateUser: (userData: GetUser) => void;
  profileImageUrl: string | null;
}
