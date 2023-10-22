import { ScheduleStatus } from "./scheduleStatus";

export interface ScheduleServiceDTO {
  id: string;
  name: string;
}

export interface ScheduleEmployeeDTO {
  id: string;
  name: string;
}

export interface ScheduleClientDTO {
  id: string;
  name: string;
}

export interface ScheduleInputDTO {
  start_date_time: string;
  end_date_time: string;
  services: ScheduleServiceDTO[];
  client: ScheduleClientDTO;
  employee: ScheduleEmployeeDTO;
}

export interface ScheduleOutputDTO extends ScheduleInputDTO {
  id?: string;
  schedule_status: ScheduleStatus;
  confirmed_status_date_time?: Date;
  awaiting_status_date_time?: Date;
  attend_status_date_time?: Date;
  finished_status_date_time?: Date;
  estimated_time?: number;
  created_at: Date;
  updated_at?: Date;
}

export interface SchedulesUpdateParamsDTO {
  id?: string;
  start_date_time?: string;
  end_date_time?: string;
  services?: ScheduleServiceDTO[];
  client?: ScheduleClientDTO;
  employee?: ScheduleEmployeeDTO;
  schedule_status?: ScheduleStatus;
}
