import SectionTitle from "@/components/molecules/typography/SectionTitle";
import EmployeesContent from "@/components/organisms/employees/EmployeesContent";
import Navbar from "@/components/organisms/nav/Navbar";

export default function EmployeesPage() {
  return (
    <>
      <Navbar />
      <SectionTitle title="Employees" />
      <EmployeesContent />
    </>
  );
}
