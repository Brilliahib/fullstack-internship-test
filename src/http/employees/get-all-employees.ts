import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Employees } from "@/types/employees/employees";
import { Pagination } from "@/types/pagination/pagination";

interface GetAllEmployeesResponse {
  data: {
    employees: Employees[];
  };
  pagination: Pagination;
}

export const GetAllEmployeesHandler = async (
  token: string,
  query: string,
  divisionId: string | null
): Promise<GetAllEmployeesResponse> => {
  const params: Record<string, string | undefined> = {
    name: query || undefined,
    division_id: divisionId || undefined,
  };

  const { data } = await api.get<GetAllEmployeesResponse>("/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return data;
};

export const useGetAllEmployees = (
  token: string,
  query: string,
  divisionId: string | null,
  options?: Partial<UseQueryOptions<GetAllEmployeesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["employees-list", query, divisionId],
    queryFn: () => GetAllEmployeesHandler(token, query, divisionId),
    ...options,
  });
};
