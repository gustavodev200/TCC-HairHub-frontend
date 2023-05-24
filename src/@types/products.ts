import { GenericStatus } from "./genericStatus";

export interface ProductsInputDTO {
  name: string;
  price: number;
  description: string;
  amount: number;
}

export interface Products extends ProductsInputDTO {
  id?: number;
  status?: GenericStatus;
  category_id?: string;
}
