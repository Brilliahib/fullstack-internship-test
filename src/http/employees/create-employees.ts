import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Employees } from "@/types/employees/employees";
import { EmployeType } from "@/validators/employees/employees-validator";

interface EmployeesResponse {
  data: Employees;
}

export const addEmployeeHandler = async (
  body: EmployeType,
  token: string
): Promise<EmployeesResponse> => {
  const formData = new FormData();

  formData.append("division", body.division);
  formData.append("name", body.name);
  formData.append("position", body.position);
  formData.append("phone", body.phone);

  if (body.image) {
    formData.append("image", body.image);
  }

  const { data } = await api.post("/employees", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddEmployee = (
  options?: UseMutationOptions<EmployeesResponse, AxiosError<any>, EmployeType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: EmployeType) =>
      addEmployeeHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
