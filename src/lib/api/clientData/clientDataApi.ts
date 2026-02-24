// import { ClientData } from "@/modules/client-data/client-data.schema";
// import axios from "axios";
// import apiClient from "../apiBaseUrl";

// export const clientDataService = {
//   create: async (data: ClientData) => {
//     try {
//       const res = await apiClient.post("/client-data", data, {
//         withCredentials: true,
//       });
//       return { success: true, data: res.data };
//     } catch (error: unknown) {
//       let message = "Erro ao criar clientData";

//       if (axios.isAxiosError(error)) {
//         message =
//           error.response?.data?.message ||
//           error.response?.data?.error ||
//           message;
//         console.error(message);
//       }

//       throw new Error(message);
//     }
//   },

//   // get: async (userId: number, clientDataId: number) => {
//   //   try {
//   //     const res = await apiClient.get(
//   //       `/users/${userId}/client-data/${clientDataId}`,
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     );
//   //     return { success: true, data: res.data };
//   //   } catch (error: unknown) {
//   //     let message = "Erro ao buscar clientData";

//   //     if (axios.isAxiosError(error)) {
//   //       message =
//   //         error.response?.data?.message ||
//   //         error.response?.data?.error ||
//   //         message;
//   //       console.error(message);
//   //     }

//   //     throw new Error(message);
//   //   }
//   // },
//   get: async () => {
//     try {
//       // Rota simplificada: o backend usa o ID do token JWT
//       const res = await apiClient.get("/client-data/me", {
//         withCredentials: true,
//       });
//       return { success: true, data: res.data };
//     } catch (error: unknown) {
//       throw handleAxiosError(error, "Erro ao buscar dados do perfil");
//     }
//   },

//   update: async (id: number, data: ClientData) => {
//     try {
//       const res = await apiClient.put(`/client-data/${id}`, data, {
//         withCredentials: true,
//       });

//       return { success: true, data: res.data };
//     } catch (error: unknown) {
//       let message = "Erro ao atualizar clientData";

//       if (axios.isAxiosError(error)) {
//         message =
//           error.response?.data?.message ||
//           error.response?.data?.error ||
//           message;
//       }

//       throw new Error(message);
//     }
//   },

//   delete: async (id: number) => {
//     try {
//       const res = await apiClient.delete(`/client-data/${id}`, {
//         withCredentials: true,
//       });
//       return { success: true, data: res.data };
//     } catch (error: unknown) {
//       let message = "Erro ao deletar clientData";

//       if (axios.isAxiosError(error)) {
//         message =
//           error.response?.data?.message ||
//           error.response?.data?.error ||
//           message;
//         console.error(message);
//       }

//       throw new Error(message);
//     }
//   },
// };

// const handleAxiosError = (error: unknown, defaultMessage: string) => {
//   let message = defaultMessage;
//   if (axios.isAxiosError(error)) {
//     message =
//       error.response?.data?.message ||
//       error.response?.data?.error ||
//       defaultMessage;
//   }
//   return new Error(message);
// };

import { ClientData } from "@/modules/client-data/client-data.schema";
import axios from "axios";
import apiClient from "../apiBaseUrl";

export const clientDataService = {
  // 🔹 UPSERT (cria ou atualiza)
  create: async (data: ClientData) => {
    try {
      const res = await apiClient.post("/client-data", data, {
        withCredentials: true,
      });

      return { success: true, data: res.data };
    } catch (error: unknown) {
      throw handleAxiosError(error, "Erro ao salvar dados do perfil");
    }
  },

  // 🔹 Buscar dados do usuário logado
  get: async () => {
    try {
      const res = await apiClient.get("/client-data/me", {
        withCredentials: true,
      });

      return { success: true, data: res.data };
    } catch (error: unknown) {
      throw handleAxiosError(error, "Erro ao buscar dados do perfil");
    }
  },

  // 🔹 Update separado (opcional se quiser manter PUT)
  update: async (data: ClientData) => {
    try {
      const res = await apiClient.put("/client-data", data, {
        withCredentials: true,
      });

      return { success: true, data: res.data };
    } catch (error: unknown) {
      throw handleAxiosError(error, "Erro ao atualizar perfil");
    }
  },
};

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  let message = defaultMessage;

  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      defaultMessage;
  }

  return new Error(message);
};
