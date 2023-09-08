import { ScheduleOutputDTO } from "@/@types/schedules";
import {
  PaginatedDataResponseSchedule,
  PaginatedRequestParamsSchedule,
} from "@/@types/paginatedData";
import Api from "./api";

const baseUrl = "/schedulings";

async function getPaginated(
  params?: PaginatedRequestParamsSchedule
): Promise<PaginatedDataResponseSchedule<ScheduleOutputDTO>> {
  return Api.get(baseUrl, { params, headers: { authHeader: true } }).then(
    (res) => res.data
  );
}

// async function create(data: Employee): Promise<Employee> {
//     return Api.post(baseUrl, data, {
//       headers: { authHeader: true, "success-message": SuccessMessages.MSGS01 },
//     }).then((res) => res.data);
//   }

//   async function update(data: Employee): Promise<Employee> {
//     return Api.put(`${baseUrl}/${data.id}`, data, {
//       headers: { authHeader: true, "success-message": SuccessMessages.MSGS02 },
//     }).then((res) => res.data);
//   }

//   async function changeStatus(
//     id: string,
//     status: GenericStatus
//   ): Promise<Employee> {
//     return Api.patch(
//       `${baseUrl}/${id}`,
//       { status },
//       { headers: { authHeader: true, "success-message": SuccessMessages.MSGS03 } }
//     ).then((res) => res.data);
//   }

export const scheduleService = {
  getPaginated,
  // create,
  // update,
  // changeStatus,
};
