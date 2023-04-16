import { IService, IServiceInputDTO } from "@/@types/service";
import { GenericStatus } from "@/@types/genericStatus";
import {
  PaginatedDataResponse,
  PaginatedRequestParams,
} from "@/@types/paginatedData";
import Api from "./api";

const baseUrl = "/services";

async function getPaginated(
  params?: PaginatedRequestParams
): Promise<PaginatedDataResponse<IService>> {
  return Api.get(baseUrl, { params }).then((res) => res.data);
}

async function changeStatus(
  id: string,
  status: GenericStatus
): Promise<IService> {
  return Api.patch(`${baseUrl}/${id}`, { status }).then((res) => res.data);
}

async function createService(params: IServiceInputDTO): Promise<IService> {
  return Api.post(`${baseUrl}`, { params }).then((res) => res.data);
}

async function editService(id: string): Promise<IService> {
  return Api.put(`${baseUrl}/${id}`, { id }).then((res) => res.data);
}

export const serviceApi = {
  getPaginated,
  changeStatus,
  createService,
  editService,
};
