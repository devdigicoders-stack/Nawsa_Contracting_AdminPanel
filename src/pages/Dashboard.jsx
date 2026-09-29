import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiMail, FiInbox, FiPhoneForwarded, FiCheckCircle, FiArrowRight, FiEye, FiMessageSquare } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { mockStats, mockActivity } from '../data/mockDashboardData';
import { dashboardService } from '../services/dashboardService';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import EnquiryStatusBadge from '../components/enquiries/EnquiryStatusBadge';

const iconMap = {
  FiMail: <FiMail className="text-[var(--color-gold-primary)]" />,
  FiInbox: <FiInbox className="text-[var(--color-gold-primary)]" />,
  FiPhoneForwarded: <FiPhoneForwarded className="text-[var(--color-gold-primary)]" />,
  FiCheckCircle: <FiCheckCircle className="text-[var(--color-gold-primary)]" />
};

const StatCard = ({ title, value, text, link, icon }) => (
  <div className="bg-white p-6 border border-[#E5E7EB] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 bg-warm-white flex items-center justify-center text-2xl mb-4 rounded-full">
      {iconMap[icon]}
    </div>
    <div className="text-[13px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-1">{title}</div>
    <div className="text-4xl font-heading font-bold text-primary-deep mb-4">{value}</div>
    <div className="pt-4 border-t border-[#E5E7EB]">
      <Link to={link} className="text-[13px] font-medium text-[var(--color-gold-primary)] hover:text-primary-deep transition-colors flex items-center gap-1">
        {text} <FiArrowRight />
      </Link>
    </div>
  </div>
);

const ActivityList = ({ activities }) => {
  const getActivityIcon = (text) => {
    if (text.toLowerCase().includes('enquiry')) return <FiMessageSquare />;
    return <FiCheckCircle />;
  };

  return (
    <div className="bg-white border border-[#E5E7EB] p-6 h-full">
      <h3 className="text-lg font-heading font-bold text-primary-deep mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {activities && activities.length > 0 ? activities.map(activity => (
          <div className="flex gap-4" key={activity.id}>
            <div className="w-10 h-10 shrink-0 bg-warm-white text-[var(--color-gold-primary)] rounded-full flex items-center justify-center">
              {getActivityIcon(activity.text)}
            </div>
            <div>
              <div className="text-[14px] text-primary-deep font-medium mb-1">{activity.text}</div>
              <div className="text-[12px] text-[#667085]">{activity.time}</div>
            </div>
          </div>
        )) : (
          <div className="text-[13px] text-[#667085] italic">No recent activity.</div>
        )}
      </div>
    </div>
  );
};

