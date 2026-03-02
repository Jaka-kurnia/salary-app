"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register gagal");

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/sign-in");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950">
      {/* --- BAGIAN KIRI: FORM REGISTER --- */}
      <main className="flex w-full items-center justify-center px-8 py-12 lg:w-1/2">
        <div className="w-full max-w-sm space-y-8">
          
          {/* Header */}
          <div>
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
              <span className="font-bold">G</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Create an account
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Start your journey with our professional tools.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Role</label>
                <input
                  type="text"
                  placeholder="Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-white"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-700 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <footer className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <a href="/sign-in" className="font-semibold text-zinc-900 hover:underline dark:text-white">
              Sign In
            </a>
          </footer>
        </div>
      </main>

      {/* --- BAGIAN KANAN: FOTO --- */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
          alt="Creative Workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-zinc-900/40 backdrop-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-16 left-16 right-16">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/20">
            New Feature: Dark Mode Support
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Build something <br /> incredible today.
          </h2>
        </div>
      </div>
    </div>
  );
}