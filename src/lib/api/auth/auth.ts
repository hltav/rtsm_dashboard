import { apiUrl } from "../apiUrl";

type ApiFetchOptions = {
  endpoint: string;
  method?: string;
  body?: BodyInit | null;
};

export const apiLoginFetch = async <T>({
  endpoint,
  method = "GET",
  body,
}: ApiFetchOptions): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const errorMessage =
        errorBody?.message || `Erro na requisição: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro na chamada ${endpoint}:`, error);
    throw error;
  }
};
