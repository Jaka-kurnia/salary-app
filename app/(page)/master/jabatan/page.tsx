import SidebarLayout from '@/components/Layouts/sidebar'
import NavbarLayout from '@/components/Layouts/navbar'
import React from 'react'
import { Plus, ChevronDown } from 'lucide-react' // Pastikan sudah install lucide-react

const page = () => {
  return (
    <div>
      <SidebarLayout>
         <NavbarLayout />
         <div className="flex min-h-screen bg-gray-100"> {/* Set background gray-100 */}
            <div className="pt-6 px-6 w-full">
                <h1 className="text-2xl font-bold text-slate-800">Management Jabatan</h1>
                <p className="text-sm text-slate-500 mb-8">Configure positions and salary structures.</p>

                {/* --- KONTEN SESUAI GAMBAR --- */}
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Card Form Tambah Jabatan */}
                  <div className="w-full lg:w-[350px] bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-fit">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                        <Plus size={20} />
                      </div>
                      <h2 className="text-lg font-bold text-slate-800">Tambah Jabatan</h2>
                    </div>

                    <div className="space-y-4">
                      {/* Input Nama Jabatan */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Jabatan</label>
                        <input 
                          type="text" 
                          placeholder="Contoh: Manager IT" 
                          className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                        />
                      </div>

                      {/* Select Divisi */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Divisi</label>
                        <div className="relative">
                          <select className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 text-sm appearance-none focus:outline-none text-slate-800 cursor-pointer">
                            <option>Pilih Divisi</option>
                            <option>INFORMATION TECHNOLOGY</option>
                            <option>HRD</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-3.5 text-slate-400" size={16} />
                        </div>
                      </div>

                      {/* Input Gaji Pokok */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Gaji Pokok</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-sm font-bold text-slate-400">Rp</span>
                          <input 
                            type="number" 
                            defaultValue="0"
                            className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 pl-10 text-sm focus:outline-none text-slate-800"
                          />
                        </div>
                      </div>

                      <button className="w-full bg-[#004d73] hover:bg-[#003d5c] text-white font-bold py-3 rounded-xl transition-all mt-2 shadow-md">
                        Simpan
                      </button>
                    </div>
                  </div>

                  {/* Card Data Jabatan */}
                  <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden text-slate-800">
                    <div className="p-6 flex justify-between items-center">
                      <h2 className="text-lg font-bold">Data Jabatan</h2>
                      <span className="bg-[#00c2cb]/10 text-[#00c2cb] text-xs px-3 py-1 rounded-full border border-[#00c2cb]/20 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#00c2cb] rounded-full"></span>
                        2 Items Total
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 border-y border-slate-100">
                          <tr>
                            <th className="px-6 py-4 font-bold">No</th>
                            <th className="px-6 py-4 font-bold">Jabatan</th>
                            <th className="px-6 py-4 font-bold">Divisi</th>
                            <th className="px-6 py-4 font-bold text-center">Gaji Pokok</th>
                            <th className="px-6 py-4 font-bold text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50 transition-colors font-bold text-slate-700">
                            <td className="px-6 py-5 text-sm text-slate-400">1</td>
                            <td className="px-6 py-5 text-sm">STAFF</td>
                            <td className="px-6 py-5">
                              <span className="bg-slate-100 text-[10px] px-2 py-1 rounded-md text-slate-600 border border-slate-200">INFORMATION TECHNOLOGY</span>
                            </td>
                            <td className="px-6 py-5 text-sm text-center text-emerald-600">Rp 3.000.000</td>
                            <td className="px-6 py-5 text-right">
                              <button className="text-slate-400 hover:text-slate-600 text-xs">Edit</button>
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors font-bold text-slate-700">
                            <td className="px-6 py-5 text-sm text-slate-400">2</td>
                            <td className="px-6 py-5 text-sm uppercase">Head of</td>
                            <td className="px-6 py-5">
                              <span className="bg-slate-100 text-[10px] px-2 py-1 rounded-md text-slate-600 border border-slate-200">HRD</span>
                            </td>
                            <td className="px-6 py-5 text-sm text-center text-emerald-600">Rp 5.000.000</td>
                            <td className="px-6 py-5 text-right">
                              <button className="text-slate-400 hover:text-slate-600 text-xs">Edit</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
            </div>
         </div>
      </SidebarLayout>
    </div>
  )
}

export default page