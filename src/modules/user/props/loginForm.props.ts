import { LoginResponse } from "../schemas/loginResponse.schema";

export type LoginFormProps = {
  onLogin: (user: LoginResponse) => void;
  initialUsername?: string;
  initialRememberMe?: boolean;
};