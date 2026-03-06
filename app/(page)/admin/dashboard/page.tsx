import React from "react";
import NavbarLayout from "@/components/Layouts/navbar";
import SidebarLayout from "@/components/Layouts/sidebar";

const page = () => {
  return (
    <SidebarLayout>
      <NavbarLayout />
    </SidebarLayout>
  );
};

export default page;
