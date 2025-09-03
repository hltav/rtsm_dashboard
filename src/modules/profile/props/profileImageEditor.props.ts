export interface ProfileImageEditorProps {
  profileImage: string;
  profileFileId?: string;
  isEditing: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
