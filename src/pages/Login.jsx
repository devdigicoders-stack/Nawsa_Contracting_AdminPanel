import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await login(email, password, rememberMe);
        navigate('/admin/dashboard');
      } catch (err) {
        setLoginError(err.message || 'Invalid email or password.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const inputClasses = "w-full bg-transparent border-b border-[#E5E7EB] py-3 text-[#020E20] placeholder-[#667085] font-light focus:outline-none focus:border-[var(--color-gold-primary)] transition-colors text-[15px] rounded-none disabled:opacity-50 pl-10";

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-warm-white">
      {/* Left Side */}
      <motion.div 
        className="w-full md:w-1/2 bg-primary-deep text-white p-12 md:p-24 flex flex-col justify-center relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-gold-primary)] opacity-5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-lg">
          <div className="mb-12">
            <img src="/logo.png" alt="NAWSA Logo" className="h-24 w-auto object-contain bg-white rounded p-3 mb-6" />
            <div className="text-[13px] font-heading uppercase tracking-[0.3em] text-[var(--color-gold-primary)]">
              Contracting Facilities Management
            </div>
          </div>
          <div className="w-12 h-[2px] bg-[var(--color-gold-primary)] mb-8" />
          <h2 className="text-3xl font-heading font-light leading-snug mb-6 text-white/90">
            Complete Facilities Management Solutions
          </h2>
          <p className="text-white/50 text-[15px] font-light leading-relaxed">
            Professional Soft & Hard FM services for commercial, residential and industrial facilities.
          </p>
        </div>
      </motion.div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <motion.div 
          className="w-full max-w-md bg-white p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-heading font-bold text-primary-deep mb-3">Admin Panel</h2>
            <p className="text-[#667085] text-[15px] font-light">Sign in to manage enquiries and settings.</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 text-[14px]">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="relative flex items-center">
                <FiMail className="absolute left-0 text-[#667085] text-lg" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className={inputClasses}
                />
              </div>
              {errors.email && <span className="text-red-500 text-[12px] mt-1 block">{errors.email}</span>}
            </div>

            <div>
              <div className="relative flex items-center">
                <FiLock className="absolute left-0 text-[#667085] text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className={inputClasses}
                />
                <button
                  type="button"
                  className="absolute right-0 text-[#667085] hover:text-[var(--color-gold-primary)] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-[12px] mt-1 block">{errors.password}</span>}
            </div>

            <div className="flex justify-between items-center text-[13px] pt-4">
              <label className="flex items-center gap-2 text-[#667085] cursor-pointer hover:text-primary-deep transition-colors">
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  disabled={isSubmitting} 
                  className="accent-primary-deep cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[#667085] hover:text-primary-deep transition-colors" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group relative inline-flex items-center justify-center bg-primary-deep text-white px-10 py-4 font-heading font-bold text-[12px] uppercase tracking-widest overflow-hidden w-full disabled:opacity-70 disabled:cursor-not-allowed mt-8"
            >
              <span className="absolute inset-0 w-full h-full bg-[var(--color-gold-primary)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 flex items-center gap-3 group-hover:text-primary-deep transition-colors duration-500">
                {isSubmitting ? 'Signing In...' : 'Secure Login'}
                {!isSubmitting && <span className="text-lg leading-none transform transition-transform duration-500 group-hover:translate-x-1">→</span>}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
