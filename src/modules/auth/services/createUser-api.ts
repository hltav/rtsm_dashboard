import { SignUpFormData } from "../schemas/signup.schemas";

export const createUserApi = {
  async createUser(
    userData: SignUpFormData
  ): Promise<{ success: boolean; message?: string; status?: number }> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: userData.firstname,
          lastname: userData.lastname,
          nickname: userData.nickname,
          email: userData.email,
          password: userData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message:
            errorData.message || `Erro ao criar usuário: ${response.status}`,
          status: response.status,
        };
      }

      return { success: true };
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      let message = "Erro desconhecido ao criar usuário";
      let status: number | undefined;

      if (error instanceof Error) {
        message = error.message;
      }

      return {
        success: false,
        message,
        status,
      };
    }
  },
};
