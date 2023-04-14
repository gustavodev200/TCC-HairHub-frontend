import axios from "axios";
import { errorInterceptor } from "../interceptors/errorInterceptor";
import { successMessageInterceptor } from "../interceptors/successMessageInterceptor";

const Api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

Api.interceptors.response.use(successMessageInterceptor, errorInterceptor);

export default Api;
