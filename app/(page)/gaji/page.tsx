import { Sidebar } from "lucide-react";
import React from "react";
import SidebarLayout from "../../components/Layouts/sidebar";
import NavbarLayout from "../../components/Layouts/navbar";

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
