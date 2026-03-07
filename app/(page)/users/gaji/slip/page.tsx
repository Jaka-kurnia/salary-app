"use client";

import NavbarUser from "@/components/LayoutsUser/navbar";
import SidebarUser from "@/components/LayoutsUser/sidebar";
import { Eye, Download } from "lucide-react";
import React from "react";

const Page = () => {
  const salaryData = [
    { periode: "Maret 2024", total: "Rp 15.300.000", tanggal: "2024-03-25", status: "PAID" },
    { periode: "Februari 2024", total: "Rp 14.800.000", tanggal: "2024-02-25", status: "PAID" },
    { periode: "Januari 2024", total: "Rp 15.150.000", tanggal: "2024-01-25", status: "PAID" },
  ];

  return (
    <div className="flex min-h-screen">
    <SidebarUser/>
      <div className="flex-1 flex flex-col min-h-screen bg-[#F4F7FE]">
        <NavbarUser />

        <main className="p-8 md:p-12">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#004d7a]">Riwayat Slip Gaji</h1>
            <p className="text-slate-500 mt-1">Unduh slip gaji bulanan Anda dengan mudah.</p>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-50">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Periode</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Gaji Netto</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Pembayaran</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {salaryData.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6 text-sm font-bold text-[#004d7a]">{item.periode}</td>
                      <td className="px-8 py-6 text-sm font-black text-slate-800">{item.total}</td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-400">{item.tanggal}</td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest bg-emerald-50 text-emerald-600">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100">
                            <Eye size={18} />
                          </button>
                          <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100">
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      </div>
  );
};

export default Page;