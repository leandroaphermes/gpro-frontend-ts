import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { message } from "antd";

export type RequestOptionsProp = {
  ignoreInitLoaded: boolean;
};

export type RequestReturn<T> = [
  T | null,
  boolean,
  (params?: any) => Promise<void>
];
export type ResponseErrorDataApi = {
  message: string;
};

function useRequest<T>(
  serviceDao: (params?: any) => Promise<AxiosResponse>,
  options?: RequestOptionsProp
): RequestReturn<T> {
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState(null);

  const load = useCallback(
    async (params?: any) => {
      setLoading(true);
      serviceDao(params)
        .then((response) => {
          setResultados(response.data);
          setLoading(false);
        })
        .catch((errInstancie: Error | AxiosError<ResponseErrorDataApi>) => {
          if (axios.isAxiosError(errInstancie)) {
            // Access to config, request, and response
            if (errInstancie.response?.status === 409) {
              message.error(errInstancie.response?.data?.message);
            } else {
              message.error("Não foi possivel fazer esta ação");
            }
          } else {
            // Just a stock error
            message.error("Erro interno. Notifique o suporte do GPro");
          }
          setLoading(false);
        });
    },
    [serviceDao]
  );

  useEffect(() => {
    if (!options?.ignoreInitLoaded) {
      load();
    }
  }, [options?.ignoreInitLoaded, load]);

  return [resultados, loading, load];
}

export default useRequest;
