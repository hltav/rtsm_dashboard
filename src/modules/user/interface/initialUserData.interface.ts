import { Role } from "../schemas/user.schema";

export interface InitialUserData {
  id: number;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  role: Role;
  refreshToken?: string | null;
  clientData?: {
    image?: string;
    address?: {
      city?: string;
      state?: string;
      neighborhood?: string;
    };
  } | null;
}

export const initialUserData: InitialUserData = {
  id: 0,
  firstname: "",
  lastname: "",
  nickname: "",
  email: "",
  role: "USER",
  refreshToken: null,
  clientData: {
    image: "",
    address: {
      city: "",
      state: "",
      neighborhood: "",
    },
  },
};
