import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Pagination } from "@/types/pagination/pagination";
import { Division } from "@/types/division/division";

interface GetAllDivisionResponse {
  data: {
    divisions: Division[];
  };
  pagination: Pagination;
}

export const GetAllDivisionHandler = async (
  token: string,
  query: string
): Promise<GetAllDivisionResponse> => {
  const params: Record<string, string | undefined> = {
    name: query || undefined,
  };

  const { data } = await api.get<GetAllDivisionResponse>("/divisions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return data;
};

export const useGetAllDivision = (
  token: string,
  query: string,
  options?: Partial<UseQueryOptions<GetAllDivisionResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["division-list", query],
    queryFn: () => GetAllDivisionHandler(token, query),
    ...options,
  });
};
