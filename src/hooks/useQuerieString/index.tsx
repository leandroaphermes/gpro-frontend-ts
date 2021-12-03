import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { NavigateOptions } from "react-router-dom";
import QueryString from "query-string";

export default function useQuerieString<T>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setURL = useCallback(
    (values: object, options?: NavigateOptions) => {
      setSearchParams(
        new URLSearchParams(QueryString.stringify(values)),
        options
      );
    },
    [setSearchParams]
  );

  return [
    QueryString.parse(searchParams.toString()) as unknown as T,
    setURL,
  ] as const;
}
