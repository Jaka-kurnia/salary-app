"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link untuk navigasi
import { 
  LayoutDashboard, Database, ChevronUp, Building2, 
  Briefcase, Users, UserSquare2, Settings2, 
  CalendarCheck, CalendarDays, Wallet 
} from "lucide-react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-[#004d73] text-white p-5 flex flex-col gap-1 fixed h-full overflow-y-auto">
        
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 px-2 py-4 cursor-pointer">
          <div className="bg-[#00c2cb] p-2 rounded-xl flex items-center justify-center w-10 h-10 shadow-lg">
            <span className="font-bold text-xl text-white">s</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Salary<span className="text-[#00c2cb]">App</span>
          </h1>
        </Link>

        {/* Dashboard Link */}
        <Link href="/dashboard" className="flex items-center gap-4 w-full p-3.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all mb-1">
          <LayoutDashboard size={22} className="text-[#00c2cb]" />
          <span className="text-[17px] font-medium">Dashboard</span>
        </Link>

        {/* Menu Master Dropdown */}
        <div className="flex flex-col">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full p-3.5 rounded-xl border-2 border-white/90 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Database size={22} />
              <span className="text-[17px] font-medium">Master</span>
            </div>
            <ChevronUp size={18} className={`transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Sub Menus - Menggunakan Link */}
          {isOpen && (
            <div className="flex flex-col mt-1">
              <SubMenuItem href="/master/divisi" icon={<Building2 size={18} />} label="Divisi" />
              <SubMenuItem href="/master/jabatan" icon={<Briefcase size={18} />} label="Jabatan" />
              <SubMenuItem href="/master/karyawan" icon={<Users size={18} />} label="Karyawan" />
              <SubMenuItem href="/master/user" icon={<UserSquare2 size={18} />} label="User" />
              <SubMenuItem href="/master/konfigurasi" icon={<Settings2 size={18} />} label="Konfigurasi" />
            </div>
          )}
        </div>

        {/* Menu Lainnya */}
        <div className="mt-2 flex flex-col gap-1">
          <MenuLink href="/presensi" icon={<CalendarCheck size={22} />} label="Presensi" />
          <MenuLink href="/cuti" icon={<CalendarDays size={22} />} label="Cuti" />
          <MenuLink href="/gaji" icon={<Wallet size={22} />} label="Gaji" />
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-[280px] p-8">
        {children}
      </main>
    </div>
  );
}

// Komponen Pembantu dengan Link
function SubMenuItem({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 p-3 pl-10 text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
      {icon}
      <span className="font-medium text-[15px]">{label}</span>
    </Link>
  );
}

function MenuLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 w-full p-3.5 rounded-xl cursor-pointer hover:bg-white/10 transition-all text-white/90">
      {icon}
      <span className="text-[17px] font-medium">{label}</span>
    </Link>
  );
}