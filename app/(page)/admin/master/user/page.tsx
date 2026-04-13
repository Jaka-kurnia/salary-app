"use client";

import { useEffect, useState } from "react";
import NavbarLayout from "@/components/Layouts/navbar";
import SidebarLayout from "@/components/Layouts/sidebar";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserPage = () => {
  // State Utama
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Fetch Data
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data user");
      setUserList(data.data || data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  // Submit Logic (Create & Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user";
    
    const method = editingId ? "PATCH" : "POST";

    const body: any = { name, email, role };
    if (password || !editingId) body.password = password;

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memproses data");

      resetForm();
      fetchUser();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("user");
    setEditingId(null);
  };

  const handleEdit = (item: User) => {
    setEditingId(item.id);
    setName(item.name);
    setEmail(item.email);
    setRole(item.role);
    setPassword("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data user ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Gagal menghapus user");
      fetchUser();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <SidebarLayout>
      <NavbarLayout />

      <div className="min-h-screen bg-zinc-50 p-6 lg:p-10 dark:bg-zinc-950">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#003557] dark:text-white">Management User</h1>
          <p className="text-zinc-500">Control system access and user permissions.</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* --- KIRI: FORM --- */}
          <aside className="w-full rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 lg:w-[400px] lg:sticky lg:top-24">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                {editingId ? <Pencil className="h-5 w-5 text-sky-600" /> : <Plus className="h-5 w-5 text-[#003557]" />}
              </div>
              <h2 className="text-xl font-bold text-[#003557] dark:text-white">
                {editingId ? "Edit User" : "Tambah User"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Nama</label>
                <input required type="text" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Email</label>
                <input required type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Password</label>
                <input 
                  required={!editingId} 
                  type="password" 
                  placeholder={editingId ? "Kosongkan jika tidak diubah" : "••••••••"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#003557] dark:text-zinc-300">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 outline-none">
                  <option value="user">User / Karyawan</option>
                  <option value="admin">Admin HRD</option>
                </select>
              </div>

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <div className="flex gap-2">
                <button disabled={loading} type="submit" className="flex-1 rounded-xl bg-[#00426d] py-3.5 font-bold text-white transition hover:bg-[#003557] active:scale-[0.98] shadow-lg shadow-sky-900/10 flex justify-center items-center">
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (editingId ? "Update" : "Simpan")}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="rounded-xl bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Batal
                  </button>
                )}
              </div>
            </form>
          </aside>

          {/* --- KANAN: TABEL --- */}
          <section className="flex-1 rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#003557] dark:text-white">Data User</h2>
              <span className="rounded-full bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-600 dark:bg-sky-900/30">
                ● {userList.length} Items Total
              </span>
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
                  {userList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-zinc-400 italic">
                        {loading ? "Memuat data..." : "Tidak ada data user."}
                      </td>
                    </tr>
                  ) : (
                    userList.map((item, index) => (
                      <tr key={item.id} className="border-t border-zinc-50 dark:border-zinc-800 group hover:bg-zinc-50/50 transition-colors">
                        <td className="py-6 font-bold text-sky-600/70">{index + 1}</td>
                        <td className="py-6 font-bold text-[#003557] dark:text-zinc-200">{item.name}</td>
                        <td className="py-6 text-zinc-500">{item.email}</td>
                        <td className="py-6 text-center">
                          <span className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-tighter ${
                            item.role === 'admin' 
                            ? 'bg-amber-50 text-amber-500 dark:bg-amber-900/20' 
                            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                          }`}>
                            {item.role}
                          </span>
                        </td>
                        <td className="py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(item)} className="p-2 text-zinc-400 hover:text-sky-600">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-zinc-400 hover:text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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

export default UserPage;