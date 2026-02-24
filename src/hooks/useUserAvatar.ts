// import { imageApi } from "@/lib/api/image/apiImage";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export function useUserAvatar(userId?: number) {
//   const queryClient = useQueryClient();

//   const avatarQuery = useQuery({
//     queryKey: ["user-avatar", userId],
//     queryFn: () => imageApi.getAvatar(),
//     enabled: !!userId,
//   });

//   const uploadMutation = useMutation({
//     mutationFn: (file: File) => imageApi.uploadAvatar(file),
//     onSuccess: (data) => {
//       queryClient.setQueryData(["user-avatar", userId], data);
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: () => imageApi.deleteAvatar(),
//     onSuccess: () => {
//       queryClient.setQueryData(["user-avatar", userId], { url: null });
//     },
//   });

//   return {
//     avatarUrl: avatarQuery.data?.url,
//     isLoading: avatarQuery.isLoading,
//     uploadAvatar: uploadMutation.mutateAsync,
//     deleteAvatar: deleteMutation.mutateAsync,
//   };
// }

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
