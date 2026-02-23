import SidebarLayout from '@/components/Layouts/sidebar'
import NavbarLayout from '@/components/Layouts/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <SidebarLayout>
         <NavbarLayout />
         <div className="flex min-h-screen ">
            <div className="pt-6 px-6 w-full">
                <h1 className="text-2xl font-bold text-slate-800">Jabatan</h1>
            </div>
         </div>
      </SidebarLayout>
    </div>
   
  )
}

export default page
