"use client";

import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) return null;

  return <>{children}</>;
}
