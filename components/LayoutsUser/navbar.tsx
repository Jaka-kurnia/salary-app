"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search } from 'lucide-react';

const NavbarUser = () => {
  const pathname = usePathname();
  // 1. Tambahkan state untuk menangani mounting
  const [mounted, setMounted] = useState(false);

  // 2. Set mounted ke true setelah render pertama
  useEffect(() => {
    setMounted(true);
  }, []);

  const getPageTitle = () => {
    if (pathname === '/users/dashboard') return 'Dashboard Overview';
    if (pathname.includes('/users/presensi/kehadiran')) return 'Riwayat Kehadiran';
    if (pathname.includes('/users/presensi')) return 'Presensi';
    if (pathname.includes('/users/cuti/form')) return 'Pengajuan Cuti';
    if (pathname.includes('/users/cuti/riwayat')) return 'Saldo & Riwayat Cuti';
    if (pathname.includes('/users/gaji/slip')) return 'Slip Gaji Bulanan';
    return 'Dashboard';
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="hidden lg:block text-xl font-bold text-[#004d7a] tracking-tight">
          {/* 3. Hanya tampilkan judul jika sudah mounted di client */}
          {mounted ? getPageTitle() : "Loading..."}
        </h1>
        
        <div className="hidden md:flex items-center gap-2 bg-zinc-50 border border-zinc-100 px-3 py-1.5 rounded-xl text-zinc-400">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Cari fitur..." 
            className="bg-transparent text-xs outline-none text-zinc-600 w-40"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="relative p-2 text-zinc-400 hover:text-[#004d7a] rounded-xl">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-zinc-100 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-zinc-900 leading-none">User Panel</p>
            <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
              User
            </p>
          </div>
          <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-[#004d7a] text-white font-bold text-lg">
            U
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;