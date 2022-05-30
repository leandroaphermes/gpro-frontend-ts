import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import history from "routers/history";
import {
  getSessaoUsuario,
  deleteSessaoUsuario,
  getSessaoEmpresa,
  deleteSessaoEmpresa,
} from "./localSessao";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    VersaoFront: process.env.REACT_APP_VERSION || "",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const session = getSessaoUsuario();
    const sessionEmpresa = getSessaoEmpresa();
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${session?.token || ""}`,
        empresaId: `${sessionEmpresa?.id || ""}`,
      },
    };
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      deleteSessaoUsuario();
      deleteSessaoEmpresa();
      history.push("/login");
    }

    // forbiden
    if (error?.response?.status === 403) {
      history.push("/error/403");
    }
    if (error?.response?.status >= 500) {
      history.push("/error/500");
    }

    return Promise.reject(error);
  }
);

export default api;
