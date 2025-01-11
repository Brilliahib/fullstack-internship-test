"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema, LoginType } from "@/validators/auth/login-validator";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (body: LoginType) => {
    setIsLoading(true);
    const res = await signIn("credentials", { ...body, redirect: false });
    setIsLoading(false);

    if (!res || res.error) {
      toast.error("Login Failed", {
        description:
          res?.error === "CredentialsSignin"
            ? "Email or password is wrong."
            : "An error occurred, please try again.",
      });
      return;
    }

    toast.success("Login Successful", {
      description:
        "Welcome back! You have successfully logged into your account.",
    });

    router.push("/employees");
  };

  return (
    <>
      <div className="min-h-screen bg-background grid md:grid-cols-2 grid-cols-1 flex items-center justify-center">
        <Image
          src="/images/background.jpg"
          alt="Background Login"
          width={2069}
          height={1381}
          className="h-full object-cover"
        />
        <div className="flex h-full items-center justify-center bg-background px-8">
          <div className="w-full md:max-w-md text-left">
            <div className="space-y-1 mb-8">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground">
                Selamat datang! Silahkan masuk menggunakan akun anda.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 space-y-2">
                <label htmlFor="username" className="font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Masukkan username"
                  {...register("username")}
                  className="w-full p-2 bg-background border rounded"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="mb-4 space-y-2">
                <label htmlFor="password" className="font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Masukkan password"
                  {...register("password")}
                  className="w-full p-2 bg-background border rounded"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
