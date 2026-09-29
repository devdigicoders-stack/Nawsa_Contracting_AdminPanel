import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMail, FiPhone, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { enquiryService } from '../../services/enquiryService';
import EnquiryStatusBadge from '../../components/enquiries/EnquiryStatusBadge';
import DeleteEnquiryModal from '../../components/enquiries/DeleteEnquiryModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

const EnquiryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [status, setStatus] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await enquiryService.getEnquiryById(id);
      setEnquiry(data);
      setStatus(data.status);
    } catch (err) {
      setError(err.message || 'Failed to load enquiry details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiry();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      await enquiryService.updateEnquiryStatus(id, status);
      setEnquiry(prev => ({ ...prev, status }));
      toast.success('Enquiry status updated successfully.');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleQuickAction = async (newStatus) => {
    try {
      await enquiryService.updateEnquiryStatus(id, newStatus);
      setStatus(newStatus);
      setEnquiry(prev => ({ ...prev, status: newStatus }));
      toast.success(`Enquiry marked as ${newStatus}.`);
    } catch (err) {
      toast.error(`Failed to mark as ${newStatus}`);
    }
  };

  const confirmDelete = async () => {
    try {
      await enquiryService.deleteEnquiry(id);
      setDeleteModalOpen(false);
      toast.success('Enquiry deleted successfully.');
      setTimeout(() => {
        navigate('/admin/enquiries');
      }, 1500);
    } catch (err) {
      toast.error('Failed to delete enquiry');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading enquiry details..." />;
  }

  if (error || !enquiry) {
    return <ErrorState title="Error Loading Enquiry" message={error || "Enquiry not found"} onRetry={fetchEnquiry} />;
  }

  const dateStr = new Date(enquiry.createdAt).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div>
        <Link to="/admin/enquiries" className="inline-flex items-center gap-2 text-primary-deep font-bold text-[13px] uppercase tracking-wider hover:text-[var(--color-gold-primary)] transition-colors mb-4">
          <FiArrowLeft /> Back to Enquiries
        </Link>
        <div className="text-[11px] font-heading font-bold text-[var(--color-gold-primary)] uppercase tracking-widest mb-2">Enquiry Details</div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-deep">Enquiry from {enquiry.fullName}</h1>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#667085]">Received: {dateStr}</span>
            <EnquiryStatusBadge status={enquiry.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-[#E5E7EB] p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-heading font-bold text-primary-deep mb-6">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Full Name</div>
                <div className="text-[15px] text-primary-deep font-medium">{enquiry.fullName}</div>
              </div>
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Email Address</div>
                <div className="text-[15px] text-primary-deep font-medium break-all">{enquiry.email}</div>
              </div>
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Phone Number</div>
                <div className="text-[15px] text-primary-deep font-medium">{enquiry.phone || 'Not provided'}</div>
              </div>
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Company / Organization</div>
                <div className="text-[15px] text-primary-deep font-medium">{enquiry.companyName || 'Not provided'}</div>
              </div>
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Location</div>
                <div className="text-[15px] text-primary-deep font-medium">{enquiry.location || 'Not provided'}</div>
              </div>
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Preferred Contact Method</div>
                <div className="text-[15px] text-primary-deep font-medium">{enquiry.preferredContactMethod || 'Not specified'}</div>
              </div>
            </div>

            <div className="h-px bg-[#E5E7EB] w-full mb-8" />

            <h3 className="text-xl font-heading font-bold text-primary-deep mb-6">Enquiry Details</h3>
            
            <div className="grid grid-cols-1 gap-y-6 mb-8">
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Service Interested In</div>
                <div className="text-[15px] text-[var(--color-gold-primary)] font-bold">{enquiry.serviceRequired}</div>
              </div>
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Facility Type</div>
                <div className="text-[16px] text-primary-deep font-bold">{enquiry.facilityType}</div>
              </div>
              <div>
                <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Message</div>
                <div className="bg-warm-white p-5 border border-[#E5E7EB] text-[15px] text-[#17212B] leading-relaxed whitespace-pre-wrap font-medium">
                  {enquiry.message}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-[#E5E7EB] p-6 shadow-sm">
            <h3 className="text-lg font-heading font-bold text-primary-deep mb-4 pb-4 border-b border-[#E5E7EB]">Contact Actions</h3>
            
            <div className="space-y-3">
              <a 
                href={`mailto:${enquiry.email}`} 
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#E5E7EB] text-primary-deep font-bold text-[13px] uppercase tracking-wider hover:bg-warm-white transition-colors"
              >
                <FiMail className="text-lg" /> Email Client
              </a>
              
              {enquiry.phone ? (
                <a 
                  href={`tel:${enquiry.phone}`} 
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#E5E7EB] text-primary-deep font-bold text-[13px] uppercase tracking-wider hover:bg-warm-white transition-colors"
                >
                  <FiPhone className="text-lg" /> Call Client
                </a>
              ) : (
                <button 
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#E5E7EB] text-[#667085] font-bold text-[13px] uppercase tracking-wider opacity-50 cursor-not-allowed"
                  disabled
                >
                  <FiPhone className="text-lg" /> No phone number
                </button>
              )}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] p-6 shadow-sm">
            <h3 className="text-lg font-heading font-bold text-primary-deep mb-4 pb-4 border-b border-[#E5E7EB]">Enquiry Status</h3>
            
            <select 
              className="w-full py-3 px-4 bg-warm-white border border-[#E5E7EB] text-primary-deep font-medium mb-4 focus:outline-none focus:border-primary-deep transition-colors cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Change enquiry status"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
            
            <button 
              className="w-full py-3 px-4 bg-primary-deep text-[var(--color-gold-primary)] font-bold text-[13px] uppercase tracking-wider hover:bg-[var(--color-gold-primary)] hover:text-primary-deep transition-colors"
              onClick={handleUpdateStatus}
            >
              Update Status
            </button>

            {/* Quick Actions based on current status */}
            <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-3">
              {enquiry.status === 'New' && (
                <button 
                  className="w-full py-2 px-4 border border-blue-200 bg-blue-50 text-blue-700 font-bold text-[12px] uppercase tracking-wider hover:bg-blue-100 transition-colors"
                  onClick={() => handleQuickAction('Contacted')}
                >
                  Mark as Contacted
                </button>
              )}
              
              {enquiry.status === 'Contacted' && (
                <button 
                  className="w-full py-2 px-4 border border-gray-200 bg-gray-50 text-gray-700 font-bold text-[12px] uppercase tracking-wider hover:bg-gray-100 transition-colors"
                  onClick={() => handleQuickAction('Closed')}
                >
                  Close Enquiry
                </button>
              )}
            </div>
          </div>

          <button 
            className="w-full py-4 px-4 bg-red-50 text-red-600 font-bold text-[13px] uppercase tracking-wider border border-red-100 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2"
            onClick={() => setDeleteModalOpen(true)}
          >
            <FiTrash2 /> Delete Enquiry
          </button>
        </div>
      </div>

      <DeleteEnquiryModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        enquiryName={enquiry.fullName}
      />
    </motion.div>
  );
};

export default EnquiryDetails;
