import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { NavigateOptions } from "react-router-dom";
import QueryString from "query-string";

export default function useQuerieString<T>(initValues?: T) {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(QueryString.stringify(initValues || {}))
  );

  const setURL = useCallback(
    (values: object, options?: NavigateOptions) => {
      setSearchParams(
        new URLSearchParams(QueryString.stringify(values)),
        options
      );
    },
    [setSearchParams]
  );

  const memoQueries = useMemo(
    () => QueryString.parse(searchParams.toString()) as unknown as T,
    [searchParams]
  );

  return [memoQueries, setURL] as const;
}
