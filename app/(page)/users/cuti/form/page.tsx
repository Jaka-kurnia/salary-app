"use client";

import NavbarUser from "@/components/LayoutsUser/navbar";
import SidebarUser from "@/components/LayoutsUser/sidebar";
import { 
  Calendar as CalendarIcon, 
  Heart, 
  AlertCircle, 
  Users, 
  Upload, 
  Send, 
  Info 
} from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [selectedType, setSelectedType] = useState("tahunan");

  return (
    /* KUNCI UTAMA: 
       1. h-screen: Memaksa tinggi container pas seukuran layar.
       2. overflow-hidden: Mencegah scroll pada level body/utama.
    */
    <div className="flex h-screen overflow-hidden bg-[#F4F7FE]">
      
      {/* Sidebar tetap diam karena berada di luar area scroll utama */}
      <SidebarUser />

      {/* AREA KANAN:
         1. min-w-0: Mencegah flex-item meluap (overflowing).
         2. flex-col: Mengatur Navbar di atas dan Main di bawah.
      */
      }
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navbar tetap di atas */}
        <NavbarUser />

        {/* MAIN CONTENT:
           1. flex-1: Mengambil sisa ruang tinggi yang tersedia.
           2. overflow-y-auto: Memberikan izin scroll hanya pada area konten ini.
        */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 bg-zinc-50/50 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {/* Header Title */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-slate-800">Form Pengajuan Cuti</h1>
              <p className="text-slate-500 mt-1">Silahkan lengkapi data di bawah ini untuk mengajukan cuti.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Main Form Card */}
              <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 mb-8 lg:mb-0">
                <form className="space-y-8">
                  
                  {/* Pilih Jenis Cuti */}
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Pilih Jenis Cuti</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <LeaveTypeBtn 
                        active={selectedType === "tahunan"} 
                        onClick={() => setSelectedType("tahunan")}
                        icon={CalendarIcon} label="Cuti Tahunan" color="text-emerald-500" bg="bg-emerald-50" 
                      />
                      <LeaveTypeBtn 
                        active={selectedType === "sakit"} 
                        onClick={() => setSelectedType("sakit")}
                        icon={Heart} label="Cuti Sakit" color="text-rose-500" bg="bg-rose-50" 
                      />
                      <LeaveTypeBtn 
                        active={selectedType === "penting"} 
                        onClick={() => setSelectedType("penting")}
                        icon={AlertCircle} label="Alasan Penting" color="text-amber-500" bg="bg-amber-50" 
                      />
                      <LeaveTypeBtn 
                        active={selectedType === "bersama"} 
                        onClick={() => setSelectedType("bersama")}
                        icon={Users} label="Cuti Bersama" color="text-indigo-500" bg="bg-indigo-50" 
                      />
                    </div>
                  </div>

                  {/* Tanggal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Tanggal Mulai</label>
                      <input type="date" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Tanggal Berakhir</label>
                      <input type="date" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600" />
                    </div>
                  </div>

                  {/* Alasan */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Alasan Cuti</label>
                    <textarea 
                      placeholder="Berikan alasan yang jelas untuk pengajuan cuti Anda..." 
                      className="w-full h-40 p-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none text-slate-600"
                    ></textarea>
                  </div>

                  {/* Upload Section */}
                  <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="text-blue-500" size={28} />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Upload Dokumen Pendukung (Opsional)</p>
                    <p className="text-xs text-slate-400 mt-1">PDF, JPG, atau PNG (Maks 2MB)</p>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="w-full py-5 bg-[#004d7a] hover:bg-[#003d61] text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/10">
                    <Send size={20} />
                    Kirim Pengajuan
                  </button>

                </form>
              </div>

              {/* RIGHT: Ketentuan Card */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-0">
                <div className="bg-[#121926] text-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-8">
                    <Info className="text-cyan-400" size={24} />
                    <h2 className="text-xl font-bold">Ketentuan Cuti</h2>
                  </div>

                  <ul className="space-y-6">
                    <KetentuanItem number="1" text="Pengajuan cuti dilakukan minimal 3 hari sebelum tanggal mulai." />
                    <KetentuanItem number="2" text="Cuti sakit wajib melampirkan surat keterangan dokter." />
                    <KetentuanItem number="3" text="Persetujuan cuti bergantung pada kebijakan manajer divisi." />
                  </ul>

                  {/* Help Box */}
                  <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-3xl">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Butuh Bantuan?</p>
                    <p className="text-sm text-slate-300">Hubungi HRD melalui email</p>
                    <p className="text-sm font-bold text-cyan-400 mt-1">hrd@company.com</p>
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

// Sub-component for Leave Type Buttons
const LeaveTypeBtn = ({ icon: Icon, label, color, bg, active, onClick }: any) => (
  <button 
    onClick={onClick}
    type="button"
    className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all ${
      active ? 'border-blue-500 bg-blue-50/30' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'
    }`}
  >
    <div className={`p-3 rounded-2xl mb-3 ${bg} ${color}`}>
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-black text-slate-500 uppercase text-center">{label}</span>
  </button>
);

// Sub-component for Ketentuan List
const KetentuanItem = ({ number, text }: { number: string, text: string }) => (
  <li className="flex gap-4 items-start">
    <span className="min-w-[28px] h-[28px] bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-400">
      {number}
    </span>
    <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
  </li>
);

export default Page;