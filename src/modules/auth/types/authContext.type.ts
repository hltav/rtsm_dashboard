import { GetUser } from "@/modules/user/schemas/user.schema";

export interface AuthContextType {
  user: GetUser | null;
  login: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<{ success: boolean }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  hasIncompleteProfile: boolean;
  checkAuthStatus: () => Promise<GetUser>;
  updateUser: (userData: GetUser) => void;
  profileImageUrl: string | null;
}
