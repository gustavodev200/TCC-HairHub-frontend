import { Client } from "@/@types/client";
import {
  PaginatedDataResponse,
  PaginatedRequestParams,
} from "@/@types/paginatedData";
import Api from "./api";
import { SuccessMessages } from "@/@types/messages";
import { GenericStatus } from "@/@types/genericStatus";

const baseUrl = "/clients";

async function getPaginated(
  params?: PaginatedRequestParams
): Promise<PaginatedDataResponse<Client>> {
  return Api.get(baseUrl, { params, headers: { authHeader: true } }).then(
    (res) => res.data
  );
}

async function getAllClients(): Promise<Client[]> {
  return Api.get(`${baseUrl}/all`, {
    headers: { authHeader: true },
  }).then((res) => res.data);
}

async function create(data: Client): Promise<Client> {
  return Api.post(baseUrl, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS01 },
  }).then((res) => res.data);
}

async function update(data: Client): Promise<Client> {
  return Api.put(`${baseUrl}/${data.id}`, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS02 },
  }).then((res) => res.data);
}

async function changeStatus(
  id: string,
  status: GenericStatus
): Promise<Client> {
  return Api.patch(
    `${baseUrl}/${id}`,
    { status },
    { headers: { authHeader: true, "success-message": SuccessMessages.MSGS03 } }
  ).then((res) => res.data);
}

async function resetPassword(id: string): Promise<Client> {
  return Api.put(
    `${baseUrl}/${id}/reset-password`,
    {},
    {
      headers: { authHeader: true, "success-message": SuccessMessages.MSGS05 },
    }
  ).then((res) => res.data);
}

export const clientService = {
  getPaginated,
  create,
  update,
  changeStatus,
  resetPassword,
  getAllClients,
};
