import { ScheduleStatus } from "./scheduleStatus";

export interface AverageRatingReport {
  id: string;
  name: string;
  average: number;
}

export interface DetailedTotalReport extends TotalReports {
  id: string;
  name: string;
}

export interface TotalReports {
  total: number;
  porcentage: number;
}

export interface AverageTimeReport {
  average: number;
  porcentage: number;
}

export interface TotalSchedulesByStatus {
  total: number;
  status: ScheduleStatus;
}

export interface ReportsDTO {
  totalSchedulesByStatus: TotalSchedulesByStatus[];
  averageWaitingTime: AverageTimeReport;
  totalSchedules: TotalReports;
  averageServiceTime: AverageTimeReport;
  executedServicesByBarber?: DetailedTotalReport[];
  averageRatingByBarber?: AverageRatingReport[];
  totalRevenue?: TotalReports;
  mostUsedPaymentMethods?: DetailedTotalReport[];
  averageRating?: AverageRatingReport;
  mostUsedServices?: DetailedTotalReport[];
}
