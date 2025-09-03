import { SelectChangeEvent } from "@mui/material";
import { EventItem } from "../interfaces/EventItem";

export interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  newEvent: Omit<EventItem, "id">;
  onNewEventChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  onSave: (e: React.FormEvent) => void;
}


export interface EditEventModalProps {
  open: boolean;
  onClose: () => void;
  event: EventItem | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  onSave: (e: React.FormEvent) => void;
}

export interface EventInfoModalProps {
  open: boolean;
  onClose: () => void;
  event: EventItem | null;
}

export interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: {
    category: string;
    eventType: string;
    event: string;
    market: string;
    amountRange: string;
    result: string;
  };
  onFilterChange: (e: SelectChangeEvent<string>) => void;
  onClearFilters: () => void;
  uniqueCategories: string[];
  uniqueEventTypes: string[];
  uniqueEvents: string[];
  uniqueMarkets: string[];
  amountRanges: string[];
}


export interface EventActionsProps {
  isMobile: boolean;
  onAddClick: () => void;
  onFilterClick: () => void;
}