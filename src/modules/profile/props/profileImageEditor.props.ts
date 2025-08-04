import { ChangeEvent } from 'react';

export interface ProfileImageEditorProps {
  profileImage: string;
  isEditing: boolean;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}