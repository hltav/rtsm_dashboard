import { GetUser } from "@/modules/user/schemas/user.schema";
import apiClient from "../apiBaseUrl";


export const getUserProfile = async (): Promise<GetUser> => {
  try {
    const response = await apiClient.get('/auth/me');
    console.log(response)
    return response.data;

  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw error;
  }
};