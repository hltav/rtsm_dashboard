import { SelectChangeEvent } from "@mui/material";

export interface UserFormFieldsProps {
  isEditing: boolean;
  onTextFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  selectedState?: string;
  selectedCity?: string;
  state: string;
  city: string;
  neighborhood: string;
}
