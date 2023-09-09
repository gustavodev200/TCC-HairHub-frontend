import { AddressDTO, AddressInputDTO } from "./address";
import { GenericStatus } from "./genericStatus";
import { AssignmentType } from "./role";
import { ScheduleOutputDTO } from "./schedules";
import { ShiftInputDTO, ShiftOutputDTO } from "./shifts";

export interface EmployeeInputDTO {
  name: string;
  cpf: string;
  dataNasc: string;
  phone: string;
  email: string;
  role: AssignmentType;
  address: AddressInputDTO;
  shifts: ShiftOutputDTO[];
}

export interface Employee extends EmployeeInputDTO {
  id?: string;
  status: GenericStatus;
}

export interface EmployeeOutputDTO {
  id: string;
  name: string;
  image?: string;
  cpf: string;
  dataNasc: string;
  phone: string;
  email: string;
  status: GenericStatus;
  role: AssignmentType;
  address: AddressDTO;
  shifts: ShiftInputDTO[];
  adress_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface EmployeeOutputWithSchedulesDTO {
  id: string;
  name: string;
  image?: string;
  cpf: string;
  dataNasc: string;
  phone: string;
  email: string;
  status: GenericStatus;
  role: AssignmentType;
  address: AddressDTO;
  shifts: ShiftInputDTO[];
  schedules: ScheduleOutputDTO[];
}
