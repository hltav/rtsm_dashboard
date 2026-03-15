import apiClient from "../apiBaseUrl";

export const imageApi = {
  getAvatar: async () => {
    const { data } = await apiClient.get("/users-avatar", {
      withCredentials: true,
    });
    return data;
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await apiClient.post("/users-avatar", formData, {
      withCredentials: true,
    });

    return data;
  },

  deleteAvatar: async () => {
    const { data } = await apiClient.delete("/users-avatar", {
      withCredentials: true,
    });
    return data;
  },
};
