"use client"; // Menandakan komponen ini adalah Client Component agar bisa pakai useState, useRouter, dll.

import { useState } from "react";
import { useRouter } from "next/navigation"; // Router khusus App Router Next.js

export default function SignUp() {
  const router = useRouter(); // Untuk redirect halaman

  // State untuk menampung input form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // State untuk error & loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi ketika form di-submit
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    setError(""); // Reset error
    setLoading(true); // Aktifkan loading

    try {
      // Kirim request ke API register
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Data yang dikirim ke backend
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json(); // Ambil response JSON dari server

      // Jika response gagal → tampilkan error
      if (!res.ok) {
        throw new Error(data.message || "Register gagal");
      }

      // Simpan token & data user ke localStorage
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect ke halaman login
      router.push("/sign-in");
    } catch (err: any) {
      setError(err.message); // Tampilkan pesan error ke UI
    } finally {
      setLoading(false); // Matikan loading
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-semibold">Sign Up</h1>

        {/* Form register */}
        <form onSubmit={handleSignUp} className="space-y-5">
          
          {/* Input nama */}
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          {/* Input email */}
          <input
            type="email"
            placeholder="admin@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2[js"
            required
          />

          {/* Input password */}
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          {/* Input role */}
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          {/* Tampilkan error jika ada */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Tombol submit */}
          <button
            disabled={loading} // Disable saat loading
            className="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "register"} {/* Teks berubah saat loading */}
          </button>
        </form>
      </main>
    </div>
  );
}
