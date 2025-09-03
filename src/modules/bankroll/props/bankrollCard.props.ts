import { BankrollDto } from "../schema/bankroll.schema";

export interface BankrollCardProps {
  bankroll: BankrollDto;
  onEdit: (id: string) => void;
  onViewDetails: (id: string) => void;
}
