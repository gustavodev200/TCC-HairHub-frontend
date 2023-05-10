import { ErrorMessages } from "@/@types/messages";
import { useUser } from "@/stores/useUser";
import { InternalAxiosRequestConfig } from "axios";

export const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const needsToAuth = config.headers?.authHeader !== undefined;

  if (needsToAuth) {
    try {
      const { accessToken } = useUser.getState();

      if (!accessToken) throw new Error(ErrorMessages.MSGE12);

      const newConfig: any = {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
      };

      delete newConfig.headers["authHeader"];

      return newConfig;
    } catch {
      useUser.setState({ accessToken: undefined });
    }
  }

  return config;
};
