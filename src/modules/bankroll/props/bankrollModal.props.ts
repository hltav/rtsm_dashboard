import { SelectChangeEvent } from "@mui/material";
import { BankrollEditItem, BankrollItem } from "../interface/bankrollItem.interface";

export interface BankrollEditModalProps {
  open: boolean;
  onClose: () => void;
  bankrollItemModal: BankrollEditItem | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  onSave: (e: React.FormEvent) => void;
}


export interface BankrollInfoModalProps {
  open: boolean;
  onClose: () => void;
  bankrollModal: BankrollItem | null;
}