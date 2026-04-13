"use client";
import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "@/components/Layouts/sidebar";
import NavbarLayout from "@/components/Layouts/navbar";
import { Plus, ChevronDown, Pencil, Trash2, X, Search } from "lucide-react";

interface Divisi {
  id: number;
  divisi: string;
}

interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number;
  gaji_pokok: number;
  divisi?: Divisi;
}

const JabatanPage = () => {
  // --- States ---
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [namaJabatan, setNamaJabatan] = useState("");
  const [idDivisi, setIdDivisi] = useState<string>("");
  const [gajiPokok, setGajiPokok] = useState("");

  // Searchable Select states
  const [searchDivisi, setSearchDivisi] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // --- Click Outside Handler ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- API Calls ---
  const fetchDivisi = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok) setDivisiList(data.data || data);
    } catch (err) { console.error(err); }
  };

  const fetchJabatan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data");
      setJabatanList(data.data || data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (token) {
      fetchDivisi();
      fetchJabatan();
    }
  }, [token]);

  // --- CRUD Logic ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          jabatan: namaJabatan,
          id_divisi: parseInt(idDivisi),
          gaji_pokok: parseInt(gajiPokok),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menyimpan data");
      }

      resetForm();
      fetchJabatan();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus jabatan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (res.ok) fetchJabatan();
    } catch (err: any) { setError(err.message); }
  };

  const handleEdit = (item: Jabatan) => {
    setEditingId(item.id);
    setNamaJabatan(item.jabatan);
    setIdDivisi(item.id_divisi.toString());
    setGajiPokok(item.gaji_pokok.toString());
  };

  const resetForm = () => {
    setEditingId(null);
    setNamaJabatan("");
    setIdDivisi("");
    setGajiPokok("");
    setError("");
  };

  // --- Helpers ---
  const filteredDivisi = divisiList.filter(d => d.divisi.toLowerCase().includes(searchDivisi.toLowerCase()));
  const selectedDivisiLabel = divisiList.find(d => d.id.toString() === idDivisi)?.divisi || "Pilih Divisi";
  const getDivisiName = (id: number) => divisiList.find(d => d.id === id)?.divisi || "N/A";
  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  return (
    <SidebarLayout>
      <NavbarLayout />
      <div className="flex min-h-screen bg-gray-100">
        <div className="pt-6 px-6 w-full">
          {/* Header */}
          <h1 className="text-2xl font-bold text-slate-800">Management Jabatan</h1>
          <p className="text-sm text-slate-500 mb-8">Configure positions and salary structures.</p>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* --- Form Section --- */}
            <div className="w-full lg:w-96 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-fit lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-slate-100 p-2 rounded-lg text-[#004d73]">
                  {editingId ? <Pencil size={20} /> : <Plus size={20} />}
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  {editingId ? "Edit Jabatan" : "Tambah Jabatan"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Jabatan */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Jabatan</label>
                  <input
                    type="text"
                    value={namaJabatan}
                    onChange={(e) => setNamaJabatan(e.target.value)}
                    placeholder="Contoh: Manager IT"
                    className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#004d73]/20 text-slate-800 transition-all"
                    required
                  />
                </div>

                {/* Searchable Select Divisi */}
                <div className="relative" ref={selectRef}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Divisi</label>
                  <div
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 text-sm flex justify-between items-center cursor-pointer hover:border-[#004d73] transition-all"
                  >
                    <span className={idDivisi ? "text-slate-800" : "text-slate-400"}>{selectedDivisiLabel}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isSelectOpen && (
                    <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden ring-1 ring-black/5">
                      <div className="p-2 border-b border-slate-50">
                        <div className="relative">
                          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Cari divisi..."
                            value={searchDivisi}
                            onChange={(e) => setSearchDivisi(e.target.value)}
                            className="w-full bg-slate-50 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none border border-transparent focus:border-[#004d73]/30"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredDivisi.length === 0 ? (
                          <p className="p-4 text-center text-xs text-slate-400 italic">Tidak ditemukan</p>
                        ) : (
                          filteredDivisi.map((d) => (
                            <div
                              key={d.id}
                              onClick={() => {
                                setIdDivisi(d.id.toString());
                                setIsSelectOpen(false);
                                setSearchDivisi("");
                              }}
                              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                                idDivisi === d.id.toString() ? 'bg-[#004d73] text-white' : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {d.divisi}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Gaji Pokok */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Gaji Pokok</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-sm font-bold text-slate-400">Rp</span>
                    <input
                      type="number"
                      value={gajiPokok}
                      onChange={(e) => setGajiPokok(e.target.value)}
                      className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 pl-10 text-sm focus:outline-none text-slate-800"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}

                <div className="flex gap-2">
                  <button
                    disabled={loading}
                    className="flex-1 bg-[#004d73] hover:bg-[#003d5c] text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-50"
                  >
                    {loading ? "Process..." : editingId ? "Update" : "Simpan"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 rounded-xl"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* --- Table Section --- */}
            <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800">Data Jabatan</h2>
                <span className="bg-[#00c2cb]/10 text-[#00c2cb] text-xs px-3 py-1 rounded-full border border-[#00c2cb]/20 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00c2cb] rounded-full animate-pulse"></span>
                  {jabatanList.length} Items Total
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 border-y border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-bold text-center">No</th>
                      <th className="px-6 py-4 font-bold">Jabatan</th>
                      <th className="px-6 py-4 font-bold">Divisi</th>
                      <th className="px-6 py-4 font-bold">Gaji Pokok</th>
                      <th className="px-6 py-4 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jabatanList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-16 text-center text-slate-400 italic">No roles found.</td>
                      </tr>
                    ) : (
                      jabatanList.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-5 text-center font-bold text-slate-400">{index + 1}</td>
                          <td className="px-6 py-5 font-bold text-slate-700">{item.jabatan}</td>
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200">
                              {getDivisiName(item.id_divisi)}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-emerald-600 font-bold tabular-nums">
                            {formatCurrency(item.gaji_pokok)}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all">
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-slate-400 hover:text-[#004d73] hover:bg-slate-100 rounded-lg transition-all"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default JabatanPage;