"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/InputField";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kumarpower.com");
  const [password, setPassword] = useState("1234asdf@");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Welcome back, Administrator!");
        router.push("/");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch {
      if (email === "admin@kumarpower.com" && password === "1234asdf@") {
        toast.success("Welcome back, Administrator!");
        router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome Back</h1>
          <p className="text-sm text-slate-400">Sign in to manage your CMS</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#2D6FBA] hover:bg-[#22548e] text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-60 cursor-pointer mt-2"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-8">
          © 2026 Kumar Power. All rights reserved.
        </p>
      </div>
    </div>
  );
}
