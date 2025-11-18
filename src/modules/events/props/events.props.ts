import { SelectChangeEvent } from "@mui/material";
import { FullEvent } from "../schemas/EventItem";

export interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  newEvent: Omit<FullEvent, "id">;
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
  event: FullEvent | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  onSave: (e: React.FormEvent) => void;
}

export interface EventInfoModalProps {
  open: boolean;
  onClose: () => void;
  event: FullEvent | null;
}

export interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: {
    event: string;
    modality: string;
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
  uniqueModalities: string[];
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
