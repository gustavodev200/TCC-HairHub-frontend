import { Dayjs } from "dayjs";

export enum AvailableDays {
  MONDAY = "Seg",
  TUESDAY = "Ter",
  WEDNESDAY = "Qua",
  THURSDAY = "Qui",
  FRIDAY = "Sex",
  SATURDAY = "Sáb",
  SUNDAY = "Dom",
}

export interface ShiftInputDTO {
  start_time: string;
  end_time: string;
  available_days: number[];
}

export interface ShiftOutputDTO extends ShiftInputDTO {
  id?: string;
}

export interface ShiftNotAvailableDays {
  id?: string;
  start_time: string;
  end_time: string;
}

export interface ShiftFormDTO {
  start_time: Dayjs;
  end_time: Dayjs;
  available_days: number[];
  shifts: ShiftInputDTO[];
}
