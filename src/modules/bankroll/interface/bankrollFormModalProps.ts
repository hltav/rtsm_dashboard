import { BankrollForm } from "../schema/bankrollForm.schema";

export interface BankrollFormModalProps {
  open: boolean;
  onClose: () => void;
  bankroll: BankrollForm;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
