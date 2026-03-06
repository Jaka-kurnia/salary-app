import NavbarUser from "@/components/LayoutsUser/navbar";
import SidebarUser from "@/components/LayoutsUser/sidebar";
import React from "react";

const page = () => {
  return (
    // Membungkus seluruh halaman dengan Sidebar
    <div className="flex min-h-screen bg-zinc-50">
      <SidebarUser />
      
      <div className="flex-1 flex flex-col">
        <NavbarUser />
        <main className="p-6">
          {/* Konten halaman kamu di sini */}
          <h1 className="text-xl">Selamat Datang di Presensi</h1>
        </main>
      </div>
    </div>
  );
};

export default page;