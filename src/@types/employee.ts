import { AddressInputDTO } from "./address";
import { GenericStatus } from "./genericStatus";
import { AssignmentType } from "./role";
import { ShiftInputDTO } from "./shifts";

export interface EmployeeInputDTO {
  name: string;
  cpf: string;
  dataNasc: string;
  phone: string;
  email: string;
  role: AssignmentType;
  address: AddressInputDTO;
  shifts: ShiftInputDTO[];
}

export interface Employee extends EmployeeInputDTO {
  id?: string;
  status: GenericStatus;
}
