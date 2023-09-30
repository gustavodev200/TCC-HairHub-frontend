import { SuccessMessages } from "@/@types/messages";
import Api from "./api";
import {
  PaginatedDataResponse,
  PaginatedRequestParams,
  PaginatedRequestParamsSchedule,
} from "@/@types/paginatedData";
import { Employee, EmployeeOutputWithSchedulesDTO } from "@/@types/employee";
import { GenericStatus } from "@/@types/genericStatus";

const baseUrl = "/employees";

async function getOnlyBarbers(): Promise<EmployeeOutputWithSchedulesDTO[]> {
  return Api.get(`${baseUrl}/barbers-with-schedule`, {
    headers: { authHeader: true },
  }).then((res) => res.data);
}

async function getAllBarbers(): Promise<EmployeeOutputWithSchedulesDTO[]> {
  return Api.get(`${baseUrl}/all-barbers`, {
    headers: { authHeader: true },
  }).then((res) => res.data);
}

async function getPaginated(
  params?: PaginatedRequestParams
): Promise<PaginatedDataResponse<Employee>> {
  return Api.get(baseUrl, { params, headers: { authHeader: true } }).then(
    (res) => res.data
  );
}

async function create(data: Employee): Promise<Employee> {
  return Api.post(baseUrl, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS01 },
  }).then((res) => res.data);
}

async function update(data: Employee): Promise<Employee> {
  return Api.put(`${baseUrl}/${data.id}`, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS02 },
  }).then((res) => res.data);
}

async function changeStatus(
  id: string,
  status: GenericStatus
): Promise<Employee> {
  return Api.patch(
    `${baseUrl}/${id}`,
    { status },
    { headers: { authHeader: true, "success-message": SuccessMessages.MSGS03 } }
  ).then((res) => res.data);
}

async function resetPassword(id: string): Promise<Employee> {
  return Api.put(
    `${baseUrl}/${id}/reset-password`,
    {},
    {
      headers: { authHeader: true, "success-message": SuccessMessages.MSGS05 },
    }
  ).then((res) => res.data);
}

export const employeeService = {
  getOnlyBarbers,
  getAllBarbers,
  getPaginated,
  create,
  update,
  changeStatus,
  resetPassword,
};
