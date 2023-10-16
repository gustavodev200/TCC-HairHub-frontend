import { ErrorMessages } from "@/@types/messages";
import { AxiosResponse } from "axios";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export function errorInterceptor(error: any) {
  const res = error.response as AxiosResponse;

  if (res && res.status === 401) {
    deleteCookie("@hairhub");
    window.location.href = "/";
  } else if (res && res.data.message) {
    toast.error(res.data.message);
  } else {
    toast.error(ErrorMessages.MSGE07);
  }

  return Promise.reject(error);
}
