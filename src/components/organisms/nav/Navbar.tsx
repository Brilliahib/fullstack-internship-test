import { getServerSession } from "next-auth";
import NavButton from "./NavButton";
import NavL from "./NavL";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="pad-x-xl flex justify-between border border-b-2 shadow-sm items-center py-2">
        <NavL />
        <NavButton session={session!} />
      </div>
    </>
  );
}
