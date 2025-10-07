import axios from "axios";
import { refreshTokenService } from "./auth/login/loginApi";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: ((token?: string) => void)[] = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((callback) => callback(error ? undefined : undefined));
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 404) {
      return Promise.reject({
        status: error.response?.status,
        message: error.response?.data?.message || "Recurso não encontrado",
      });
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(() => resolve(apiClient(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshTokenService();
        processQueue();
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(new Error("Refresh failed"));

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || "Erro inesperado",
    });
  }
);

export default apiClient;
