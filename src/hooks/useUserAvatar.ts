import { imageApi } from "@/lib/api/image/apiImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserAvatar(userId?: number) {
  const queryClient = useQueryClient();

  const avatarQuery = useQuery({
    queryKey: ["user-avatar", userId],
    queryFn: () => imageApi.getAvatar(userId!),
    enabled: !!userId,
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => imageApi.uploadAvatar(userId!, file),
    onSuccess: (data) => {
      queryClient.setQueryData(["user-avatar", userId], data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => imageApi.deleteAvatar(userId!),
    onSuccess: () => {
      queryClient.setQueryData(["user-avatar", userId], { url: null });
    },
  });

  return {
    avatarUrl: avatarQuery.data?.url,
    isLoading: avatarQuery.isLoading,
    uploadAvatar: uploadMutation.mutateAsync,
    deleteAvatar: deleteMutation.mutateAsync,
  };
}
