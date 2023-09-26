import {
  ScheduleInputDTO,
  ScheduleOutputDTO,
  SchedulesUpdateParamsDTO,
} from "@/@types/schedules";
import {
  PaginatedDataResponseSchedule,
  PaginatedRequestParamsSchedule,
} from "@/@types/paginatedData";
import Api from "./api";
import { SuccessMessages } from "@/@types/messages";
import { ScheduleStatus } from "@/@types/scheduleStatus";

const baseUrl = "/schedulings";

async function getPaginated(
  params?: PaginatedRequestParamsSchedule
): Promise<PaginatedDataResponseSchedule<ScheduleOutputDTO>> {
  return Api.get(baseUrl, { params, headers: { authHeader: true } }).then(
    (res) => res.data
  );
}

async function create(data: ScheduleInputDTO): Promise<ScheduleOutputDTO> {
  return Api.post(baseUrl, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS01 },
  }).then((res) => res.data);
}

async function update(
  data: SchedulesUpdateParamsDTO
): Promise<ScheduleOutputDTO> {
  return Api.put(`${baseUrl}/${data.id}`, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS02 },
  }).then((res) => res.data);
}

async function changeStatus(
  id: string,
  schedule_status: ScheduleStatus
): Promise<ScheduleOutputDTO> {
  return Api.patch(
    `${baseUrl}/${id}`,
    { schedule_status },
    { headers: { authHeader: true, "success-message": SuccessMessages.MSGS03 } }
  ).then((res) => res.data);
}

export const scheduleService = {
  getPaginated,
  create,
  update,
  changeStatus,
};
