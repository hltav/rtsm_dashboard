import { apiLoginFetch } from "../auth";

export const login = async (email: string, password: string) => {
  return apiLoginFetch({
    endpoint: "/auth/login",
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const refreshToken = async () => {
  return apiLoginFetch({
    endpoint: "/auth/refresh",
    method: "POST",
  });
};
