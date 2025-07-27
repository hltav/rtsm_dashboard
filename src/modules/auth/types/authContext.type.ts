import { GetUser } from "@/modules/user/schemas/user.schema";

export interface AuthContextType {
  user: GetUser | null;
  token: string | null;
  login: (userData: GetUser, tokenValue: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  hasIncompleteProfile: boolean;
  checkAuthStatus: () => Promise<void>;
  updateUser: (userData: GetUser) => void;
  profileImageUrl: string | null
}