const mapEnquiriesToActivities = (enquiries) => {
  if (!enquiries) return [];
  return enquiries.slice(0, 3).map(enquiry => ({
    id: enquiry._id,
    text: `New enquiry received from ${enquiry.fullName}`,
    time: new Date(enquiry.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
  }));
};

const RecentEnquiries = ({ enquiries }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-[#E5E7EB]">
      <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
        <h3 className="text-lg font-heading font-bold text-primary-deep">Recent Enquiries</h3>
        <Link to="/admin/enquiries" className="text-[13px] font-medium text-[var(--color-gold-primary)] hover:text-primary-deep transition-colors flex items-center gap-1">
          View All <FiArrowRight />
        </Link>
      </div>

      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-warm-white text-[11px] font-heading font-bold text-[#667085] uppercase tracking-wider">
              <th className="p-4 py-3 font-medium">Name</th>
              <th className="p-4 py-3 font-medium">Service</th>
              <th className="p-4 py-3 font-medium">Received</th>
              <th className="p-4 py-3 font-medium">Status</th>
              <th className="p-4 py-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {enquiries.map(enquiry => (
              <tr key={enquiry.id} className="hover:bg-warm-white/50 transition-colors">
                <td className="p-4 text-[14px] font-bold text-primary-deep">{enquiry.fullName}</td>
                <td className="p-4 text-[14px] text-[#667085]">{enquiry.serviceRequired}</td>
                <td className="p-4 text-[13px] text-[#667085]">{enquiry.received || new Date(enquiry.createdAt).toLocaleDateString()}</td>
                <td className="p-4"><EnquiryStatusBadge status={enquiry.status} /></td>
                <td className="p-4 text-center">
                  <button 
                    className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-warm-white text-primary-deep hover:bg-[var(--color-gold-primary)] hover:text-white transition-colors"
                    onClick={() => navigate(`/admin/enquiries/${enquiry._id || enquiry.id}`)}
                    aria-label={`View enquiry from ${enquiry.fullName}`}
                  >
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-[#E5E7EB]">
        {enquiries.map(enquiry => (
          <div className="p-4 space-y-3" key={enquiry.id}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary-deep">{enquiry.fullName}</span>
              <EnquiryStatusBadge status={enquiry.status} />
            </div>
            <div className="text-[14px] text-[#667085]">{enquiry.serviceRequired}</div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[12px] text-[#667085]">{enquiry.received || new Date(enquiry.createdAt).toLocaleDateString()}</span>
              <button 
                className="text-[var(--color-gold-primary)] hover:text-primary-deep transition-colors p-2 bg-warm-white rounded-full"
                onClick={() => navigate(`/admin/enquiries/${enquiry._id || enquiry.id}`)}
                aria-label={`View enquiry from ${enquiry.fullName}`}
              >
                <FiEye />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { admin } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (loading) return <LoadingSpinner message="Loading dashboard data..." />;
  if (error) return <ErrorState title="Dashboard Error" message={error} onRetry={fetchDashboardData} />;

  return (
    <motion.div className="max-w-7xl mx-auto space-y-8" variants={containerVariants} initial="hidden" animate="show">
      <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-4" variants={itemVariants}>
        <div>
          <div className="text-[11px] font-heading font-bold text-[var(--color-gold-primary)] uppercase tracking-widest mb-2">Overview</div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-deep mb-2">Welcome Back, {admin?.name ? admin.name.split(' ')[0] : 'Admin'}</h1>
          <p className="text-[#667085] text-[15px]">Manage website enquiries and client communication from one place.</p>
        </div>
        <div>
          <a 
            href={import.meta.env.VITE_PUBLIC_WEBSITE_URL || "http://localhost:5173/"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-deep text-white font-heading text-[13px] font-bold uppercase tracking-widest hover:bg-[var(--color-gold-primary)] hover:text-primary-deep transition-colors"
          >
            View Website <FiExternalLink />
          </a>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={itemVariants}>
        {mockStats.map((stat, i) => {
          let value = stat.value;
          let dynamicLink = stat.link;
          if (stats) {
            if (i === 0) { value = stats.totalEnquiries; dynamicLink = '/admin/enquiries'; }
            if (i === 1) { value = stats.newEnquiries; dynamicLink = '/admin/enquiries?status=New'; }
            if (i === 2) { value = stats.contactedEnquiries; dynamicLink = '/admin/enquiries?status=Contacted'; }
            if (i === 3) { value = stats.closedEnquiries; dynamicLink = '/admin/enquiries?status=Closed'; }
          }
          return <StatCard key={stat.id} {...stat} link={dynamicLink} value={value} />;
        })}
      </motion.div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={itemVariants}>
        <div className="lg:col-span-2">
          <RecentEnquiries enquiries={stats?.recentEnquiries || []} />
        </div>
        
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-heading font-bold text-primary-deep mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/admin/enquiries" 
                className="flex items-center gap-3 p-4 bg-warm-white text-primary-deep font-bold hover:bg-primary-deep hover:text-white transition-colors"
              >
                View All Enquiries
              </Link>
              <a 
                href={import.meta.env.VITE_PUBLIC_WEBSITE_URL || "http://localhost:5173/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-4 bg-warm-white text-primary-deep font-bold hover:bg-primary-deep hover:text-white transition-colors"
              >
                <span className="flex items-center gap-3">View Public Website</span>
                <FiExternalLink />
              </a>
            </div>
          </div>
          
          <ActivityList activities={stats?.recentEnquiries ? mapEnquiriesToActivities(stats.recentEnquiries) : []} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
