import { GenericStatus } from "./genericStatus";

export interface IServiceInputDTO {
  name: string;
  image: string;
  time: number;
  price: number;
}

export interface IService {
  id?: string;
  name: string;
  image: string;
  time: number;
  price: number;
  status: GenericStatus;
}
