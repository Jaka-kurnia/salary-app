"use client";

import NavbarLayout from '@/components/Layouts/navbar'
import SidebarLayout from '@/components/Layouts/sidebar'
import React, { useState } from 'react'
import { Plus, ChevronDown, Calendar } from 'lucide-react'

const KaryawanPage = () => {
  return (
    <SidebarLayout>
      <NavbarLayout />
      
      {/* Container Utama dengan Padding */}
      <div className="min-h-screen bg-zinc-50 p-4 md:p-6 lg:p-8 dark:bg-zinc-950">
        <div className="mx-auto flex flex-col gap-6 lg:flex-row lg:items-start">
          
          {/* --- KIRI: FORM TAMBAH KARYAWAN --- */}
          <aside className="w-full rounded-3xl bg-white p-6 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 lg:w-[380px]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Plus className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-white">Tambah Karyawan</h2>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">NIK</label>
                  <input type="text" placeholder="NIK" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Nama</label>
                  <input type="text" placeholder="Nama Lengkap" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Email</label>
                <input type="email" placeholder="email@company.com" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Tempat Lahir</label>
                  <input type="text" placeholder="Kota" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Tanggal Lahir</label>
                  <div className="relative">
                    <input type="text" placeholder="dd/mm/yyyy" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-zinc-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Alamat</label>
                <textarea placeholder="Alamat Lengkap" rows={4} className="w-full rounded-xl bg-zinc-50 border-none px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white resize-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Jabatan</label>
                <select className="w-full appearance-none rounded-xl bg-zinc-50 border-none px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white">
                  <option>Pilih Jabatan</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Status Aktif</label>
                <select className="w-full appearance-none rounded-xl border border-zinc-800 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-900 dark:text-white">
                  <option>Aktif</option>
                  <option>Non-Aktif</option>
                </select>
              </div>

              <button type="submit" className="w-full rounded-xl bg-[#00426d] py-3 font-bold text-white transition hover:bg-[#003557] active:scale-[0.98]">
                Simpan
              </button>
            </form>
          </aside>

          {/* --- KANAN: TABEL DATA KARYAWAN --- */}
          <section className="flex-1 rounded-3xl bg-white p-6 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#003557] dark:text-sky-400">Data Karyawan</h2>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600 dark:bg-sky-900/30">
                ● 2 Items Total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-50 text-[10px] uppercase tracking-widest text-zinc-400 dark:border-zinc-800">
                    <th className="pb-4 font-bold">No</th>
                    <th className="pb-4 font-bold">Nama</th>
                    <th className="pb-4 font-bold">Jabatan</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                  <tr className="group">
                    <td className="py-5 text-sm font-bold text-sky-600">1</td>
                    <td className="py-5 text-sm font-bold text-zinc-800 dark:text-zinc-200">Ahmad Fauzi</td>
                    <td className="py-5">
                      <span className="rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        Manager IT
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-600 dark:bg-emerald-900/20">
                        AKTIF
                      </span>
                    </td>
                    <td className="py-5 text-right">—</td>
                  </tr>
                  <tr>
                    <td className="py-5 text-sm font-bold text-sky-600">2</td>
                    <td className="py-5 text-sm font-bold text-zinc-800 dark:text-zinc-200">Siti Aminah</td>
                    <td className="py-5">
                      <span className="rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        HR Specialist
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-600 dark:bg-emerald-900/20">
                        AKTIF
                      </span>
                    </td>
                    <td className="py-5 text-right">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </SidebarLayout>
  )
}

export default KaryawanPage