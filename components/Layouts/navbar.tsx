"use client";

import { Search, Bell, UserCircle, Menu } from "lucide-react";

export default function NavbarLayout() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 w-full">
      
      {/* KIRI: Logo/Brand khusus Mobile (Muncul hanya di md:hidden) */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="bg-[#00c2cb] p-1.5 rounded-lg flex items-center justify-center">
          <span className="font-bold text-white text-sm">s</span>
        </div>
        <span className="font-bold text-[#004d73] text-lg tracking-tight">SalaryApp</span>
      </div>

      {/* TENGAH: Search Bar (Responsive: Sembunyi di HP sangat kecil, atau mengecil) */}
      <div className="hidden sm:flex items-center bg-slate-100 px-4 py-2 rounded-xl w-full max-w-[150px] md:max-w-96 transition-all focus-within:max-w-md border border-transparent focus-within:border-slate-300 focus-within:bg-white">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Cari data..." 
          className="bg-transparent border-none outline-none ml-3 text-sm w-full text-slate-700 placeholder:text-slate-400" 
        />
      </div>

      {/* KANAN: User Profile & Notif */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Tombol Search Mobile (Hanya muncul jika layar kecil) */}
        <button className="sm:hidden p-2 text-slate-500">
          <Search size={22} />
        </button>

        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l pl-4 md:pl-6 border-slate-200">
          <div className="text-right hidden xs:block">
            <p className="text-sm font-bold text-slate-800 leading-none">Admin User</p>
            <p className="text-[10px] md:text-xs text-slate-500 mt-1 uppercase font-medium tracking-wider">Super Admin</p>
          </div>
          <div className="bg-[#004d73] p-2 rounded-full text-white shadow-md shadow-blue-900/20 cursor-pointer hover:scale-105 transition-transform">
            <UserCircle size={22} />
          </div>
        </div>
      </div>
    </header>
  );
}