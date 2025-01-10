import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Employees } from "@/types/employees/employees";

interface GetEmployeeDetailParams {
  id: string;
  token: string;
}

interface GetEmployeeDetailResponse {
  data: {
    employee: Employees;
  };
}

export const GetEmployeeDetailHandler = async ({
  id,
  token,
}: GetEmployeeDetailParams): Promise<GetEmployeeDetailResponse> => {
  const { data } = await api.get<GetEmployeeDetailResponse>(
    `/employees/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetEmployeeDetail = (
  { id, token }: GetEmployeeDetailParams,
  options?: Partial<UseQueryOptions<GetEmployeeDetailResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["employees-detail"],
    queryFn: () => GetEmployeeDetailHandler({ id, token }),
    ...options,
  });
};
