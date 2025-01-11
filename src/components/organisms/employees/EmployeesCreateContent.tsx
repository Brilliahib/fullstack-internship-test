"use client";

import { useGetAllDivision } from "@/http/division/get-all-division";
import { useAddEmployee } from "@/http/employees/create-employees";
import {
  employeeSchema,
  EmployeType,
} from "@/validators/employees/employees-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EmployeesCreateContent() {
  const { data: session, status } = useSession();
  const form = useForm<EmployeType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      division: "",
      name: "",
      phone: "",
      position: "",
      image: null,
    },
    mode: "onChange",
  });

  const { setValue } = form;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };

  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  const { data: division, isLoading } = useGetAllDivision(
    session?.access_token as string,
    query,
    {
      enabled: status === "authenticated",
    }
  );

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: addEmployeeHandler, isPending } = useAddEmployee({
    onError: (error: AxiosError<any>) => {
      toast.error("Gagal Menambahkan Employee", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Berhasil Menambahkan Employee");
      queryClient.invalidateQueries({
        queryKey: ["employees-list", query],
      });
      router.push("/employees");
    },
  });

  const onSubmit = (body: EmployeType) => {
    addEmployeeHandler(body);
  };

  return (
    <div className="pad-x-xl">
      <div className="w-full mt-10 p-4 md:p-6 rounded-md shadow border">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium mb-1">
                Nama
              </label>
              <input
                id="name"
                {...form.register("name")}
                placeholder="Masukkan nama"
                className="border border-gray-300 bg-background rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="division" className="text-sm font-medium mb-1">
                Divisi
              </label>
              <select
                id="division"
                {...form.register("division")}
                className="border border-gray-300 rounded-md bg-background p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isLoading}
              >
                <option value="" disabled>
                  Pilih divisi
                </option>
                {division?.data.divisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
              {form.formState.errors.division && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.division.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="position" className="text-sm font-medium mb-1">
                Posisi
              </label>
              <input
                id="position"
                {...form.register("position")}
                placeholder="Masukkan posisi"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary bg-background"
              />
              {form.formState.errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.position.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium mb-1">
                Nomor Telepon
              </label>
              <input
                id="phone"
                {...form.register("phone")}
                placeholder="Masukkan nomor telepon"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary bg-background"
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="image" className="text-sm font-medium mb-1">
                Foto
              </label>
              <input
                id="image"
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {form.formState.errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.image.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="w-fit bg-primary text-white rounded-md px-4 py-2 hover:bg-primary/80 focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              {isPending ? "Menambahkan..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
