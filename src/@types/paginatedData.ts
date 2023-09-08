import { GenericStatus } from "./genericStatus";
import { ScheduleStatus } from "./scheduleStatus";

export interface PaginatedRequestParams {
  query?: string;
  page?: number;
  pageSize?: number;
  filterByStatus?: GenericStatus;
}

export interface PaginatedRequestParamsSchedule {
  query?: string;
  page?: number;
  pageSize?: number;
  filterByStatus?: ScheduleStatus;
}

export interface PaginatedDataResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  query?: string;
  filterByStatus?: GenericStatus;
}

export interface PaginatedDataResponseSchedule<T> {
  data: T[];
  page: number;
  totalPages: number;
  query?: string;
  filterByStatus?: ScheduleStatus;
}
