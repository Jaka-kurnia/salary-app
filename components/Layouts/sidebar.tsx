"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import ini untuk deteksi URL
import { 
  LayoutDashboard, Database, ChevronUp, Building2, 
  Briefcase, Users, CalendarCheck, CalendarDays, Wallet, 
  GripIcon
} from "lucide-react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Ambil path saat ini
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMasterOpen, setIsMobileMasterOpen] = useState(false);

  // Cek apakah path saat ini berada di bawah folder /master
  const isMasterActive = pathname.startsWith("/master");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 text-slate-900">
      
      {/* SIDEBAR - Desktop */}
      <aside className="hidden md:flex w-[280px] bg-[#004d73] text-white p-5 flex-col gap-1 fixed h-full overflow-y-auto z-50 shadow-2xl">
        <Link href="/admin/dashboard" className="flex items-center gap-3 mb-8 px-2 py-4">
          <div className="bg-[#00c2cb] p-2 rounded-xl flex items-center justify-center w-10 h-10 shadow-lg">
            <span className="font-bold text-xl text-white">s</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Salary<span className="text-[#00c2cb]">App</span></h1>
        </Link>

        {/* Dashboard Link */}
        <MenuLink 
          href="/admin/dashboard" 
          icon={<LayoutDashboard size={22} />} 
          label="Dashboard" 
          active={pathname === "/admin/dashboard"} 
        />

        {/* Master Accordion */}
        <div className="flex flex-col">
          <div 
            onClick={() => setIsOpen(!isOpen)} 
            className={`flex items-center justify-between w-full p-3.5 rounded-xl transition-all cursor-pointer border-2 ${
              isMasterActive ? 'border-[#00c2cb] bg-white/10' : 'border-transparent hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-4">
              <Database size={22} className={isMasterActive ? "text-[#00c2cb]" : ""} />
              <span className={`text-[17px] font-medium ${isMasterActive ? "text-white" : "text-white/80"}`}>Master</span>
            </div>
            <ChevronUp size={18} className={`transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {isOpen && (
            <div className="flex flex-col mt-1 space-y-1">
              <SubMenuItem href="/admin/master/divisi" icon={<Building2 size={18} />} label="Divisi" active={pathname === "/admin/master/divisi"} />
              <SubMenuItem href="/admin/master/jabatan" icon={<Briefcase size={18} />} label="Jabatan" active={pathname === "/admin/master/jabatan"} />
              <SubMenuItem href="/admin/master/karyawan" icon={<Users size={18} />} label="Karyawan" active={pathname === "/admin/master/karyawan"} />
              <SubMenuItem href="/admin/master/user" icon={<Users size={18} />} label="User" active={pathname === "/admin/master/user"} />
              <SubMenuItem href="/admin/master/konfigurasi" icon={<GripIcon size={18} />} label="Konfigurasi" active={pathname === "/admin/master/konfigurasi"} />
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <MenuLink href="/admin/presensi" icon={<CalendarCheck size={22} />} label="Presensi" active={pathname === "/admin/presensi"} />
          <MenuLink href="/admin/cuti" icon={<CalendarDays size={22} />} label="Cuti" active={pathname === "/admin/cuti"} />
          <MenuLink href="/admin/gaji" icon={<Wallet size={22} />} label="Gaji" active={pathname === "/admin/gaji"} />
        </div>
      </aside>

      {/* MOBILE NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#004d73] text-white border-t border-white/10 z-[100] px-2 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center">
          <MobileTab href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dash" active={pathname === "/dashboard"} />
          <button 
            onClick={() => setIsMobileMasterOpen(!isMobileMasterOpen)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              isMobileMasterOpen || isMasterActive ? 'text-[#00c2cb] bg-white/10' : 'text-white/70'
            }`}
          >
            <Database size={20} />
            <span className="text-[10px]">Master</span>
          </button>
          <MobileTab href="/presensi" icon={<CalendarCheck size={20} />} label="Absen" active={pathname === "/presensi"} />
          <MobileTab href="/gaji" icon={<Wallet size={20} />} label="Gaji" active={pathname === "/gaji"} />
        </div>

        {isMobileMasterOpen && (
          <div className="absolute bottom-24 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="w-full text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1 px-2">Data Master</h3>
            <MobileSubItem href="/master/divisi" label="Divisi" active={pathname === "/master/divisi"} />
            <MobileSubItem href="/master/jabatan" label="Jabatan" active={pathname === "/master/jabatan"} />
            <MobileSubItem href="/master/karyawan" label="Karyawan" active={pathname === "/master/karyawan"} />
            <MobileSubItem href="/master/user" label="User" active={pathname === "/master/user"} />
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
      <main className="flex-1 md:ml-[280px] p-6 mb-24 md:mb-0 transition-all">
        {children}
      </main>
    </div>
  );
}

// --- Komponen Pembantu dengan logic 'active' ---

function SubMenuItem({ href, icon, label, active }: { href: string, icon: any, label: string, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-4 p-3 pl-10 cursor-pointer transition-all rounded-xl ${
        active 
        ? 'text-white bg-[#00c2cb]/20 font-bold border-l-4 border-[#00c2cb]' 
        : 'text-white/60 hover:text-white hover:bg-white/5 font-medium'
      }`}
    >
      <span className={active ? "text-[#00c2cb]" : ""}>{icon}</span>
      <span className="text-[15px]">{label}</span>
    </Link>
  );
}

function MenuLink({ href, icon, label, active }: { href: string, icon: any, label: string, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-4 w-full p-3.5 rounded-xl transition-all ${
        active 
        ? 'bg-white text-[#004d73] shadow-lg shadow-black/20 font-bold' 
        : 'text-white/80 hover:bg-white/10 font-medium'
      }`}
    >
      <span className={active ? "text-[#00c2cb]" : ""}>{icon}</span>
      <span className="text-[17px]">{label}</span>
    </Link>
  );
}

function MobileTab({ href, icon, label, active }: { href: string, icon: any, label: string, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center gap-1 p-2 transition-all rounded-lg ${
        active ? 'text-[#00c2cb] bg-white/10' : 'text-white/70'
      }`}
    >
      {icon} <span className="text-[10px]">{label}</span>
    </Link>
  );
}

function MobileSubItem({ href, label, active }: { href: string, label: string, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`px-5 py-2.5 rounded-full text-xs font-bold border transition-all ${
        active 
        ? 'bg-[#00c2cb] text-white border-[#00c2cb]' 
        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
      }`}
    >
      {label}
    </Link>
  );
}