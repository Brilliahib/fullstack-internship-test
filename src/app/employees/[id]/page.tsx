import SectionTitle from "@/components/molecules/typography/SectionTitle";
import EmployeesDetailContent from "@/components/organisms/employees/EmployeesDetailContent";
import Navbar from "@/components/organisms/nav/Navbar";

interface EmployeesDetailParams {
  params: Promise<{ id: string }>;
}

export default async function EmployeesDetailPage({
  params,
}: EmployeesDetailParams) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <SectionTitle title="Detail Employees" />
      <EmployeesDetailContent id={String(id)} />
    </>
  );
}
