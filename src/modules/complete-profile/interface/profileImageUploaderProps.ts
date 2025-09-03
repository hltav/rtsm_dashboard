
export interface ProfileImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  userId: number; 
  onUploadSuccess: (imageUrl: string) => void; 
  onUploadError: (error: string) => void; 
}
