"use client";

import DeleteEmployeeDialog from "@/components/atoms/dialog/DialogDeleteEmployee";
import Pagination from "@/components/molecules/pagination/Pagination";
import { useGetAllDivision } from "@/http/division/get-all-division";
import { useDeleteEmployee } from "@/http/employees/delete-employees";
import { useGetAllEmployees } from "@/http/employees/get-all-employees";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

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

  const queryClient = useQueryClient();

  const { mutate: deleteEmployeeHandler, isPending: isDeletePending } =
    useDeleteEmployee({
      onSuccess: () => {
        toast.success("Berhasil menghapus employee");
        queryClient.invalidateQueries({
          queryKey: ["employees-list"],
        });
        setDialogOpen(false);
      },
      onError: (error) => {
        toast.error("Gagal menghapus employee", {
          description: error.response?.data.message,
        });
      },
    });

  const handleDeleteEmployee = (employeeId: string, employeeName: string) => {
    setEmployeeToDelete({ id: employeeId, name: employeeName });
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete && session?.access_token) {
      const deletePayload = {
        id: employeeToDelete.id,
        token: session.access_token,
      };
      deleteEmployeeHandler(deletePayload);
    }
  };

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
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
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
              <th className="border-b border-gray-300 p-2 text-left text-muted-foreground font-medium">
                Name
              </th>
              <th className="border-b border-gray-300 p-2 text-left text-muted-foreground font-medium">
                Phone
              </th>
              <th className="border-b border-gray-300 p-2 text-left text-muted-foreground font-medium">
                Division
              </th>
              <th className="border-b border-gray-300 p-2 text-left text-muted-foreground font-medium">
                Position
              </th>
              <th className="border-b border-gray-300 p-2 text-left text-muted-foreground font-medium"></th>
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
                      href={`/employees/${employee.id}`}
                      className="flex items-center gap-2 hover:underline"
                    >
                      <Eye className="h-4 w-4" />
                      Detail
                    </Link>
                    <Link
                      href={`/employees/${employee.id}/edit`}
                      className="flex items-center gap-2 hover:underline text-yellow-600 hover:text-yellow-800"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Link>
                    <div
                      className="flex items-center gap-2 text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                      onClick={() =>
                        handleDeleteEmployee(employee.id, employee.name)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {!data?.data.employees ||
              (data?.data.employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    No employees found.
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="mt-2">
          <Pagination
            totalItems={data?.pagination.total || 0}
            itemsPerPage={data?.pagination.per_page || 10}
            currentPage={data?.pagination.current_page || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <DeleteEmployeeDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onDelete={handleConfirmDelete}
        employeeName={employeeToDelete?.name || ""}
      />
    </>
  );
}
