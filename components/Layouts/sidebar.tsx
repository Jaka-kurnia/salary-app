"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Database, ChevronUp, Building2, 
  Briefcase, Users, CalendarCheck, CalendarDays, Wallet 
} from "lucide-react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMasterOpen, setIsMobileMasterOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 text-slate-900">
      
      {/* SIDEBAR - Desktop (Layar md ke atas) */}
      <aside className="hidden md:flex w-[280px] bg-[#004d73] text-white p-5 flex-col gap-1 fixed h-full overflow-y-auto z-50">
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 px-2 py-4">
          <div className="bg-[#00c2cb] p-2 rounded-xl flex items-center justify-center w-10 h-10 shadow-lg">
            <span className="font-bold text-xl text-white">s</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Salary<span className="text-[#00c2cb]">App</span></h1>
        </Link>

        <Link href="/dashboard" className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all mb-1">
          <LayoutDashboard size={22} className="text-[#00c2cb]" />
          <span className="text-[17px] font-medium">Dashboard</span>
        </Link>

        <div className="flex flex-col">
          <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-3.5 rounded-xl border-2 border-white/90 cursor-pointer">
            <div className="flex items-center gap-4">
              <Database size={22} />
              <span className="text-[17px] font-medium">Master</span>
            </div>
            <ChevronUp size={18} className={`transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
          </div>
          {isOpen && (
            <div className="flex flex-col mt-1">
              <SubMenuItem href="/master/divisi" icon={<Building2 size={18} />} label="Divisi" />
              <SubMenuItem href="/master/jabatan" icon={<Briefcase size={18} />} label="Jabatan" />
              <SubMenuItem href="/master/karyawan" icon={<Users size={18} />} label="Karyawan" />
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <MenuLink href="/presensi" icon={<CalendarCheck size={22} />} label="Presensi" />
          <MenuLink href="/cuti" icon={<CalendarDays size={22} />} label="Cuti" />
          <MenuLink href="/gaji" icon={<Wallet size={22} />} label="Gaji" />
        </div>
      </aside>

      {/* MOBILE NAVIGATION - Bottom (Layar di bawah md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#004d73] text-white border-t border-white/10 z-[100] px-2 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center">
          <MobileTab href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dash" />
          <button 
            onClick={() => setIsMobileMasterOpen(!isMobileMasterOpen)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${isMobileMasterOpen ? 'text-[#00c2cb] bg-white/10' : 'text-white/70'}`}
          >
            <Database size={20} />
            <span className="text-[10px]">Master</span>
          </button>
          <MobileTab href="/presensi" icon={<CalendarCheck size={20} />} label="Absen" />
          <MobileTab href="/gaji" icon={<Wallet size={20} />} label="Gaji" />
        </div>

        {/* Floating Mobile Master Menu */}
        {isMobileMasterOpen && (
          <div className="absolute bottom-24 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="w-full text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1 px-2">Data Master</h3>
            <MobileSubItem href="/master/divisi" label="Divisi" />
            <MobileSubItem href="/master/jabatan" label="Jabatan" />
            <MobileSubItem href="/master/karyawan" label="Karyawan" />
            <button 
              onClick={() => setIsMobileMasterOpen(false)} 
              className="w-full mt-2 py-2 bg-slate-50 text-slate-400 text-xs rounded-xl border border-slate-100"
            >
              Tutup
            </button>
          </div>
        )}
      </nav>

      {/* CONTENT AREA */}
      <main className="flex-1 md:ml-[280px] p-6 mb-24 md:mb-0">
        {children}
      </main>
    </div>
  );
}

// Komponen Pembantu (Hanya digunakan secara internal di file ini)
function SubMenuItem({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 p-3 pl-10 text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-colors rounded-lg">
      {icon} <span className="font-medium text-[15px]">{label}</span>
    </Link>
  );
}

function MenuLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 w-full p-3.5 rounded-xl hover:bg-white/10 transition-all text-white/90">
      {icon} <span className="text-[17px] font-medium">{label}</span>
    </Link>
  );
}

function MobileTab({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 p-2 text-white/70 hover:text-[#00c2cb] transition-all">
      {icon} <span className="text-[10px]">{label}</span>
    </Link>
  );
}

function MobileSubItem({ href, label }: { href: string, label: string }) {
  return (
    <Link href={href} className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-700 text-xs font-bold border border-slate-200 transition-colors">
      {label}
    </Link>
  );
}