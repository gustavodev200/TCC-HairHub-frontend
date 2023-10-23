import {
  ConsumptionInputDTO,
  ConsumptionOutputDTO,
} from "@/@types/Consumption";
import Api from "./api";
import { SuccessMessages } from "@/@types/messages";

const baseUrl = "/consumptions";

async function createConsumption(
  data: ConsumptionInputDTO
): Promise<ConsumptionOutputDTO> {
  return Api.post(`${baseUrl}`, data, {
    headers: {
      authHeader: true,
      "success-message": SuccessMessages.MSGS04,
    },
  }).then((res) => res.data);
}

async function update(
  data: ConsumptionOutputDTO
): Promise<ConsumptionOutputDTO> {
  return Api.put(`${baseUrl}/${data.id}`, data, {
    headers: { authHeader: true, "success-message": SuccessMessages.MSGS02 },
  }).then((res) => res.data);
}

export const consumptionApi = {
  createConsumption,
  update,
};
