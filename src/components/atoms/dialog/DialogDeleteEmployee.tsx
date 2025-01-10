import { Trash2, X } from "lucide-react";
import { FC } from "react";

interface DeleteEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  employeeName: string;
}

const DeleteEmployeeDialog: FC<DeleteEmployeeDialogProps> = ({
  open,
  onClose,
  onDelete,
  employeeName,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Delete Employee
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete the employee{" "}
          <strong>{employeeName}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeDialog;
