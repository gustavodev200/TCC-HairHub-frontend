import { ErrorMessages } from "@/@types/messages";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export function errorInterceptor(error: any) {
  const res = error.response as AxiosResponse;

  if (res && res.data.message) {
    toast.error(res.data.message);
  } else {
    toast.error(ErrorMessages.MSGE07);
  }

  return Promise.reject(error);
}
