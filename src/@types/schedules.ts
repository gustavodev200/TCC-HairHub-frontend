import { ScheduleStatus } from "./scheduleStatus";

export interface ScheduleInputDTO {
  start_date_time: string;
  end_date_time: string;
  services: string[];
  client: string;
  employee: string;
}

export interface ScheduleOutputDTO extends ScheduleInputDTO {
  id?: string;
  schedule_status: ScheduleStatus;
  estimated_time?: number;
  created_at: Date;
  updated_at?: Date;
}

export interface SchedulesUpdateParamsDTO {
  id?: string;
  start_date_time?: string;
  end_date_time?: string;
  services?: string[];
  client?: string;
  employee?: string;
  schedule_status?: ScheduleStatus;
}
