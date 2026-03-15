import { imageApi } from "@/lib/api/image/apiImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserAvatar() {
  const queryClient = useQueryClient();

  const queryKey = ["user-avatar"]; // 🔹 chave fixa baseada na sessão

  const avatarQuery = useQuery({
    queryKey,
    queryFn: () => imageApi.getAvatar(),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => imageApi.uploadAvatar(file),

    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => imageApi.deleteAvatar(),

    onSuccess: () => {
      queryClient.setQueryData(queryKey, {
        url: null,
      });
    },
  });

  return {
    avatarUrl: avatarQuery.data?.url ?? null,
    isLoading:
      avatarQuery.isLoading ||
      uploadMutation.isPending ||
      deleteMutation.isPending,
    uploadAvatar: uploadMutation.mutateAsync,
    deleteAvatar: deleteMutation.mutateAsync,
  };
}
