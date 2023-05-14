import { GenericStatus } from "./genericStatus";

export interface CategoryInputDTO {
  name: string;
}

export interface CategoryOutputDTO {
  id?: string;
  name: string;
  status: GenericStatus;
}
