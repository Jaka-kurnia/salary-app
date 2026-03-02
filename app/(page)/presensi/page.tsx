import React from "react";
import NavbarLayout from "@/components/Layouts/navbar";
import SidebarLayout from "@/components/Layouts/sidebar";

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
