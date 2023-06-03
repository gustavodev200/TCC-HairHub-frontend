import { ScheduleStatus } from "./scheduleStatus";

export interface ScheduleInputDTO {
  start_time: string;
  end_time: string;
  services: string[];
  client_id: string;
  employee_id: string;
}

export interface ScheduleOutputDTO extends ScheduleInputDTO {
  id?: string;
  schedule_status: ScheduleStatus;
  estimated_time: number;
  created_at?: Date;
  updated_at?: Date;
}
