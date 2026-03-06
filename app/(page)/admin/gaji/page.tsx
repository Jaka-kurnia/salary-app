import SidebarLayout from "@/components/Layouts/sidebar";
import NavbarLayout from "@/components/Layouts/navbar";
import React from "react";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <div>
      <SidebarLayout>
        <NavbarLayout />
      </SidebarLayout>
    </div>
  );
};

export default page;
