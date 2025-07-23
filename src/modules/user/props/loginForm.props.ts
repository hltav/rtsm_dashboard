import { LoginResponse } from "../schemas/loginResponse.schema";

export interface LoginFormProps {
  onLogin: (
    loginResponse: LoginResponse,
    rememberMe: boolean
  ) => void;
  initialUsername?: string;
  initialRememberMe?: boolean;
}