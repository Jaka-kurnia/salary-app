import SidebarLayout from "@/components/Layouts/sidebar";
import NavbarLayout from "@/components/Layouts/navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <SidebarLayout>
        <NavbarLayout />
        <div className="flex min-h-screen ">
          <div className="pt-6 px-6 w-full">
            <h1 className="text-2xl font-bold text-slate-800">Management Divisi</h1>
            <p className="text-sm text-slate-400">Configure and manage company departments</p>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default page;
