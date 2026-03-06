"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

const NavbarUser = () => {
  const pathname = usePathname();

  // Fungsi untuk menentukan judul berdasarkan route aktif
  const getPageTitle = () => {
    if (pathname === '/users/dashboard') return 'Dashboard';
    if (pathname.includes('/users/presensi')) return 'Presensi';
    if (pathname.includes('/users/cuti')) return 'Cuti';
    if (pathname.includes('/users/gaji')) return 'Gaji';
    return 'Dashboard';
  };

  return (
    <nav className="w-full bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* BAGIAN KIRI: JUDUL DINAMIS */}
      <div>
        <h1 className="text-2xl font-bold text-[#004d7a] tracking-tight transition-all duration-300">
          {getPageTitle()}
        </h1>
      </div>

      {/* BAGIAN KANAN: PROFILE INFO */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-zinc-900 leading-none">
            Administrator
          </p>
          <p className="text-[11px] font-medium text-zinc-400 mt-1 uppercase tracking-wider">
            Payroll Management
          </p>
        </div>
        
        {/* AVATAR BOX */}
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-[#004d7a] font-bold text-lg shadow-sm">
          A
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;