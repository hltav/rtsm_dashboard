// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const customError = {
//       status: error.response?.status,
//       message: error.response?.data?.message || "Erro inesperado",
//     };
//     return Promise.reject(customError);
//   }
// );

// export default apiClient;

import axios from "axios";
import { refreshTokenService } from "./auth/login/loginApi";


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Controle de refresh em andamento
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Detecta expiração
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Se já tem um refresh em andamento, adiciona a request na fila
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      // Marca que já tentamos refresh nesta request
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshTokenService(); // Pede novos tokens

        processQueue(null); // Libera a fila
        return apiClient(originalRequest); // Reexecuta a request original
      } catch (refreshError) {
        processQueue(refreshError, null); // Rejeita todas na fila

        if (typeof window !== "undefined") {
          window.location.href = "/login"; // Se não conseguiu refresh → login
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Mantém o tratamento customizado de erros
    const customError = {
      status: error.response?.status,
      message: error.response?.data?.message || "Erro inesperado",
    };
    return Promise.reject(customError);
  }
);

export default apiClient;
