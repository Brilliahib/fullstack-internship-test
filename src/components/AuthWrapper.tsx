"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  return <>{children}</>;
}
