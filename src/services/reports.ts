import { ReportsDTO } from "@/@types/reports";
import Api from "./api";

const baseUrl = "/reports";

async function getReports(
  startDate: string,
  endDate: string,
  barberId?: string
): Promise<ReportsDTO> {
  return Api.get(`${baseUrl}`, {
    params: {
      startDate,
      endDate,
      barberId,
    },
    headers: { authHeader: true },
  }).then((res) => res.data);
}

export const reportService = {
  getReports,
};
