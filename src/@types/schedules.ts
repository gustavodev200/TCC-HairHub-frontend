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
