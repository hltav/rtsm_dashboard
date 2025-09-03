interface ApiEventsFetchOptions extends RequestInit {
  endpoint: string;
}

export const apiEventsFetch = async <T>({
  endpoint,
  ...options
}: ApiEventsFetchOptions): Promise<T> => {
  try {
    const response = await fetch(`/api${endpoint}`, {
      credentials: "include",
      ...options,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "Erro desconhecido" };
      }
      throw new Error(
        errorData.message || `Erro ${response.status}: ${response.statusText}`
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro na chamada ${endpoint}:`, error);
    throw error;
  }
};