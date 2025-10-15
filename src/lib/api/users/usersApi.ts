import { GetUser } from "@/modules/user/schemas/user.schema";
import apiClient from "../apiBaseUrl";
import { UploadProfileData } from "@/modules/user/schemas/editableUserInfoProps.schema";

export const userApi = {
  async getUserById(userId: number): Promise<GetUser> {
    const response = await apiClient.get<GetUser>(`/users/${userId}`);
    return response.data;
  },

  async updateDataUser(
    userId: number,
    data: Partial<UploadProfileData>
  ): Promise<GetUser> {
    const response = await apiClient.put<GetUser>(`/users/${userId}`, data);
    return response.data;
  },
};
