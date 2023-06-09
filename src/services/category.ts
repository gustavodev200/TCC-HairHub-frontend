import { CategoryInputDTO, CategoryOutputDTO } from "@/@types/category";
import {
  PaginatedDataResponse,
  PaginatedRequestParams,
} from "@/@types/paginatedData";
import Api from "./api";
import { SuccessMessages } from "@/@types/messages";
import { GenericStatus } from "@/@types/genericStatus";
import { CategoriesWithProducts } from "@/@types/categoriesWithProducts";

const baseUrl = "/categories";

async function list(
  params?: PaginatedRequestParams
): Promise<CategoryOutputDTO[]> {
  return Api.get(`${baseUrl}/list`, {
    params,
    headers: { authHeader: true },
  }).then((res) => res.data);
}

async function getPaginated(
  params?: PaginatedRequestParams
): Promise<PaginatedDataResponse<CategoryOutputDTO>> {
  return Api.get(baseUrl, { params, headers: { authHeader: true } }).then(
    (res) => res.data
  );
}

async function listProductsWithCategories(
  params?: PaginatedRequestParams
): Promise<CategoriesWithProducts[]> {
  return Api.get(`${baseUrl}/products`, {
    params,
    headers: { authHeader: true },
  }).then((res) => res.data);
}

async function create(data: CategoryInputDTO): Promise<CategoryOutputDTO> {
  return Api.post(baseUrl, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS01 },
  }).then((res) => res.data);
}

async function update(data: CategoryOutputDTO): Promise<CategoryOutputDTO> {
  return Api.put(`${baseUrl}/${data.id}`, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS02 },
  }).then((res) => res.data);
}

async function changeStatus(
  id: string,
  status: GenericStatus
): Promise<CategoryOutputDTO> {
  return Api.patch(
    `${baseUrl}/${id}`,
    { status },
    { headers: { authHeader: true, "success-message": SuccessMessages.MSGS03 } }
  ).then((res) => res.data);
}

export const categoryService = {
  list,
  getPaginated,
  listProductsWithCategories,
  create,
  update,
  changeStatus,
};
