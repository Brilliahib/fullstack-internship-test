import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Auth } from "@/types/auth/auth";
import { EmployeType } from "@/validators/employees/employees-validator";

interface GetEmployeeDetailParams {
  id: string;
  token: string;
}

interface UpdateEmployeesResponse {
  data: Auth;
}

export const updateEmployeesHandler = async (
  body: EmployeType,
  { id, token }: GetEmployeeDetailParams
): Promise<UpdateEmployeesResponse> => {
  const { data } = await api.put(`/employees/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useUpdateEmployees = (
  { id, token }: GetEmployeeDetailParams,
  options?: UseMutationOptions<
    UpdateEmployeesResponse,
    AxiosError<any>,
    EmployeType
  >
) => {
  const { data: sessionData } = useSession();

  return useMutation({
    mutationFn: (body: EmployeType) =>
      updateEmployeesHandler(body, { id, token }),
    ...options,
  });
};
