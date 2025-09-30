import { BankrollDto } from "../schema/bankroll.schema";
import { BankrollForm } from "../schema/bankrollForm.schema";

export interface BankrollFormModalProps {
  open: boolean;
  onClose: () => void;
  bankroll: BankrollForm;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave?: (bankroll: Omit<BankrollDto, "id" | "userId">) => Promise<void>;
}
