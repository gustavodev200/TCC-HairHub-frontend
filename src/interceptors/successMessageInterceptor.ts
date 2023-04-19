import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export function successMessageInterceptor(res: AxiosResponse) {
  const successMessage = res.config.headers["success-message"];

  if (successMessage) {
    toast.success(successMessage);
  }

  return res;
}
