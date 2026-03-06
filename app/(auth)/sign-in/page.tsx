"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      // SIMPAN DATA KE LOCALSTORAGE
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // SIMPAN ROLE KE COOKIE (Agar Middleware bisa baca untuk proteksi rute)
      // Kita gunakan document.cookie bawaan browser agar tidak perlu install library luar
      document.cookie = `user_role=${data.user.role}; path=/; max-age=86400`; // 86400 = 1 hari

      // LOGIKA REDIRECT BERDASARKAN ROLE
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/users/dashboard");
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950">
      {/* --- BAGIAN KIRI: FOTO/VISUAL (KODE ASLI KAMU) --- */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
          alt="Office space"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Elevate your workflow <br /> with our premium dashboard.
          </h2>
          <p className="mt-4 text-lg text-zinc-300">
            Join thousands of professionals managing their tasks seamlessly.
          </p>
        </div>
      </div>

      {/* --- BAGIAN KANAN: FORM LOGIN (KODE ASLI KAMU) --- */}
      <main className="flex w-full items-center justify-center px-8 py-12 lg:w-1/2">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
              <span className="font-bold">G</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-zinc-950 dark:focus-visible:ring-white"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-400">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:ring-white"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <footer className="text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-semibold text-zinc-900 hover:underline dark:text-white">
              Create an account
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}