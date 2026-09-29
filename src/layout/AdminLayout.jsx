import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-warm-white overflow-hidden text-[#17212B] font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-primary-deep/60 backdrop-blur-sm z-20 lg:hidden" 
          onClick={closeSidebar}
        ></div>
      )}

      <AdminSidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-warm-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
