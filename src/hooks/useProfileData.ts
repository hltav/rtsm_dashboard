import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { GetUser } from "@/modules/user/schemas/user.schema";
import { UseProfileDataReturn } from "@/modules/user/types/user-data-return";
import { ClientData } from "@/modules/client-data/client-data.schema";
import { initialClientData } from "@/modules/client-data/types/initialClientData";

const useProfileData = (
  user: GetUser | null,
  token: string | null,
  onComplete?: () => void,
  setIsLoading?: (loading: boolean) => void
): UseProfileDataReturn => {
  const [clientData, setClientData] = useState<ClientData>(initialClientData);
  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [profileSaveMessage, setProfileSaveMessage] = useState<string | null>(
    null
  );
  const [isProfileSaveError, setIsProfileSaveError] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const fetchUserProfileData = useCallback(async () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const currentClientDataId = user?.clientData?.id;

    if (!apiBaseUrl || !token || !user?.id || !currentClientDataId) {
      console.warn(
        currentClientDataId
          ? "Dados básicos insuficientes (URL, token ou userId). Abortando busca de perfil."
          : "ClientData não encontrado. Usuário precisa completar o perfil."
      );
      setIsLoading?.(false);
      return;
    }

    setIsLoading?.(true);
    try {
      const response = await axios.get(
        `${apiBaseUrl}/users/${user.id}/client-data/${currentClientDataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setClientData({
        gender: data.gender,
        cpf: data.cpf,
        phone: data.phone,
        userId: data.userId,
        address: {
          neighborhood: data.address?.neighborhood,
          city: data.address?.city,
          state: data.address?.state,
        },
        image: data.image || undefined,
      });

      if (data.image) {
        setProfileImagePreview(data.image);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do perfil inicial:", error);
    } finally {
      setIsLoading?.(false);
    }
  }, [user?.id, user?.clientData?.id, token, setIsLoading]);

  useEffect(() => {
    fetchUserProfileData();
  }, [fetchUserProfileData]);

  const handleFieldChange = <K extends keyof Omit<ClientData, "address">>(
    field: K,
    value: ClientData[K]
  ) => {
    setClientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressFieldChange = (
    field: keyof NonNullable<ClientData["address"]>,
    value: string | null
  ) => {
    setClientData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id || !token) {
      setProfileSaveMessage(
        "Erro: ID do usuário ou token de autenticação ausentes."
      );
      setIsProfileSaveError(true);
      return;
    }

    setIsSavingProfile(true);
    setProfileSaveMessage(null);
    setIsProfileSaveError(false);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/client-data`,
        {
          ...clientData,
          userId: user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfileSaveMessage("Perfil atualizado com sucesso!");
      onComplete?.();
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Erro desconhecido ao salvar perfil.";

      setProfileSaveMessage(`Erro ao salvar perfil: ${errorMessage}`);
      setIsProfileSaveError(true);
    } finally {
      setIsSavingProfile(false);
    }
  };

  return {
    clientData,
    profileImagePreview,
    isSavingProfile,
    profileSaveMessage,
    isProfileSaveError,
    handleImageChange: (file: File | null) => {
      if (file) setProfileImagePreview(URL.createObjectURL(file));
    },
    handleProfileImageUploadSuccess: (imageUrl: string) => {
      setProfileImagePreview(imageUrl);
      setClientData((prev) => ({ ...prev, image: imageUrl }));
    },
    handleFieldChange,
    handleAddressFieldChange,
    handleSubmit,
    imageUploadMessage: null,
    isImageUploadError: false,
    handleOffsetChange: () => {},
    handleScaleChange: () => {},
  };
};

export default useProfileData;
