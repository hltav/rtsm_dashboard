import { BankrollDto } from "../schema/bankroll.schema";

export interface BankrollCardProps {
  bankroll: BankrollDto;
  onEdit: (id: number) => void;
  onViewDetails: (id: number) => void;
}
