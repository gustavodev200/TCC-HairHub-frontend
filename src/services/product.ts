import { GenericStatus } from "@/@types/genericStatus";
import { Products, ProductsInputDTO } from "@/@types/products";
import Api from "./api";
import { SuccessMessages } from "@/@types/messages";

const baseUrl = "/products";

async function changeStatus(
  id: string,
  status: GenericStatus
): Promise<Products> {
  return Api.patch(
    `${baseUrl}/${id}`,
    { status },
    {
      headers: {
        authHeader: true,
        "success-message": SuccessMessages.MSGS03,
      },
    }
  ).then((res) => res.data);
}

async function createProduct(data: ProductsInputDTO): Promise<Products> {
  return Api.post(`${baseUrl}`, data, {
    headers: {
      authHeader: true,
      "success-message": SuccessMessages.MSGS04,
    },
  }).then((res) => res.data);
}

async function editProduct(data: Products): Promise<Products> {
  return Api.put(`${baseUrl}/${data.id}`, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS02 },
  }).then((res) => res.data);
}

export const productService = {
  changeStatus,
  createProduct,
  editProduct,
};
