"use client";

import NavbarUser from "@/components/LayoutsUser/navbar";
import SidebarUser from "@/components/LayoutsUser/sidebar";
import { 
  Clock, 
  Calendar, 
  Banknote, 
  ClipboardList, 
  ChevronRight,
  Bell
} from "lucide-react"; 
import React, { useState, useEffect } from "react";

const Page = () => {
  // State untuk menyimpan tanggal saat ini
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update setiap menit (opsional, agar jika lewat tengah malam tanggal berganti)
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Formatter Tanggal Indonesia (Contoh: Jumat, 06 Maret 2026)
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      <SidebarUser />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-1">Overview</p>
                <h1 className="text-4xl font-extrabold text-[#004d7a] tracking-tight">
                  Welcome back, user!
                </h1>
              </div>
              
              {/* Tanggal Dinamis Di Sini */}
              <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-zinc-100 px-4 py-2.5">
                <Calendar size={18} className="text-zinc-400" />
                <span className="text-sm font-bold text-zinc-600">
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={Clock} title="Kehadiran" value="22/24" status="On Track" color="blue" />
              <StatCard icon={Calendar} title="Sisa Cuti" value="8 Hari" status="Stable" color="emerald" />
              <StatCard icon={Banknote} title="Gaji Terakhir" value="Rp 5.5M" status="Paid" color="indigo" />
              <StatCard icon={ClipboardList} title="Tugas Pending" value="3" status="Review" color="amber" />
            </div>

            {/* LOWER CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Recent History */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-50 pb-5">
                  <h3 className="text-lg font-bold text-[#004d7a]">Recent Activities</h3>
                  <button className="text-xs font-extrabold text-blue-600 hover:text-blue-700 tracking-wider uppercase">View Report</button>
                </div>

                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#F4F7FE] transition-all group">
                      <div className="flex items-center gap-5">
                        <div className="h-11 w-11 bg-[#F4F7FE] rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-white transition-colors">
                          <Banknote size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 leading-none">Monthly Salary Disbursed</p>
                          <p className="text-xs font-medium text-zinc-400 mt-1.5">January 2026 • {i * 2}h ago</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-zinc-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcement */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col relative overflow-hidden">
                <div className="h-12 w-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
                  <Bell size={24} />
                </div>
                <h3 className="font-bold text-xl text-[#004d7a] mb-2">Office Announcement</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Informasi mengenai libur nasional pada <span className="text-zinc-900 font-bold underline decoration-blue-500 underline-offset-4">25 Maret 2026</span> telah diperbarui.
                </p>
                <div className="mt-auto pt-8">
                  <button className="w-full py-3 bg-[#004d7a] hover:bg-[#003d61] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/10">
                    Read Details
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, status, color }: any) => {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50",
    emerald: "text-emerald-600 bg-emerald-50",
    indigo: "text-indigo-600 bg-indigo-50",
    amber: "text-amber-600 bg-amber-50",
  };

  return (
    <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
      <div className="flex justify-between items-center mb-6">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${colors[color]} group-hover:scale-110 transition-transform`}>
          <Icon size={24} />
        </div>
        <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm ${colors[color]}`}>
          {status}
        </span>
      </div>
      <div>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-[#004d7a] mt-1 tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default Page;