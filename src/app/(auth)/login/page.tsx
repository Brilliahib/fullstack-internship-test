"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = () => {
    const staticUsername = "admin";
    const staticPassword = "pastibisa";

    if (username === staticUsername && password === staticPassword) {
      localStorage.setItem("authUser", JSON.stringify({ username }));
      router.push("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="bg-background border p-6 rounded shadow-md w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 bg-background border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-background border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80"
        >
          Login
        </button>
      </div>
    </div>
  );
}
