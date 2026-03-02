import SidebarLayout from "@/components/Layouts/sidebar";
import NavbarLayout from "@/components/Layouts/navbar";
import React from "react";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <div>
      <SidebarLayout>
        <NavbarLayout />
        {/* Background utama diubah ke bg-gray-100 */}
        <div className="flex min-h-screen bg-gray-100">
          <div className="pt-6 px-6 w-full">
            {/* Teks utama menggunakan slate-800 */}
            <h1 className="text-2xl font-bold text-slate-800">Management Divisi</h1>
            <p className="text-sm text-slate-500">Configure and manage company departments</p>

            <div className="flex flex-col lg:flex-row gap-6 mt-8">
              {/* Form Tambah Divisi - Card Putih */}
              <div className="w-full lg:w-1/3 bg-white text-slate-800 p-6 rounded-3xl h-fit border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-slate-100 p-2 rounded-lg text-[#004d73]">
                    <Plus size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Tambah Divisi</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Divisi</label>
                    <input type="text" placeholder="Contoh: IT Support" className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#004d73]/20 focus:border-[#004d73] transition-all text-slate-800" />
                  </div>
                  <button className="w-full bg-[#004d73] hover:bg-[#003d5c] text-white font-semibold py-3 rounded-xl transition-all shadow-md mt-4">Simpan</button>
                </div>
              </div>

              {/* Tabel Data Divisi - Card Putih */}
              <div className="w-full lg:w-2/3 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800">Data Divisi</h2>
                  <span className="bg-[#00c2cb]/10 text-[#00c2cb] text-xs px-3 py-1 rounded-full border border-[#00c2cb]/20 flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 bg-[#00c2cb] rounded-full"></span>3 Items Total
                  </span>
                </div>

                <table className="w-full text-left">
                  <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 border-y border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-bold">No</th>
                      <th className="px-6 py-4 font-bold">Nama Divisi</th>
                      <th className="px-6 py-4 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: 1, name: "INFORMATION TECHNOLOGY" },
                      { id: 2, name: "EDUCATION" },
                      { id: 3, name: "HRD" },
                    ].map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5 text-sm font-bold text-slate-400">{item.id}</td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-700 tracking-wide">{item.name}</td>
                        <td className="px-6 py-5 text-right">
                          <button className="text-slate-400 hover:text-slate-600 font-medium text-xs">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default page;
