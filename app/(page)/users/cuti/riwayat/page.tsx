"use client";

import NavbarUser from "@/components/LayoutsUser/navbar";
import SidebarUser from "@/components/LayoutsUser/sidebar";
import { Calendar, CalendarCheck, CalendarClock, Search, Filter, Icon } from "lucide-react";
import { title } from "process";
import React, { useState } from "react";

const Page = () => {
  const [filterStatus, setFilterStatus] = useState("Semua");

  const leaveHistory = [
    { jenis: "Tahunan", tanggal: "15 Feb - 17 Feb 2024", durasi: "3 Hari", alasan: "Acara Keluarga", status: "APPROVED" },
    { jenis: "Sakit", tanggal: "10 Jan - 11 Jan 2024", durasi: "1 Hari", alasan: "Flu & Demam", status: "APPROVED" },
    { jenis: "Tahunan", tanggal: "10 Mar - 12 Mar 2024", durasi: "3 Hari", alasan: "Liburan Akhir Pekan", status: "PENDING" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex ">
      <SidebarUser />
      <div className="flex-1 flex flex-col min-h-screen bg-[#F4F7FE]">
        <NavbarUser />

        <main className="p-8 md:p-12">
          {/* Header Title */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#004d7a]">Data & Saldo Cuti</h1>
            <p className="text-slate-500 mt-1">Informasi kuota dan riwayat pengajuan cuti Anda.</p>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <SaldoCard title="TOTAL CUTI" value="12" unit="Hari / Tahun" icon={Calendar} color="text-indigo-500" bg="bg-indigo-50" />
            <SaldoCard title="CUTI DIAMBIL" value="4" unit="Hari" icon={CalendarCheck} color="text-rose-500" bg="bg-rose-50" />
            <SaldoCard title="SISA CUTI" value="8" unit="Hari Tersisa" icon={CalendarClock} color="text-emerald-500" bg="bg-emerald-50" />
          </div>

          {/* Riwayat Table Section */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[#004d7a]">Riwayat Pengajuan</h2>

              {/* Filter Tabs */}
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                {["Semua", "Pending", "Approved", "Rejected"].map((tab) => (
                  <button key={tab} onClick={() => setFilterStatus(tab)} className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${filterStatus === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-y border-slate-50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Jenis Cuti</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Durasi</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Alasan</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leaveHistory.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-lg text-xs font-bold">{row.jenis}</span>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-600">{row.tanggal}</td>
                      <td className="px-8 py-6 text-sm font-black text-slate-700">{row.durasi}</td>
                      <td className="px-8 py-6 text-sm text-slate-400 italic font-medium">{row.alasan}</td>
                      <td className="px-8 py-6 text-right">
                        <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest ${row.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{row.status}</span>
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

// Sub-component untuk Card Saldo
const SaldoCard = ({ title, value, unit, icon: Icon, color, bg }:any) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-slate-800">{value}</span>
        <span className="text-xs font-bold text-slate-400">{unit}</span>
      </div>
    </div>
    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${bg} ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
  </div>
);

export default Page;
