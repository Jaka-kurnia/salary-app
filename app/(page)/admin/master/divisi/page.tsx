"use client";
import SidebarLayout from "@/components/Layouts/sidebar";
import NavbarLayout from "@/components/Layouts/navbar";
import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Divisi {
  id: number;
  divisi: string;
}

const ManagementDivisi = () => {
  // --- State Management ---
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [namaDivisi, setNamaDivisi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // --- Fetch Data ---
  const fetchDivisi = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data");
      setDivisiList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDivisi();
  }, [token]);

  // --- Actions: Create & Update ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ divisi: namaDivisi }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Terjadi kesalahan");

      setNamaDivisi("");
      setEditingId(null);
      fetchDivisi();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Actions: Delete ---
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus divisi ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus data");
      fetchDivisi();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (item: Divisi) => {
    setEditingId(item.id);
    setNamaDivisi(item.divisi);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNamaDivisi("");
  };

  return (
    <SidebarLayout>
      <NavbarLayout />
      <div className="flex min-h-screen bg-gray-100">
        <div className="pt-6 px-6 w-full">
          {/* Header */}
          <h1 className="text-2xl font-bold text-slate-800">Management Divisi</h1>
          <p className="text-sm text-slate-500">Configure and manage company departments</p>

          <div className="flex flex-col lg:flex-row gap-6 mt-8">
            {/* Form Section */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-3xl h-fit border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-slate-100 p-2 rounded-lg text-[#004d73]">
                  {editingId ? <Pencil size={20} /> : <Plus size={20} />}
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId ? "Edit Divisi" : "Tambah Divisi"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Divisi</label>
                  <input
                    type="text"
                    value={namaDivisi}
                    onChange={(e) => setNamaDivisi(e.target.value)}
                    placeholder="Contoh: IT Support"
                    className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#004d73]/20 focus:border-[#004d73] transition-all text-slate-800"
                    required
                  />
                </div>

                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

                <div className="flex gap-2">
                  <button
                    disabled={loading}
                    className="flex-1 bg-[#004d73] hover:bg-[#003d5c] text-white font-semibold py-3 rounded-xl transition-all shadow-md disabled:opacity-50"
                  >
                    {loading ? "Processing..." : editingId ? "Update" : "Simpan"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-3 rounded-xl transition-all"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Table Section */}
            <div className="w-full lg:w-2/3 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Data Divisi</h2>
                <span className="bg-[#00c2cb]/10 text-[#00c2cb] text-xs px-3 py-1 rounded-full border border-[#00c2cb]/20 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 bg-[#00c2cb] rounded-full"></span>
                  {divisiList.length} Items Total
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 border-y border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-bold">No</th>
                      <th className="px-6 py-4 font-bold">Nama Divisi</th>
                      <th className="px-6 py-4 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {divisiList.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-8 py-16 text-center text-slate-400 italic">
                          No departments found.
                        </td>
                      </tr>
                    ) : (
                      divisiList.map((divisi, index) => (
                        <tr key={divisi.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-5 font-bold text-slate-400">{index + 1}</td>
                          <td className="px-6 py-5 font-semibold text-slate-700">{divisi.divisi}</td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all">
                              <button
                                onClick={() => handleEdit(divisi)}
                                className="p-2 text-slate-400 hover:text-[#004d73] hover:bg-slate-100 rounded-lg transition-all"
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(divisi.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Hapus"
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

export default ManagementDivisi;