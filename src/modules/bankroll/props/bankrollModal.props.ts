import { SelectChangeEvent } from "@mui/material";
import { BankrollItem } from "../interface/bankrollItem.interface";

export interface BankrollModalProps {
  open: boolean;
  onClose: () => void;
  bankrollModal: BankrollItem | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  onSave: (e: React.FormEvent) => void;
}