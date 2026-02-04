import { SelectChangeEvent } from "@mui/material";
import { FullBet } from "../schemas/EventItem";
import { CreateBetPayload } from "../schemas/CreateBetPlay.schema";

export interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  newEvent: CreateBetPayload;
  onNewEventChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  onSave: (e: React.FormEvent) => void;
  validationErrors: Record<string, string>;
}

export interface EditEventModalProps {
  open: boolean;
  onClose: () => void;
  event: FullBet | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  onSave: (e: React.FormEvent) => void;
}

export interface EventInfoModalProps {
  open: boolean;
  onClose: () => void;
  event: FullBet | null;
}

export interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: {
    eventDescription: string;
    sports: string;
    league: string;
    market: string;
    amountRange: string;
    odd: string;
    bank: string;
    result: string;
  };
  onFilterChange: (e: SelectChangeEvent<string>) => void;
  onClearFilters: () => void;
  uniqueEvents: string[];
  uniqueSports: string[];
  uniqueLeagues: string[];
  uniqueMarkets: string[];
  amountRanges: string[];
  uniqueOdds: string[];
  uniqueBanks: string[];
}

export interface EventActionsProps {
  isMobile: boolean;
  onAddClick: () => void;
  onFilterClick: () => void;
}
