import { AddressInputDTO } from "./address";
import { GenericStatus } from "./genericStatus";
import { AssignmentType } from "./role";

export interface ClientInputDTO {
  name: string;
  cpf: string;
  dataNasc: string;
  phone: string;
  email: string;
  role: AssignmentType;
  address: AddressInputDTO;
}

export interface Client extends ClientInputDTO {
  id?: string;
  status: GenericStatus;
}
