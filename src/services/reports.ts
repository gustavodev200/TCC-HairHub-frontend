import { ReportsDTO } from "@/@types/reports";
import Api from "./api";

const baseUrl = "/reports";

async function getReports(
  startDate: string,
  endDate: string
): Promise<ReportsDTO> {
  const url = `${baseUrl}?startDate=${startDate}&endDate=${endDate}`;

  return Api.get(url, {
    headers: { authHeader: true },
  }).then((res) => res.data);
}

export const reportService = {
  getReports,
};
