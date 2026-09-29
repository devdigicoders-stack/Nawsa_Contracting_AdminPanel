import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiBell, FiChevronDown, FiUser, FiLogOut, FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const AdminHeader = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setDropdownOpen(false);
  };

  // Determine dynamic page title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Overview';
    if (path.includes('enquiries')) return 'Enquiries';
    if (path.includes('settings')) return 'Profile Settings';
    return 'Admin Dashboard';
  };

  return (
    <header className="bg-white h-[80px] border-b border-[#E5E7EB] flex items-center justify-between px-6 lg:px-10 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden text-[#667085] hover:text-primary-deep p-2 transition-colors" 
          onClick={toggleSidebar} 
          aria-label="Open sidebar"
        >
          <FiMenu className="text-2xl" />
        </button>
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary-deep">{getPageTitle()}</h2>
          <p className="text-[#667085] text-[13px] hidden sm:block">Manage your operations efficiently</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            className="relative text-[#667085] hover:text-[var(--color-gold-primary)] transition-colors p-2" 
            aria-label="Notifications"
            onClick={toggleNotifications}
          >
            <FiBell className="text-xl" />
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div 
                className="absolute right-0 mt-4 w-72 bg-white border border-[#E5E7EB] shadow-lg py-2 z-50 rounded-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-3 border-b border-[#E5E7EB]">
                  <span className="block text-[14px] font-bold text-primary-deep uppercase tracking-wider">Notifications</span>
                </div>
                <div className="p-4 text-center">
                  <p className="text-[13px] text-[#667085] mb-4">Check for newly received client enquiries.</p>
                  <button 
                    className="w-full bg-primary-deep text-[var(--color-gold-primary)] py-2 text-[12px] font-bold uppercase tracking-wider hover:bg-[var(--color-gold-primary)] hover:text-primary-deep transition-colors"
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate('/admin/enquiries?status=New');
                    }}
                  >
                    View New Enquiries
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button 
            className="flex items-center gap-3 p-2 rounded-none hover:bg-warm-white transition-colors border border-transparent hover:border-[#E5E7EB]" 
            onClick={toggleDropdown} 
            aria-expanded={dropdownOpen}
          >
            <div className="w-10 h-10 bg-primary-deep text-[var(--color-gold-primary)] flex items-center justify-center font-heading font-bold text-lg overflow-hidden shrink-0">
              {admin?.profileImage ? (
                <img src={admin.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'
              )}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-[14px] font-bold text-primary-deep leading-tight">{admin?.name || 'Admin'}</span>
              <span className="text-[12px] text-[#667085] capitalize">{admin?.role || 'Administrator'}</span>
            </div>
            <FiChevronDown className="text-[#667085] hidden md:block" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div 
                className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E7EB] shadow-lg py-2 z-50 rounded-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-3 border-b border-[#E5E7EB] md:hidden">
                  <span className="block text-[14px] font-bold text-primary-deep">{admin?.name || 'Admin'}</span>
                  <span className="block text-[12px] text-[#667085] capitalize">{admin?.role || 'Administrator'}</span>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#17212B] hover:bg-warm-white hover:text-primary-deep transition-colors" onClick={() => { setDropdownOpen(false); navigate('/admin/settings'); }}>
                  <FiUser className="text-[#667085]" /> Profile Settings
                </button>
                <a 
                  href={import.meta.env.VITE_PUBLIC_WEBSITE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#17212B] hover:bg-warm-white hover:text-primary-deep transition-colors" 
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiExternalLink className="text-[#667085]" /> View Public Website
                </a>
                <div className="h-px bg-[#E5E7EB] my-1" />
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-red-600 hover:bg-red-50 transition-colors" 
                  onClick={handleLogout}
                >
                  <FiLogOut /> Secure Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
