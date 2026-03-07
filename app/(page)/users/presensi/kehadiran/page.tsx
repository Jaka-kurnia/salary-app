"use client";

import NavbarUser from "@/components/LayoutsUser/navbar";
import SidebarUser from "@/components/LayoutsUser/sidebar";
import React, { useState, useEffect } from "react";

const Page = () => {
  // Gunakan state untuk menyimpan string yang sudah diformat agar lebih aman
  const [formattedTime, setFormattedTime] = useState("--.--.--");
  const [formattedDate, setFormattedDate] = useState("Memuat tanggal...");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const updateDateTime = () => {
      const now = new Date();
      
      // Update Waktu
      const timeString = now.toLocaleTimeString("id-ID", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).replace(/:/g, ".");
      
      // Update Tanggal
      const dateString = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setFormattedTime(timeString);
      setFormattedDate(dateString);
    };

    // Jalankan langsung saat mount
    updateDateTime();

    // Jalankan interval setiap detik
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cegah Hydration Mismatch dengan mengembalikan struktur yang sama
  // sampai komponen benar-benar terpasang di client
  const displayTime = hasMounted ? formattedTime : "--.--.--";
  const displayDate = hasMounted ? formattedDate : "Memuat tanggal...";

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      {/* Sidebar tetap diam karena berada di luar area scroll */}
      <SidebarUser />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar tetap diam di atas */}
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Presensi Kehadiran</h1>
                <p className="text-slate-500 mt-1">Silahkan melakukan presensi harian Anda.</p>
              </div>
              
              {/* Real-time Clock Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 px-6">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800 tracking-tight">
                    {displayTime}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {displayDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 pb-10">
              {/* Left Column: Form Presensi */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-cyan-50 p-2 rounded-lg text-cyan-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h2 className="font-bold text-slate-800">Form Presensi</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">Status Kehadiran</label>
                      <div className="flex gap-3">
                        <button className="flex-1 py-3 px-4 bg-[#074670] text-white rounded-xl font-medium shadow-lg shadow-blue-900/20">Hadir</button>
                        <button className="flex-1 py-3 px-4 bg-slate-50 text-slate-400 rounded-xl font-medium border border-slate-100">Izin</button>
                        <button className="flex-1 py-3 px-4 bg-slate-50 text-slate-400 rounded-xl font-medium border border-slate-100">Sakit</button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">Keterangan (Opsional)</label>
                      <textarea 
                        placeholder="Contoh: Sakit flu, Izin urusan keluarga..." 
                        className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none text-sm"
                      ></textarea>
                    </div>

                    <button className="w-full py-4 bg-[#074670] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#063a5d] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Submit Kehadiran
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-700 to-blue-800 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/10">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-1 rounded-full shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-sm">Info Penting</h3>
                      <p className="text-[11px] text-indigo-100 leading-relaxed">
                        Batas waktu presensi masuk adalah pukul 08:30 WIB. Keterlambatan akan dicatat secara otomatis oleh sistem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Riwayat Kehadiran */}
              <div className="col-span-12 lg:col-span-8">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-8 flex justify-between items-center">
                    <h2 className="font-bold text-slate-800 text-lg">Riwayat Kehadiran</h2>
                    <button className="text-sm font-bold text-[#074670] hover:underline">Lihat Semua</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-y border-slate-50 bg-slate-50/50">
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Masuk</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pulang</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { tgl: "1 Mar 2024", m: "08:00", p: "17:00", s: "HADIR" },
                          { tgl: "28 Feb 2024", m: "08:15", p: "17:05", s: "HADIR" },
                          { tgl: "27 Feb 2024", m: "-", p: "-", s: "IZIN" },
                          { tgl: "26 Feb 2024", m: "07:55", p: "17:00", s: "HADIR" },
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-5 text-sm font-bold text-slate-700">{row.tgl}</td>
                            <td className="px-8 py-5 text-sm text-slate-600">{row.m}</td>
                            <td className="px-8 py-5 text-sm text-slate-600">{row.p}</td>
                            <td className="px-8 py-5">
                              <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                                row.s === 'HADIR' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                              }`}>
                                {row.s}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;