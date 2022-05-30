import { useCallback, useEffect, useState } from "react";
import { AxiosPromise } from "axios";

export type RequestOptionsProp = {
  mountLoad: boolean;
};

export type RequestReturn<T> = [boolean, T[], () => Promise<void>];

function useRequest<T>(
  serviceDao: AxiosPromise,
  options: RequestOptionsProp
): RequestReturn<T> {
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    serviceDao.then((response) => {
      setResultados(response.data);
      setLoading(false);
    });
  }, [serviceDao]);

  useEffect(() => {
    if (options.mountLoad) {
      load();
    }
  }, [options.mountLoad, load]);

  return [resultados, loading, load];
}

export default useRequest;
