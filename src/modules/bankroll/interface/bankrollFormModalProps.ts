import { BankrollDto } from "../schema/bankroll.schema";

type BankrollFormData =
  | Partial<BankrollDto>
  | Omit<BankrollDto, "id" | "userId">;

export interface BankrollFormModalProps {
  open: boolean;
  onClose: () => void;
  bankroll: BankrollFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSave?: (bankroll: Omit<BankrollDto, "id" | "userId">) => Promise<void>;
}
