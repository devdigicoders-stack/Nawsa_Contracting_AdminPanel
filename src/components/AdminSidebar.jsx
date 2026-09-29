import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  MdDashboard, 
  MdEmail
} from 'react-icons/md';
import { FiExternalLink, FiLogOut, FiX, FiUser } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const AdminSidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <MdDashboard className="text-xl" /> },
    { path: '/admin/enquiries', name: 'Enquiries', icon: <MdEmail className="text-xl" /> },
    { path: '/admin/settings', name: 'Settings', icon: <FiUser className="text-xl" /> },
  ];

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-[280px] bg-primary-deep text-white flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex items-center justify-between p-8 border-b border-white/10">
        <div className="flex items-center justify-center w-full">
          <img src="/logo.png" alt="NAWSA Logo" className="h-20 w-auto object-contain bg-white rounded p-2" />
        </div>
        <button className="lg:hidden text-white/70 hover:text-white p-2" onClick={closeSidebar} aria-label="Close sidebar">
          <FiX className="text-2xl" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            onClick={closeSidebar}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-none font-medium text-[15px] transition-all duration-300 group
              ${isActive ? 'bg-white/10 text-[var(--color-gold-primary)] border-l-2 border-[var(--color-gold-primary)]' : 'text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}
            `}
          >
            <span className="group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <a 
          href={import.meta.env.VITE_PUBLIC_WEBSITE_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-4 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors font-medium text-[15px]"
        >
          <FiExternalLink className="text-xl" />
          View Website
        </a>
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors font-medium text-[15px]"
        >
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
