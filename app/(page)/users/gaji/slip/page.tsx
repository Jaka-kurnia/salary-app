"use client";

import NavbarUser from "@/components/LayoutsUser/navbar";
import SidebarUser from "@/components/LayoutsUser/sidebar";
import { Eye, Download, Printer, X } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  // State untuk kontrol modal dan data yang dipilih
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<any>(null);

  const salaryData = [
    { 
      periode: "Maret 2024", 
      total: "Rp 15.300.000", 
      tanggal: "2024-03-25", 
      status: "PAID",
      details: { gajiPokok: "Rp 15.000.000", uangCuti: "+Rp 500.000", potongan: "-Rp 200.000" } 
    },
    { 
      periode: "Februari 2024", 
      total: "Rp 14.800.000", 
      tanggal: "2024-02-25", 
      status: "PAID",
      details: { gajiPokok: "Rp 14.500.000", uangCuti: "+Rp 500.000", potongan: "-Rp 200.000" } 
    },
    { 
      periode: "Januari 2024", 
      total: "Rp 15.150.000", 
      tanggal: "2024-01-25", 
      status: "PAID",
      details: { gajiPokok: "Rp 14.850.000", uangCuti: "+Rp 500.000", potongan: "-Rp 200.000" } 
    },
  ];

  const openDetail = (item: any) => {
    setSelectedSalary(item);
    setIsModalOpen(true);
  };

  return (
    /* Perbaikan: Gunakan h-screen dan overflow-hidden agar sidebar tetap diam */
    <div className="flex h-screen overflow-hidden bg-[#F4F7FE]">
      <SidebarUser />
      <div className="flex-1 flex flex-col min-w-0">
        <NavbarUser />

        <main className="flex-1 overflow-y-auto p-8 md:p-12 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-[#004d7a]">Riwayat Slip Gaji</h1>
              <p className="text-slate-500 mt-1">Unduh slip gaji bulanan Anda dengan mudah.</p>
            </div>

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
                            <button 
                              onClick={() => openDetail(item)}
                              className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100"
                            >
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
          </div>
        </main>
      </div>

      {/* --- MODAL DETAIL GAJI --- */}
      {isModalOpen && selectedSalary && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            
            {/* Header Modal (Dark Navy) */}
            <div className="bg-[#0f172a] p-8 text-white relative">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl font-bold tracking-tighter">SALARY<span className="text-cyan-400">APP</span></span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-400">OFFICIAL PAYSLIP</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Periode</p>
                  <h3 className="text-2xl font-bold">{selectedSalary.periode}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Pay Date</p>
                  <p className="font-bold">{selectedSalary.tanggal}</p>
                </div>
              </div>
            </div>

            {/* Content Modal */}
            <div className="p-8 space-y-8">
              {/* Earnings */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Earnings</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Gaji Pokok</span>
                    <span className="font-bold text-slate-700">{selectedSalary.details.gajiPokok}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Uang Cuti</span>
                    <span className="font-bold text-emerald-500">{selectedSalary.details.uangCuti}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Deductions</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Potongan</span>
                  <span className="font-bold text-rose-500">{selectedSalary.details.potongan}</span>
                </div>
              </div>

              {/* Total Netto */}
              <div className="bg-slate-50 p-6 rounded-3xl flex justify-between items-center border border-slate-100">
                <span className="font-black text-slate-800 text-sm uppercase tracking-wider">Total Netto</span>
                <span className="text-xl font-black text-[#004d7a]">{selectedSalary.total}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-4 bg-[#0f172a] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                  <Printer size={18} />
                  Print Payslip
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;