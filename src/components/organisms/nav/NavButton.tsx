"use client"; // Menambahkan direktif "use client" agar komponen hanya berjalan di sisi klien

import { generateFallbackFromName } from "@/utils/misc";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface NavButtonProps {
  session: Session;
}

export default function NavButton({ session }: NavButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    // <div className="relative flex items-center justify-center h-10 w-10 shrink-0 overflow-hidden rounded-full">
    //   <div
    //     className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 font-semibold cursor-pointer"
    //     onClick={handleToggleDropdown}
    //   >
    //     {generateFallbackFromName(session.user.name)}
    //   </div>

    //   {isOpen && (
    //     <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-gray-200 z-50">
    //       <ul className="py-1 text-sm text-gray-700">
    //         <li className="px-4 py-2">
    //           <p className="font-semibold">{session.user.name}</p>
    //         </li>
    //         <li>
    //           <button
    //             onClick={() => signOut({ callbackUrl: "/login" })}
    //             className="block w-full text-left hover:bg-red-200/40 rounded-lg px-4 py-2 text-red-600"
    //           >
    //             Logout
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   )}
    // </div>
    <div className="relative inline-block">
      <div className="h-10 w-10 shrink-0 rounded-full">
        <button
          type="button"
          className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 font-semibold cursor-pointer"
          onClick={toggleDropdown}
        >
          {generateFallbackFromName(session.user.name)}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <li>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {session.user.name}
              </p>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-left block hover:bg-red-200/40 px-4 py-2 text-red-600 text-sm"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
