"use client";

import Pagination from "@/components/molecules/pagination/Pagination";
import { useGetAllDivision } from "@/http/division/get-all-division";
import { useGetAllEmployees } from "@/http/employees/get-all-employees";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
  const [divisionId, setDivisionId] = useState<string | null>(
    searchParams.get("division_id") || null
  );

  const { data, isPending } = useGetAllEmployees(
    session?.access_token as string,
    query,
    divisionId,
    {
      enabled: status === "authenticated",
    }
  );

  const { data: division } = useGetAllDivision(
    session?.access_token as string,
    query,
    {
      enabled: status === "authenticated",
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    router.push(`?query=${e.target.value}&page=1&division_id=${divisionId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?query=${query}&page=${page}&division_id=${divisionId}`);
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDivisionId(e.target.value || null);
    setCurrentPage(1);
    router.push(`?query=${query}&page=1&division_id=${e.target.value || ""}`);
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
            className="p-2 px-4 border rounded bg-background rounded-xl max-w-sm w-full"
          />
          <div className="flex gap-4 w-full justify-end">
            <select
              value={divisionId || ""}
              onChange={handleDivisionChange}
              className=" px-4 border rounded-sm bg-background rounded-full w-full max-w-[200px]"
            >
              <option value="">All Division</option>
              {division?.data.divisions.map((division) => (
                <option value={division.id}>{division.name}</option>
              ))}
            </select>

            <button className="w-fit bg-primary font-semibold text-white px-4  py-1 text-sm rounded-md hover:bg-primary/80">
              <Link
                href={"/employees/create"}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Employee
              </Link>
            </button>
          </div>
        </div>
        <table className="w-full table-auto border border-gray-300 border-collapse rounded-xl">
          <thead>
            <tr>
              <th className="border-b border-gray-300 p-2 text-left">Name</th>
              <th className="border-b border-gray-300 p-2 text-left">Phone</th>
              <th className="border-b border-gray-300 p-2 text-left">
                Division
              </th>
              <th className="border-b border-gray-300 p-2 text-left">
                Position
              </th>
              <th className="border-b border-gray-300 p-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border-b border-gray-300 p-2">
                  {employee.name}
                </td>
                <td className="border-b border-gray-300 p-2">
                  {employee.phone}
                </td>
                <td className="border-b border-gray-300 p-2">
                  {employee.division.name}
                </td>
                <td className="border-b border-gray-300 p-2">
                  {employee.position}
                </td>
                <td className="border-b border-gray-300 p-2">
                  <div className="flex items-center gap-4 w-fit">
                    <Link
                      href={""}
                      className="flex items-center gap-2 hover:underline text-yellow-600 hover:text-yellow-800"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Link>
                    <div className="flex items-center gap-2 text-red-600 hover:text-red-800 hover:underline">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {!data?.data.employees && (
              <tr>
                <td colSpan={5} className="text-center p-4">
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
