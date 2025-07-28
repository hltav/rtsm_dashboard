
export interface ProfileImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  imageOffsetX: number;
  imageOffsetY: number;
  imageScale: number;
  onOffsetChange: (x: number, y: number) => void;
  onScaleChange: (scale: number) => void;
  userId: number; 
  authToken: string; 
  onUploadSuccess: (imageUrl: string) => void; 
  onUploadError: (error: string) => void; 
}
