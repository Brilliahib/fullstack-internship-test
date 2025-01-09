"use client";

import Pagination from "@/components/molecules/pagination/Pagination";
import { useGetAllEmployees } from "@/http/employees/get-all-employees";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EmployeesContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const { data, isPending } = useGetAllEmployees(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    router.push(`?query=${e.target.value}&page=1`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?query=${query}&page=${page}`);
  };

  return (
    <>
      <div className="pad-x-xl py-8">
        <div className="flex justify-between mb-8">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search employees..."
            className="p-2 px-4 border rounded bg-background rounded-full max-w-sm w-full"
          />
          <button className="w-fit bg-primary font-semibold text-white px-4 py-1 text-sm rounded-md hover:bg-primary/80 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Employee
          </button>
        </div>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Division</th>
              <th className="border border-gray-300 p-2">Position</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border border-gray-300 p-2">{employee.name}</td>
                <td className="border border-gray-300 p-2">{employee.phone}</td>
                <td className="border border-gray-300 p-2">
                  {employee.division.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {employee.position}
                </td>
              </tr>
            ))}
            {data?.data.employees.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4">
          <Pagination
            totalItems={data?.pagination.total || 0}
            itemsPerPage={data?.pagination.per_page || 10}
            currentPage={data?.pagination.current_page || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
