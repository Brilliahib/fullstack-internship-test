"use client";

import { useEffect, useState } from "react";
import { getEmployees, saveEmployees, Employee } from "@/utils/employee";
import Pagination from "@/components/molecules/pagination/Pagination";
import { Plus } from "lucide-react";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const storedEmployees = getEmployees();
    setEmployees(storedEmployees);

    const urlParams = new URLSearchParams(window.location.search);
    const page = Number(urlParams.get("page") || 1);
    const searchQuery = urlParams.get("query") || "";
    setQuery(searchQuery);
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const result = employees.filter((employee) =>
      employee.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(result);
  }, [employees, query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const url = new URL(window.location.href);
    url.searchParams.set("query", value);
    url.searchParams.set("page", "1");
    window.history.pushState({}, "", url);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
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
          {currentItems.map((employee) => (
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
          {currentItems.length === 0 && (
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
          totalItems={filteredEmployees.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
