"use client";

import NavbarLayout from '@/components/Layouts/navbar'
import SidebarLayout from '@/components/Layouts/sidebar'
import React from 'react'
import { Plus, Info } from 'lucide-react'

const KonfigurasiPage = () => {
  return (
    <SidebarLayout>
      <NavbarLayout />
      
      {/* Container Utama */}
      <div className="min-h-screen bg-zinc-50 p-6 lg:p-10 dark:bg-zinc-950">
        
        {/* Header Page */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#003557] dark:text-white">
            Konfigurasi Tahun
          </h1>
          <p className="text-zinc-500">
            Setup annual leave and compensation parameters.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          
          {/* --- KIRI: FORM TAMBAH KONFIGURASI --- */}
          <aside className="w-full rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 lg:w-[400px]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Plus className="h-5 w-5 text-[#003557] dark:text-zinc-300" />
              </div>
              <h2 className="text-xl font-bold text-[#003557] dark:text-white">Tambah Konfigurasi</h2>
            </div>

            {/* Alert Info */}
            <div className="mb-6 flex gap-3 rounded-2xl bg-orange-50 p-4 border border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30">
              <div className="mt-0.5 rounded-md bg-sky-500 p-0.5 h-fit">
                <Info className="h-3 w-3 text-white" />
              </div>
              <p className="text-[11px] font-medium leading-relaxed text-orange-700 dark:text-orange-400">
                Jika sudah terdapat satu data maka tidak dapat menambah data lagi.
              </p>
            </div>

            <form className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Tahun</label>
                <input 
                  type="text" 
                  placeholder="2024" 
                  className="w-full rounded-xl bg-zinc-50 border-zinc-100 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Jatah Cuti Tahunan</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="12" 
                    className="w-full rounded-xl bg-zinc-50 border-zinc-100 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" 
                  />
                  <span className="absolute right-4 top-3.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500">HARI</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Nilai Uang Per Cuti</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="0" 
                    className="w-full rounded-xl bg-zinc-50 border-zinc-100 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none pl-10" 
                  />
                  <span className="absolute left-4 top-3.5 text-xs font-bold text-zinc-400">Rp</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Status</label>
                <select className="w-full appearance-none rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none">
                  <option>Aktif</option>
                  <option>Non-Aktif</option>
                </select>
              </div>

              <button type="submit" className="w-full rounded-xl bg-[#00426d] py-3.5 font-bold text-white transition hover:bg-[#003557] active:scale-[0.98] shadow-lg shadow-sky-900/10 mt-2">
                Simpan
              </button>
            </form>
          </aside>

          {/* --- KANAN: TABEL DATA KONFIGURASI --- */}
          <section className="flex-1 rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#003557] dark:text-white">Data Konfigurasi</h2>
              <span className="rounded-full bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-600 dark:bg-sky-900/30">
                ● 1 Items Total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] uppercase tracking-widest text-zinc-400">
                    <th className="pb-6 font-bold">No</th>
                    <th className="pb-6 font-bold">Tahun</th>
                    <th className="pb-6 font-bold text-center">Jatah Cuti</th>
                    <th className="pb-6 font-bold text-center">Nilai Uang</th>
                    <th className="pb-6 font-bold text-center">Status</th>
                    <th className="pb-6 font-bold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-zinc-50 dark:border-zinc-800">
                    <td className="py-6 font-bold text-sky-600/70">1</td>
                    <td className="py-6 font-bold text-[#003557] dark:text-zinc-200">2024</td>
                    <td className="py-6 text-center text-zinc-500 font-medium">12 Hari</td>
                    <td className="py-6 text-center">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Rp 150.000</span>
                    </td>
                    <td className="py-6 text-center">
                      <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-600 dark:bg-emerald-900/20 uppercase tracking-tighter">
                        Aktif
                      </span>
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
  )
}

export default KonfigurasiPage;