import { GetUser } from "@/modules/user/schemas/user.schema";

export interface AuthContextType {
  user: GetUser | null;
  login: (userData: GetUser) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}
