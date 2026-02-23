import React from 'react'
import SidebarLayout from '../components/Layouts/sidebar'

const page = () => {
  return (
    <SidebarLayout>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500">Selamat datang di panel admin SalaryApp.</p>
      </div>
    </SidebarLayout>
  )
}

export default page