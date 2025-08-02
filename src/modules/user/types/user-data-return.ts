import { ClientData } from "@/modules/client-data/client-data.schema";

export interface UseProfileDataReturn {
  clientData: ClientData;
  profileImagePreview: string;
  imageUploadMessage: string | null;
  isImageUploadError: boolean;
  profileSaveMessage: string | null;
  isProfileSaveError: boolean;
  isSavingProfile: boolean;
  handleImageChange: (file: File | null) => void;
  handleOffsetChange: (x: number, y: number) => void;
  handleScaleChange: (scale: number) => void;
  handleProfileImageUploadSuccess: (imageUrl: string) => void;
  handleFieldChange: <K extends keyof Omit<ClientData, "address">>(
    field: K,
    value: ClientData[K]
  ) => void;
  handleAddressFieldChange: (
    field: keyof NonNullable<ClientData["address"]>,
    value: string | null
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}
