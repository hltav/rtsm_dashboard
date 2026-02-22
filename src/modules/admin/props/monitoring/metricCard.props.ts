export interface ThemeType {
  bg: string;
  paper: string;
  primary: string;
  secondary: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}


export interface RequestItem {
  id: number;
  path: string;
  method: string;
  status: number;
  duration: string;
  timestamp: string;
}

export interface ErrorItem {
  id: number;
  message: string;
  code: string;
  severity: string;
  time: string;
}



export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RecentRequest {
  id: number;
  path: string;
  method: HttpMethod;
  status: number;
  duration: string;
  timestamp: string;
}

export const getMethodColor = (method: string) => {
  switch (method) {
    case "POST":
      return "primary";
    case "GET":
      return "success";
    case "PUT":
      return "warning";
    case "DELETE":
      return "error";
    default:
      return "default";
  }
};