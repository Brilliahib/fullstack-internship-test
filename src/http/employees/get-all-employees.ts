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
  token: string
): Promise<GetAllEmployeesResponse> => {
  const { data } = await api.get<GetAllEmployeesResponse>("/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllEmployees = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllEmployeesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["employees-list"],
    queryFn: () => GetAllEmployeesHandler(token),
    ...options,
  });
};
