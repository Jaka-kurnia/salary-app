"use client";

import React, { useEffect, useState } from 'react';
import NavbarLayout from '@/components/Layouts/navbar';
import SidebarLayout from '@/components/Layouts/sidebar';
import { Plus, Info, Pencil, Trash2, Loader2 } from 'lucide-react';

interface Konfigurasi {
  id: number;
  tahun: string;
  jatah_cuti_tahunan: number;
  nilai_uang_per_cuti: number;
  aktif: boolean;
}

const KonfigurasiPage = () => {
  const [konfigurasiList, setKonfigurasiList] = useState<Konfigurasi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [tahun, setTahun] = useState("");
  const [jatahCuti, setJatahCuti] = useState("");
  const [nilaiUang, setNilaiUang] = useState("");
  const [aktif, setAktif] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchKonfigurasi = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data konfigurasi");
      setKonfigurasiList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchKonfigurasi();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          tahun,
          jatah_cuti_tahunan: parseInt(jatahCuti),
          nilai_uang_per_cuti: parseInt(nilaiUang),
          aktif: aktif,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan data");

      resetForm();
      fetchKonfigurasi();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTahun("");
    setJatahCuti("");
    setNilaiUang("");
    setAktif(true);
    setEditingId(null);
  };

  const handleEdit = (item: Konfigurasi) => {
    setEditingId(item.id);
    setTahun(item.tahun);
    setJatahCuti(item.jatah_cuti_tahunan.toString());
    setNilaiUang(item.nilai_uang_per_cuti.toString());
    setAktif(item.aktif);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konfigurasi ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Gagal menghapus konfigurasi");
      fetchKonfigurasi();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <SidebarLayout>
      <NavbarLayout />
      
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
          
          {/* --- KIRI: FORM --- */}
          <aside className="w-full rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 lg:w-[400px]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                {editingId ? <Pencil className="h-5 w-5 text-blue-600" /> : <Plus className="h-5 w-5 text-[#003557] dark:text-zinc-300" />}
              </div>
              <h2 className="text-xl font-bold text-[#003557] dark:text-white">
                {editingId ? "Edit Konfigurasi" : "Tambah Konfigurasi"}
              </h2>
            </div>

            {/* Alert Info (Hanya muncul saat tambah data) */}
            {!editingId && konfigurasiList.length > 0 && (
              <div className="mb-6 flex gap-3 rounded-2xl bg-orange-50 p-4 border border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30">
                <div className="mt-0.5 rounded-md bg-sky-500 p-0.5 h-fit">
                  <Info className="h-3 w-3 text-white" />
                </div>
                <p className="text-[11px] font-medium leading-relaxed text-orange-700 dark:text-orange-400">
                  Jika sudah terdapat data maka berhati-hatilah saat menambah data baru.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Tahun</label>
                <input 
                  type="number" 
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  placeholder="2024" 
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" 
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Jatah Cuti Tahunan</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={jatahCuti}
                    onChange={(e) => setJatahCuti(e.target.value)}
                    placeholder="12" 
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" 
                    required
                  />
                  <span className="absolute right-4 top-3.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500">HARI</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Nilai Uang Per Cuti</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={nilaiUang}
                    onChange={(e) => setNilaiUang(e.target.value)}
                    placeholder="0" 
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none pl-10" 
                    required
                  />
                  <span className="absolute left-4 top-3.5 text-xs font-bold text-zinc-400">Rp</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Status</label>
                <select 
                  value={aktif ? "true" : "false"}
                  onChange={(e) => setAktif(e.target.value === "true")}
                  className="w-full appearance-none rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none"
                >
                  <option value="true">Aktif</option>
                  <option value="false">Non-Aktif</option>
                </select>
              </div>

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <div className="flex flex-col gap-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00426d] py-3.5 font-bold text-white transition hover:bg-[#003557] active:scale-[0.98] shadow-lg shadow-sky-900/10"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingId ? "Update Data" : "Simpan Konfigurasi"}
                </button>
                {editingId && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="w-full rounded-xl bg-zinc-100 py-2 text-sm font-bold text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </aside>

          {/* --- KANAN: TABEL --- */}
          <section className="flex-1 rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#003557] dark:text-white">Data Konfigurasi</h2>
              <span className="rounded-full bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-600 dark:bg-sky-900/30">
                ● {konfigurasiList.length} Items Total
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
                  {konfigurasiList.map((item, index) => (
                    <tr key={item.id} className="border-t border-zinc-50 dark:border-zinc-800 group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="py-6 font-bold text-sky-600/70">{index + 1}</td>
                      <td className="py-6 font-bold text-[#003557] dark:text-zinc-200">{item.tahun}</td>
                      <td className="py-6 text-center text-zinc-500 font-medium">{item.jatah_cuti_tahunan} Hari</td>
                      <td className="py-6 text-center">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(item.nilai_uang_per_cuti)}</span>
                      </td>
                      <td className="py-6 text-center">
                        <span className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter ${
                          item.aktif 
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" 
                          : "bg-red-50 text-red-600 dark:bg-red-900/20"
                        }`}>
                          {item.aktif ? "Aktif" : "Non-Aktif"}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="p-2 text-zinc-400 hover:text-blue-600 transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {konfigurasiList.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-zinc-400 italic">Belum ada data konfigurasi.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </SidebarLayout>
  );
};

export default KonfigurasiPage;