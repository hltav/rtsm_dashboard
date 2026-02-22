export interface CriticalError {
  id: number;
  code: string;
  message: string;
  time: string;
}

export interface PerformanceReportData {
  throughput: string;
  latencyP95: number;
  successRate: number;
}

export interface PerformanceReportProps {
  period: string;
  data: PerformanceReportData;
  onExport?: () => void;
}
