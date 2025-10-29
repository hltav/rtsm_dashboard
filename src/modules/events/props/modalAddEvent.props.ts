import { SelectChangeEvent } from "@mui/material";
import { AddEventModalProps } from "./events.props";

export interface EventBasicInfoProps {
  newEvent: AddEventModalProps["newEvent"];
  onNewEventChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: SelectChangeEvent<string>) => void;
  validationErrors: Record<string, string>;
}

export interface EventResultSelectProps {
  newEvent: AddEventModalProps["newEvent"];
  onSelectChange: (event: SelectChangeEvent<string>) => void;
  onOddChange: (odd: string) => void;
  validationErrors: Record<string, string>;
}

export interface EventDetailsProps {
  newEvent: AddEventModalProps["newEvent"];
  onNewEventChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationErrors: Record<string, string>;
}

export interface LeagueResponse {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
  seasons: {
    year: number;
    start: string;
    end: string;
    current: boolean;
    coverage: {
      fixtures: {
        events: boolean;
        lineups: boolean;
        statistics_fixtures: boolean;
        statistics_players: boolean;
      };
      standings: boolean;
      players: boolean;
      top_scorers: boolean;
      top_assists: boolean;
      top_cards: boolean;
      injuries: boolean;
      predictions: boolean;
      odds: boolean;
    };
  }[];
}

export interface ApiLeaguesResponse {
  response: LeagueResponse[];
}

export interface ModalEventActionsProps {
  onClose: () => void;
}
