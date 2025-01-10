import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function EmployeesLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return <>{children}</>;
}