import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem =
    totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <div className="flex justify-between py-4">
        <p>
          Menampilkan {startItem} - {endItem} dari {totalItems} data
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 mx-1 border rounded bg-background disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`px-4 py-2 mx-1 border shadow-sm rounded-md ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-background"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 mx-1 border rounded bg-background disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
