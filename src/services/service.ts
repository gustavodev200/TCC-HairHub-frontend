import { IService } from "@/@types/service";
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

export const serviceApi = { getPaginated, changeStatus };
