import SectionTitle from "@/components/molecules/typography/SectionTitle";
import EmployeesUpdateContent from "@/components/organisms/employees/EmployeesUpdateContent";
import Navbar from "@/components/organisms/nav/Navbar";

interface EmployeesDetailParams {
  params: Promise<{ id: string }>;
}

export default async function EmployeeEditPage({
  params,
}: EmployeesDetailParams) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <SectionTitle title="Edit Employees" />
      <EmployeesUpdateContent id={String(id)} />
    </>
  );
}
