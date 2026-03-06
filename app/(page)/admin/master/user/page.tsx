"use client";

import NavbarLayout from "@/components/Layouts/navbar";
import SidebarLayout from "@/components/Layouts/sidebar";
import React, { useState } from "react";
import { Plus } from "lucide-react"; // Opsional: untuk icon plus

const UserPage = () => {
  // State untuk form (opsional, disesuaikan dengan logic kamu nanti)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User / Karyawan");

  return (
    <SidebarLayout>
      <NavbarLayout />

      {/* Container Utama */}
      <div className="min-h-screen bg-zinc-50 p-6 lg:p-10 dark:bg-zinc-950">
        {/* Header Page */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#003557] dark:text-white">Management User</h1>
          <p className="text-zinc-500">Control system access and user permissions.</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* --- KIRI: FORM TAMBAH USER --- */}
          <aside className="w-full rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 lg:w-[400px]">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Plus className="h-5 w-5 text-[#003557] dark:text-zinc-300" />
              </div>
              <h2 className="text-xl font-bold text-[#003557] dark:text-white">Tambah User</h2>
            </div>

            <form className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Nama</label>
                <input type="text" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl bg-zinc-50 border-zinc-200 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Email</label>
                <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl bg-zinc-50 border-zinc-200 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl bg-zinc-50 border-zinc-200 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none">
                  <option>User / Karyawan</option>
                  <option>Admin</option>
                </select>
              </div>

              <button type="submit" className="w-full rounded-xl bg-[#00426d] py-3.5 font-bold text-white transition hover:bg-[#003557] active:scale-[0.98] shadow-lg shadow-sky-900/10 mt-4">
                Simpan
              </button>
            </form>
          </aside>

          {/* --- KANAN: TABEL DATA USER --- */}
          <section className="flex-1 rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#003557] dark:text-white">Data User</h2>
              <span className="rounded-full bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-600 dark:bg-sky-900/30">● 3 Items Total</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] uppercase tracking-widest text-zinc-400">
                    <th className="pb-6 font-bold">No</th>
                    <th className="pb-6 font-bold">Nama</th>
                    <th className="pb-6 font-bold">Email</th>
                    <th className="pb-6 font-bold text-center">Role</th>
                    <th className="pb-6 font-bold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {/* Row 1 */}
                  <tr className="border-t border-zinc-50 dark:border-zinc-800">
                    <td className="py-6 font-bold text-sky-600/70">1</td>
                    <td className="py-6 font-bold text-[#003557] dark:text-zinc-200">Admin HRD</td>
                    <td className="py-6 text-zinc-500">hrd@mail.com</td>
                    <td className="py-6 text-center">
                      <span className="rounded-lg bg-amber-50 px-3 py-1 text-[10px] font-black text-amber-500 dark:bg-amber-900/20 uppercase tracking-tighter">Admin</span>
                    </td>
                    <td className="py-6 text-right text-zinc-300">—</td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-t border-zinc-50 dark:border-zinc-800">
                    <td className="py-6 font-bold text-sky-600/70">2</td>
                    <td className="py-6 font-bold text-[#003557] dark:text-zinc-200">John Doe</td>
                    <td className="py-6 text-zinc-500">john@mail.com</td>
                    <td className="py-6 text-center">
                      <span className="rounded-lg bg-zinc-100 px-3 py-1 text-[10px] font-black text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 uppercase tracking-tighter">User</span>
                    </td>
                    <td className="py-6 text-right text-zinc-300">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default UserPage;
