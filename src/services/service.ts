import { IService, IServiceInputDTO } from "@/@types/service";
import { GenericStatus } from "@/@types/genericStatus";
import {
  PaginatedDataResponse,
  PaginatedRequestParams,
} from "@/@types/paginatedData";
import Api from "./api";
import { SuccessMessages } from "@/@types/messages";

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
  return Api.patch(
    `${baseUrl}/${id}`,
    { status },
    {
      headers: {
        "success-message": SuccessMessages.MSGS04,
      },
    }
  ).then((res) => res.data);
}

async function createService(data: IServiceInputDTO): Promise<IService> {
  return Api.post(`${baseUrl}`, data, {
    headers: {
      "success-message": SuccessMessages.MSGS03,
    },
  }).then((res) => res.data);
}

async function editService(data: FormData): Promise<IService> {
  return Api.put(`${baseUrl}/${data.get("id")}`, data, {
    headers: {
      "success-message": SuccessMessages.MSGS02,
    },
  }).then((res) => res.data);
}

export const serviceApi = {
  getPaginated,
  changeStatus,
  createService,
  editService,
};
