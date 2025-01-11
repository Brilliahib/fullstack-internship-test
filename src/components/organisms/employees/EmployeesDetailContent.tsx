"use client";

import { useGetEmployeeDetail } from "@/http/employees/get-detail-employees";
import { baseUrl } from "@/utils/app";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface EmployeesDetailContentProps {
  id: string;
}

export default function EmployeesDetailContent({
  id,
}: EmployeesDetailContentProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetEmployeeDetail(
    { id, token: session?.access_token as string },
    { enabled: status === "authenticated" }
  );
  return (
    <>
      <div className="pad-x-xl py-8">
        <div className="p-4 rounded-md md:p-6 border shadow-sm">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-10">
            <div className="space-y-1">
              <h1>Name</h1>
              <p>{data?.data.employee.name}</p>
            </div>
            <div className="space-y-1">
              <h1>Phone Number</h1>
              <p>{data?.data.employee.phone}</p>
            </div>
            <div className="space-y-1">
              <h1>Position</h1>
              <p>{data?.data.employee.position}</p>
            </div>
            <div className="space-y-1">
              <h1>Division</h1>
              <p>{data?.data.employee.division.name}</p>
            </div>
            <div className="space-y-1">
              <h1>Image</h1>
              <Image
                src={`${baseUrl}/${data?.data.employee.image}`}
                alt={data?.data.employee.name ?? "Image Employee"}
                width={1000}
                height={1000}
                className="max-h-[300px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
