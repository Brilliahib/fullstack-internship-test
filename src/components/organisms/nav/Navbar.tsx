"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      setUser(parsedUser.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    router.push("/login");
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-background p-4 flex justify-between items-center border shadow-sm border-b-2">
      <h1 className="text-lg font-bold">Employee Management</h1>
      <div className="relative">
        {user && (
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="px-4 py-2 rounded-full border"
          >
            {user}
          </button>
        )}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
            <div className="mt-2 border-t">
              <button
                onClick={() => handleThemeChange("system")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Default (System)
              </button>
              <button
                onClick={() => handleThemeChange("light")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Dark
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
