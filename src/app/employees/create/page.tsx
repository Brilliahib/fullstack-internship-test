import SectionTitle from "@/components/molecules/typography/SectionTitle";
import EmployeesCreateContent from "@/components/organisms/employees/EmployeesCreateContent";
import Navbar from "@/components/organisms/nav/Navbar";

export default function EmployeesCreatePage() {
  return (
    <>
      <Navbar />
      <SectionTitle title="Create Employees" />
      <EmployeesCreateContent />
    </>
  );
}
