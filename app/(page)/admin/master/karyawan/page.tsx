"use client";

import NavbarLayout from '@/components/Layouts/navbar'
import SidebarLayout from '@/components/Layouts/sidebar'
import { useEffect, useState, useRef } from "react";
import { Plus, Calendar, Search, User, Mail, MapPin, Briefcase, Info, Pencil, Trash2, X, ChevronDown } from 'lucide-react';

interface Jabatan {
  id: number;
  jabatan: string;
}

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number;
  status_aktif: boolean;
  jabatan?: Jabatan;
}

export default function KaryawanPage() {
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(null);

  // Form states
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [idJabatan, setIdJabatan] = useState<string>("");
  const [statusAktif, setStatusAktif] = useState(true);

  // Searchable Select states
  const [searchJabatan, setSearchJabatan] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchJabatan = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok) setJabatanList(data.data || data);
    } catch (err) { console.error("Fetch Jabatan Error:", err); }
  };

  const fetchKaryawan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data");
      setKaryawanList(data.data || data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (token) { fetchJabatan(); fetchKaryawan(); }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan";
    
    try {
      const res = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          nik, nama, email, alamat,
          tempat_lahir: tempatLahir,
          tanggal_lahir: tanggalLahir,
          id_jabatan: parseInt(idJabatan),
          status_aktif: statusAktif,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Terjadi kesalahan");
      }

      resetForm();
      fetchKaryawan();
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  const resetForm = () => {
    setNik(""); setNama(""); setEmail(""); setTempatLahir("");
    setTanggalLahir(""); setAlamat(""); setIdJabatan("");
    setStatusAktif(true); setEditingId(null);
  };

  const handleEdit = (item: Karyawan) => {
    setEditingId(item.id);
    setNik(item.nik);
    setNama(item.nama);
    setEmail(item.email);
    setTempatLahir(item.tempat_lahir || "");
    setTanggalLahir(item.tanggal_lahir || "");
    setAlamat(item.alamat || "");
    setIdJabatan(item.id_jabatan.toString());
    setStatusAktif(item.status_aktif);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data karyawan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (res.ok) fetchKaryawan();
    } catch (err: any) { setError(err.message); }
  };

  const filteredJabatan = jabatanList.filter(j => 
    j.jabatan.toLowerCase().includes(searchJabatan.toLowerCase())
  );

  const selectedJabatanLabel = jabatanList.find(j => j.id.toString() === idJabatan)?.jabatan || "Pilih Jabatan";

  return (
    <SidebarLayout>
      <NavbarLayout />
      <div className="min-h-screen bg-zinc-50 p-4 md:p-8 dark:bg-zinc-950 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Karyawan</h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Kelola data personal dan jabatan staf.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* --- KIRI: FORM --- */}
            <aside className="lg:col-span-4 rounded-3xl bg-white p-6 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 h-fit lg:sticky lg:top-24">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400">
                  {editingId ? <Pencil size={20} /> : <Plus size={20} />}
                </div>
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
                  {editingId ? "Edit Data" : "Tambah Baru"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-400">NIK</label>
                    <input value={nik} onChange={e => setNik(e.target.value)} required type="text" placeholder="NIK" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Nama</label>
                    <input value={nama} onChange={e => setNama(e.target.value)} required type="text" placeholder="Nama" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder="email@company.com" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Tempat Lahir</label>
                    <input value={tempatLahir} onChange={e => setTempatLahir(e.target.value)} type="text" placeholder="Kota" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Tgl Lahir</label>
                    <input value={tanggalLahir} onChange={e => setTanggalLahir(e.target.value)} type="date" className="w-full rounded-xl bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Alamat</label>
                  <textarea value={alamat} onChange={e => setAlamat(e.target.value)} rows={3} placeholder="Alamat lengkap..." className="w-full rounded-xl bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white resize-none" />
                </div>

                {/* Searchable Select Jabatan */}
                <div className="space-y-1.5 relative" ref={selectRef}>
                  <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Jabatan</label>
                  <div onClick={() => setIsSelectOpen(!isSelectOpen)} className="flex items-center justify-between w-full cursor-pointer rounded-xl bg-zinc-50 px-4 py-3 text-sm dark:bg-zinc-800 dark:text-white">
                    <span className={idJabatan ? "" : "text-zinc-400"}>{selectedJabatanLabel}</span>
                    <ChevronDown size={16} className={`transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isSelectOpen && (
                    <div className="absolute z-50 mt-2 w-full rounded-2xl bg-white p-2 shadow-xl border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
                      <input autoFocus type="text" placeholder="Cari..." value={searchJabatan} onChange={e => setSearchJabatan(e.target.value)} className="mb-2 w-full rounded-lg border-none bg-zinc-50 px-3 py-2 text-xs dark:bg-zinc-800" />
                      <div className="max-h-48 overflow-y-auto">
                        {filteredJabatan.map(j => (
                          <div key={j.id} onClick={() => { setIdJabatan(j.id.toString()); setIsSelectOpen(false); }} className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-zinc-800">
                            {j.jabatan}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#00426d] py-4 font-bold text-white transition hover:bg-[#003557] active:scale-95 disabled:opacity-50">
                  {loading ? "Menyimpan..." : editingId ? "Perbarui Data" : "Simpan Karyawan"}
                </button>
                {editingId && (
                  <button onClick={resetForm} type="button" className="w-full rounded-xl bg-zinc-100 py-3 text-sm font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Batal
                  </button>
                )}
              </form>
            </aside>

            {/* --- KANAN: TABEL --- */}
            <section className="lg:col-span-8 rounded-3xl bg-white shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white">Data Karyawan</h2>
                <div className="rounded-full bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:bg-emerald-900/20">
                  {karyawanList.length} Total Staf
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:bg-zinc-800/50">
                      <th className="px-6 py-4">No</th>
                      <th className="px-6 py-4">Nama & NIK</th>
                      <th className="px-6 py-4">Jabatan</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                    {karyawanList.map((item, index) => (
                      <tr key={item.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-5 text-sm font-bold text-sky-600">{index + 1}</td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-zinc-800 dark:text-zinc-200">{item.nama}</div>
                          <div className="text-[10px] font-medium text-zinc-400 tracking-wider">{item.nik}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                            {item.jabatan?.jabatan || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${item.status_aktif ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {item.status_aktif ? 'Aktif' : 'Off'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setSelectedKaryawan(item)} className="p-2 text-zinc-400 hover:text-sky-600 transition-colors"><Info size={18}/></button>
                            <button onClick={() => handleEdit(item)} className="p-2 text-zinc-400 hover:text-amber-500 transition-colors"><Pencil size={18}/></button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-zinc-400 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedKaryawan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
            <div className="bg-[#00426d] p-8 text-white relative">
              <button onClick={() => setSelectedKaryawan(null)} className="absolute right-6 top-6 text-white/50 hover:text-white"><X size={24}/></button>
              <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4"><User size={32}/></div>
              <h3 className="text-2xl font-black">{selectedKaryawan.nama}</h3>
              <p className="text-sky-200 text-sm font-bold tracking-widest uppercase">{selectedKaryawan.jabatan?.jabatan}</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-zinc-400"><Briefcase size={18}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400">NIK</p>
                    <p className="text-sm font-bold dark:text-white">{selectedKaryawan.nik}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-zinc-400"><Mail size={18}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400">Email</p>
                    <p className="text-sm font-bold dark:text-white truncate max-w-[120px]">{selectedKaryawan.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-zinc-50 pt-6 dark:border-zinc-800">
                <div className="text-zinc-400 mt-1"><MapPin size={18}/></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-400">Alamat</p>
                  <p className="text-sm font-medium dark:text-zinc-300">{selectedKaryawan.alamat || "Alamat belum diisi"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}