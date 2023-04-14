import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export function successMessageInterceptor(res: AxiosResponse) {
  const { successMessage } = res.headers;

  if (successMessage) {
    toast.success(successMessage);
  }

  return res;
}
