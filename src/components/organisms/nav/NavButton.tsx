import { generateFallbackFromName } from "@/utils/misc";
import { Session } from "next-auth";

interface NavButtonProps {
  session: Session;
}

export default function NavButton({ session }: NavButtonProps) {
  return (
    <>
      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-700">
          {generateFallbackFromName(session.user.name)}
        </div>
      </div>
    </>
  );
}
