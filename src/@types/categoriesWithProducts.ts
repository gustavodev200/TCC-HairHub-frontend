import { GenericStatus } from "./genericStatus";
import { Products } from "./products";

export interface CategoriesWithProducts {
  id?: string;
  name: string;
  status: GenericStatus;
  products: Products[];
}
