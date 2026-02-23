import { Search, Bell, UserCircle } from "lucide-react";

export default function NavbarLayout() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-slate-100 px-4 py-2 rounded-lg w-96">
        <Search size={18} className="text-slate-400" />
        <input type="text" placeholder="Cari data..." className="bg-transparent border-none outline-none ml-3 text-sm w-full" />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-500"><Bell size={24} /></button>
        <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">Admin User</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
          <div className="bg-[#004d73] p-2 rounded-full text-white"><UserCircle size={24} /></div>
        </div>
      </div>
    </header>
  );
}