"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  CalendarDays, 
  Wallet, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  FileText,
  History,
  ClipboardList
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const SidebarUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const pathname = usePathname();

  // Otomatis buka dropdown jika sub-menu aktif & tutup sidebar mobile saat pindah route
  useEffect(() => {
    if (pathname.includes('/users/presensi')) setOpenMenus(prev => ({ ...prev, "Presensi": true }));
    if (pathname.includes('/users/cuti')) setOpenMenus(prev => ({ ...prev, "Cuti": true }));
    if (pathname.includes('/users/gaji')) setOpenMenus(prev => ({ ...prev, "Gaji": true }));
    setIsOpen(false); // Tutup sidebar di mobile jika route berubah
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/sign-in");
  };

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const NavItem = ({ icon: Icon, label, href, children = null }: any) => {
    const isExpanded = openMenus[label];
    const isActive = pathname === href || (children && pathname.includes(href));

    return (
      <div className="space-y-1">
        {children ? (
          <button 
            onClick={() => toggleMenu(label)}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200 ${
              isActive ? "text-[#004d7a] bg-blue-50/50" : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className={isActive ? "text-[#004d7a]" : "text-zinc-500"} />
              <span className="font-semibold text-sm">{label}</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"} text-zinc-400`} 
            />
          </button>
        ) : (
          <Link 
            href={href}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
              pathname === href 
              ? "bg-[#004d7a] text-white shadow-lg shadow-blue-900/20" 
              : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            <Icon size={20} className={pathname === href ? "text-white" : "text-zinc-500"} />
            <span className="font-semibold text-sm">{label}</span>
          </Link>
        )}

        {children && (
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-60 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}>
            <div className="pl-6 flex flex-col items-start space-y-1 pb-2">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* --- MOBILE TOP BAR (Hanya muncul di HP/Tablet) --- */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b px-6 py-4 sticky top-0 z-[60] w-full">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">N</div>
          <span className="font-bold text-zinc-900 tracking-tight">NUSAPAY</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- BACKDROP MOBILE --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[70] lg:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* --- SIDEBAR ASIDE --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-white border-r border-zinc-100 flex flex-col transition-all duration-300 ease-in-out
        lg:translate-x-0 lg:sticky lg:h-screen lg:top-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-8 py-10 shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 shrink-0 font-bold italic text-xl">
            N
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xl font-black text-zinc-900 tracking-tighter leading-none uppercase">NUSAPAY</h1>
            <p className="text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase mt-1 truncate">Payroll System</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4 overflow-y-auto">
          <div className="mb-10">
            <p className="px-4 mb-5 text-[11px] font-extrabold text-zinc-400 uppercase tracking-[0.2em]">Main Menu</p>
            
            <nav className="space-y-1.5">
              <NavItem icon={LayoutDashboard} label="Dashboard" href="/users/dashboard" />
              
              <NavItem icon={CalendarCheck} label="Presensi" href="/users/presensi">
                <Link 
                  href="/users/presensi/kehadiran" 
                  className={`flex items-center gap-3 text-sm font-medium py-2 px-4 w-full rounded-xl transition-colors ${
                    pathname === '/users/presensi/kehadiran' ? 'text-blue-600 bg-blue-50/50' : 'text-zinc-500 hover:text-blue-600 hover:bg-zinc-50'
                  }`}
                >
                  <ClipboardList size={16} />
                  Kehadiran
                </Link>
              </NavItem>

              <NavItem icon={CalendarDays} label="Cuti" href="/users/cuti">
                <Link 
                  href="/users/cuti/form" 
                  className={`flex items-center gap-3 text-sm font-medium py-2 px-4 w-full rounded-xl transition-colors ${
                    pathname === '/users/cuti/form' ? 'text-blue-600 bg-blue-50/50' : 'text-zinc-500 hover:text-blue-600 hover:bg-zinc-50'
                  }`}
                >
                  <FileText size={16} />
                  Form Pengajuan
                </Link>
                <Link 
                  href="/users/cuti/riwayat" 
                  className={`flex items-center gap-3 text-sm font-medium py-2 px-4 w-full rounded-xl transition-colors ${
                    pathname === '/users/cuti/riwayat' ? 'text-blue-600 bg-blue-50/50' : 'text-zinc-500 hover:text-blue-600 hover:bg-zinc-50'
                  }`}
                >
                  <History size={16} />
                  Riwayat & Saldo
                </Link>
              </NavItem>

              <NavItem icon={Wallet} label="Gaji" href="/users/gaji">
                <Link 
                  href="/users/gaji/slip" 
                  className={`flex items-center gap-3 text-sm font-medium py-2 px-4 w-full rounded-xl transition-colors ${
                    pathname === '/users/gaji/slip' ? 'text-blue-600 bg-blue-50/50' : 'text-zinc-500 hover:text-blue-600 hover:bg-zinc-50'
                  }`}
                >
                  <FileText size={16} />
                  Slip Gaji
                </Link>
              </NavItem>
            </nav>
          </div>
        </div>

        {/* Footer / Logout Section */}
        <div className="p-6 shrink-0 mt-auto border-t border-zinc-50">
          <div className="bg-zinc-50 rounded-3xl p-2">
            <button 
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-4 text-red-500 hover:bg-white hover:shadow-sm transition-all font-bold text-sm border border-transparent hover:border-red-100"
            >
              <LogOut size={18} />
              <span>Keluar Aplikasi</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarUser;