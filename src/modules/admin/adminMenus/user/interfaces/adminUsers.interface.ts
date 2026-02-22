export type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: "active" | "suspended";
  isNew: boolean;
  isOnline: boolean;
  avatar: string;
  createdAt: string;
  lastLogin: string;
  location: string;
}

export interface ThemeType {
  bg: string;
  paper: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  success: string;
  error: string;
  border: string;
  gradient: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  theme: ThemeType;
  showProgress?: boolean;
}

export interface UserMenuProps {
  anchorEl: HTMLElement | null;
  user: User | null;
  onClose: () => void;
  theme: ThemeType;
}