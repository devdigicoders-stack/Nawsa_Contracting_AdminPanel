import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiLock, FiUser, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { admin, updateAdmin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    profileImage: admin?.profileImage || '',
    currentPassword: '',
    password: '',
    confirmPassword: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        name: formData.name,
      };
      
      if (formData.profileImage !== admin?.profileImage) {
        updateData.profileImage = formData.profileImage;
      }
      
      if (formData.password) {
        if (!formData.currentPassword) {
          toast.error('Please enter your current password');
          setLoading(false);
          return;
        }
        updateData.currentPassword = formData.currentPassword;
        updateData.password = formData.password;
      }
      
      await updateAdmin(updateData);
      toast.success('Profile updated successfully');
      setFormData({ ...formData, currentPassword: '', password: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-warm-white border border-[#E5E7EB] px-4 py-3 text-primary-deep placeholder-[#667085] focus:outline-none focus:border-[var(--color-gold-primary)] transition-colors rounded-none";

  return (
    <motion.div 
      className="max-w-3xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <div className="text-[11px] font-heading font-bold text-[var(--color-gold-primary)] uppercase tracking-widest mb-2">Account</div>
        <h1 className="text-3xl font-heading font-bold text-primary-deep mb-2">Profile Settings</h1>
        <p className="text-[#667085] text-[15px]">Update your personal information and security settings.</p>
      </div>

      <div className="bg-white border border-[#E5E7EB] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6 border-b border-[#E5E7EB] pb-8">
            <h2 className="text-xl font-heading font-bold text-primary-deep flex items-center gap-2">
              <FiUser className="text-[var(--color-gold-primary)]" /> Personal Information
            </h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-warm-white flex items-center justify-center overflow-hidden border border-[#E5E7EB]">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-3xl text-[var(--color-gold-primary)] font-heading font-bold">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <label className="cursor-pointer bg-primary-deep text-white px-6 py-2.5 font-heading font-bold text-[12px] uppercase tracking-widest hover:bg-[var(--color-gold-primary)] hover:text-primary-deep transition-colors inline-block">
                  Change Photo
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <p className="text-[12px] text-[#667085] mt-2">Recommended size: 256x256px. Max size: 5MB.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-primary-deep mb-2 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className={inputClasses}
                  required
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-primary-deep mb-2 uppercase tracking-wide flex items-center gap-2">
                   Email Address (Read Only)
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  className={`${inputClasses} opacity-60 cursor-not-allowed`}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h2 className="text-xl font-heading font-bold text-primary-deep flex items-center gap-2">
              <FiLock className="text-[var(--color-gold-primary)]" /> Security
            </h2>
            <p className="text-[13px] text-[#667085]">Leave blank if you don't want to change your password.</p>
            
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-primary-deep mb-2 uppercase tracking-wide">Current Password</label>
              <input 
                type="password" 
                name="currentPassword" 
                value={formData.currentPassword} 
                onChange={handleChange} 
                className={inputClasses}
                placeholder="Enter current password (required for changes)"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-primary-deep mb-2 uppercase tracking-wide">New Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className={inputClasses}
                  placeholder="Enter new password"
                  minLength={6}
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-primary-deep mb-2 uppercase tracking-wide">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  className={inputClasses}
                  placeholder="Confirm new password"
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-primary-deep text-white px-8 py-3 font-heading font-bold text-[13px] uppercase tracking-widest hover:bg-[var(--color-gold-primary)] hover:text-primary-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Settings;
