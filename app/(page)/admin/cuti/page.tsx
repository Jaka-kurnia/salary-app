import SidebarLayout from "@/components/Layouts/sidebar";
import NavbarLayout from "@/components/Layouts/navbar";
import React from "react";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <SidebarLayout>
      <NavbarLayout />
    </SidebarLayout>
  );
};

export default page;
