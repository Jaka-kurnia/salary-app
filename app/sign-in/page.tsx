"use client";
// Menandakan bahwa komponen ini adalah Client Component di Next.js (bisa pakai useState, useRouter, dll)

import { useState } from "react";
// Hook React untuk menyimpan state (email, password, error, loading)

import { useRouter } from "next/navigation";
// Hook Next.js untuk navigasi/pindah halaman secara programatik

export default function SignIn() {
  const router = useRouter();
  // Inisialisasi router agar bisa redirect ke halaman lain

  const [email, setEmail] = useState("");
  // State untuk menyimpan input email

  const [password, setPassword] = useState("");
  // State untuk menyimpan input password

  const [error, setError] = useState("");
  // State untuk menyimpan pesan error login

  const [loading, setLoading] = useState(false);
  // State untuk menandakan proses login sedang berjalan

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mencegah reload halaman saat form disubmit

    setError("");
    // Reset error sebelum mencoba login

    setLoading(true);
    // Aktifkan status loading

    try {
      const res = await fetch("/api/login", {
        method: "POST", // Method POST untuk kirim data login
        headers: {
          "Content-Type": "application/json", // Format body JSON
        },
        body: JSON.stringify({
          email, // Kirim email
          password, // Kirim password
        }),
      });

      const data = await res.json();
      // Ambil response JSON dari server

      if (!res.ok) {
        // Jika status HTTP bukan 2xx → anggap gagal
        throw new Error(data.message || "Login gagal");
      }

      localStorage.setItem("access_token", data.token);
      // Simpan token login ke localStorage

      localStorage.setItem("user", JSON.stringify(data.user));
      // Simpan data user ke localStorage (diubah jadi string)

      router.push("/dashboard");
      // Redirect ke halaman dashboard setelah login sukses
    } catch (err: any) {
      setError(err.message);
      // Tampilkan pesan error jika login gagal
    } finally {
      setLoading(false);
      // Matikan loading setelah proses selesai (sukses/gagal)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-black dark:to-zinc-900 px-4">
      {/* Container full screen + background gradient + center alignment */}

      <main className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur p-8 shadow-xl dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800">
        {/* Card login */}

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-white">Welcome Back</h1>
          {/* Judul utama */}

          <p className="mt-1 text-sm text-zinc-500">Sign in to continue to dashboard</p>
          {/* Subtitle */}
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Field Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Email</label>

            <input
              type="email"
              placeholder="admin@mail.com"
              value={email}
              // Nilai input diambil dari state email

              onChange={(e) => setEmail(e.target.value)}
              // Update state email saat diketik

              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 outline-none transition focus:border-black focus:ring-2 focus:ring-black/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white"
              required
              // Wajib diisi
            />
          </div>

          {/* Field Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              // Nilai password dari state

              onChange={(e) => setPassword(e.target.value)}
              // Update state password saat diketik

              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 outline-none transition focus:border-black focus:ring-2 focus:ring-black/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white"
              required
            />
          </div>

          {/* Pesan Error */}
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">{error}</p>}
          {/* Hanya tampil jika ada error */}

          {/* Tombol Login */}
          <button
            disabled={loading}
            // Nonaktif saat loading

            className="w-full rounded-xl bg-black py-2.5 text-white font-medium transition hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {loading ? "Logging in..." : "Login"}
            {/* Teks berubah saat loading */}
          </button>
        </form>
      </main>
    </div>
  );
}
