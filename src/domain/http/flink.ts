import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/lib/table/interface";
import axios from "axios";
import qs from "qs";

export default axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  },
  paramsSerializer: (params: unknown): string =>
    qs.stringify(params, { arrayFormat: "brackets" }),
});

export function toJsonApiPagination(
  pagination?: TablePaginationConfig
): Record<string, unknown> {
  return {
    page: {
      number: pagination?.current || 1,
      size: pagination?.pageSize || 15,
    },
  };
}

export function toJsonApiSort<T>(
  sorter?: SorterResult<T> | SorterResult<T>[]
): Record<string, string> {
  if (sorter === undefined || (Array.isArray(sorter) && sorter.length === 0))
    return {};

  const sortCollection: SorterResult<T>[] = Array.isArray(sorter)
    ? sorter
    : [sorter];

  return {
    sort: sortCollection
      .map((sort: SorterResult<T>): string =>
        [
          sort.order === "descend" ? "-" : "",
          Array.isArray(sort.field)
            ? sort.field[sort.field.length - 1]
            : sort.field,
        ].join("")
      )
      .join(","),
  };
}

export function toJsonApiParams<T>(
  pagination?: TablePaginationConfig,
  filters?: Record<string, FilterValue | null>,
  sorter?: SorterResult<T> | SorterResult<T>[]
): Record<string, unknown> {
  return {
    ...toJsonApiPagination(pagination),
    ...toJsonApiSort(sorter),
  };
}
