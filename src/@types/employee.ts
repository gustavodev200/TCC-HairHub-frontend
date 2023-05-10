import { AddressInputDTO } from "./address";
import { GenericStatus } from "./genericStatus";
import { AssignmentType } from "./role";

export interface EmployeeInputDTO {
  name: string;
  cpf: string;
  dataNasc: string;
  phone: string;
  email: string;
  role: AssignmentType;
  address: AddressInputDTO;
}

export interface Employee extends EmployeeInputDTO {
  id?: string;
  status: GenericStatus;
}
