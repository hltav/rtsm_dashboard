
export interface ProfileImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  onUploadSuccess: (imageUrl: string) => void; 
  onUploadError: (error: string) => void; 
}
