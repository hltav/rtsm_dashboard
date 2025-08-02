import { GetUser } from "../schemas/user.schema";

export interface ProfileFormProps {
  user: GetUser;
  token: string;
  onComplete?: () => void;
  setIsLoading?: (loading: boolean) => void;
}