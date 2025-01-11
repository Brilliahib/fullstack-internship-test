import { UserPlus } from "lucide-react";
import Image from "next/image";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-2 font-semibold">
        <Image
          src={"/images/logo.svg"}
          alt="Logo"
          width={1000}
          height={1000}
          className="h-[30px] w-fit"
        />
        Aksamedia
      </div>
    </>
  );
}
