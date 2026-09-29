import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiEye, FiTrash2, FiMessageSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { servicesList } from '../../data/mockEnquiries';
import { enquiryService } from '../../services/enquiryService';
import { dashboardService } from '../../services/dashboardService';
import EnquiryStatusBadge from '../../components/enquiries/EnquiryStatusBadge';
import DeleteEnquiryModal from '../../components/enquiries/DeleteEnquiryModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

const EnquiryList = () => {
  const navigate = useNavigate();
  
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering & Search
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialStatus = searchParams.get('status') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [serviceFilter, setServiceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  // Modals state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [enquiriesRes, statsRes] = await Promise.all([
        enquiryService.getEnquiries({
          search: searchTerm,
          status: statusFilter,
          service: serviceFilter,
          sort: sortOrder,
          page: currentPage,
          limit: itemsPerPage
        }),
        dashboardService.getStats()
      ]);

      setEnquiries(enquiriesRes.data);
      setTotalPages(enquiriesRes.pages);
      setTotalItems(enquiriesRes.total);
      setStats(statsRes);
    } catch (err) {
      setError(err.message || 'Failed to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, statusFilter, serviceFilter, sortOrder, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setServiceFilter('');
    setSortOrder('newest');
    setCurrentPage(1);
  };

  // Delete Action
  const openDeleteModal = (enquiry) => {
    setEnquiryToDelete(enquiry);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!enquiryToDelete) return;
    try {
      await enquiryService.deleteEnquiry(enquiryToDelete._id);
      setDeleteModalOpen(false);
      setEnquiryToDelete(null);
      
      // Adjust pagination if needed
      if (enquiries.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchData();
      }
      
      toast.success('Enquiry deleted successfully.');
    } catch (err) {
      toast.error('Failed to delete enquiry');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading && !enquiries.length) {
    return <LoadingSpinner message="Loading enquiries..." />;
  }

  if (error) {
    return <ErrorState title="Error Loading Enquiries" message={error} onRetry={fetchData} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div>
        <div className="text-[11px] font-heading font-bold text-[var(--color-gold-primary)] uppercase tracking-widest mb-2">Customer Enquiries</div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-deep mb-2">Enquiry Management</h1>
        <p className="text-[#667085] text-[15px]">View and manage website enquiries submitted through the NCFM contact form.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 border border-[#E5E7EB]">
            <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Total Enquiries</div>
            <div className="text-3xl font-heading font-bold text-primary-deep">{stats.totalEnquiries}</div>
          </div>
          <div className="bg-white p-5 border border-[var(--color-gold-primary)] shadow-sm shadow-[var(--color-gold-primary)]/10">
            <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">New Enquiries</div>
            <div className="text-3xl font-heading font-bold text-[var(--color-gold-primary)]">{stats.newEnquiries}</div>
          </div>
          <div className="bg-white p-5 border border-[#E5E7EB]">
            <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Contacted</div>
            <div className="text-3xl font-heading font-bold text-blue-600">{stats.contactedEnquiries}</div>
          </div>
          <div className="bg-white p-5 border border-[#E5E7EB]">
            <div className="text-[12px] font-heading font-bold text-[#667085] uppercase tracking-wider mb-2">Closed</div>
            <div className="text-3xl font-heading font-bold text-[#667085]">{stats.closedEnquiries}</div>
          </div>
        </div>
      )}

      <div className="bg-white p-4 border border-[#E5E7EB] flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2.5 bg-warm-white border border-[#E5E7EB] focus:outline-none focus:border-primary-deep transition-colors text-[14px]" 
            placeholder="Search by name, email or company..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <select 
          className="w-full md:w-auto py-2.5 px-4 bg-warm-white border border-[#E5E7EB] focus:outline-none focus:border-primary-deep transition-colors text-[14px] text-primary-deep font-medium cursor-pointer"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>

        <select 
          className="w-full md:w-auto py-2.5 px-4 bg-warm-white border border-[#E5E7EB] focus:outline-none focus:border-primary-deep transition-colors text-[14px] text-primary-deep font-medium cursor-pointer"
          value={serviceFilter}
          onChange={(e) => {
            setServiceFilter(e.target.value);
            setCurrentPage(1);
          }}
          aria-label="Filter by service"
        >
          <option value="">All Services</option>
          {servicesList.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>

        <select 
          className="w-full md:w-auto py-2.5 px-4 bg-warm-white border border-[#E5E7EB] focus:outline-none focus:border-primary-deep transition-colors text-[14px] text-primary-deep font-medium cursor-pointer"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          aria-label="Sort by date"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <button 
          className="w-full md:w-auto py-2.5 px-6 border border-[#E5E7EB] text-[#667085] hover:bg-warm-white hover:text-primary-deep transition-colors font-bold text-[13px] uppercase tracking-wider" 
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>

      <div className="bg-white border border-[#E5E7EB]">
        {stats && stats.totalEnquiries === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-warm-white text-[var(--color-gold-primary)] rounded-full flex items-center justify-center text-3xl mb-4">
              <FiMessageSquare />
            </div>
            <h3 className="text-xl font-heading font-bold text-primary-deep mb-2">No enquiries yet.</h3>
            <p className="text-[#667085]">New enquiries submitted from the website will appear here.</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-warm-white text-[var(--color-gold-primary)] rounded-full flex items-center justify-center text-3xl mb-4">
              <FiSearch />
            </div>
            <h3 className="text-xl font-heading font-bold text-primary-deep mb-2">No enquiries found.</h3>
            <p className="text-[#667085] mb-6">Try changing your search or filters.</p>
            <button className="px-6 py-2 bg-warm-white text-primary-deep font-bold text-[13px] uppercase tracking-wider hover:bg-[#E5E7EB] transition-colors" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-warm-white text-[11px] font-heading font-bold text-[#667085] uppercase tracking-wider">
                    <th className="p-4 py-3 font-medium">Name</th>
                    <th className="p-4 py-3 font-medium">Company</th>
                    <th className="p-4 py-3 font-medium">Facility Type</th>
                    <th className="p-4 py-3 font-medium">Service</th>
                    <th className="p-4 py-3 font-medium">Received</th>
                    <th className="p-4 py-3 font-medium">Status</th>
                    <th className="p-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {enquiries.map(enquiry => (
                    <tr key={enquiry._id} className={`hover:bg-warm-white/50 transition-colors ${enquiry.status === 'New' ? 'bg-[#F0CD72]/5' : ''}`}>
                      <td className="p-4">
                        <div className="text-[14px] font-bold text-primary-deep flex items-center gap-2">
                          {enquiry.status === 'New' && <span className="w-2 h-2 bg-[var(--color-gold-primary)] rounded-full"></span>}
                          {enquiry.fullName}
                        </div>
                        <div className="text-[13px] text-[#667085]">{enquiry.email}</div>
                      </td>
                      <td className="p-4 text-[14px] text-[#667085]">{enquiry.companyName || '-'}</td>
                      <td className="p-4 text-[14px] text-[#667085]">{enquiry.facilityType}</td>
                      <td className="p-4 text-[14px] text-primary-deep">{enquiry.serviceRequired}</td>
                      <td className="p-4 text-[13px] text-[#667085]">{formatDate(enquiry.createdAt)}</td>
                      <td className="p-4"><EnquiryStatusBadge status={enquiry.status} /></td>
                      <td className="p-4 text-right space-x-2">
                        <Link 
                          to={`/admin/enquiries/${enquiry._id}`} 
                          className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-warm-white text-primary-deep hover:bg-[var(--color-gold-primary)] hover:text-white transition-colors" 
                          aria-label="View Enquiry"
                        >
                          <FiEye />
                        </Link>
                        <button 
                          className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-warm-white text-red-500 hover:bg-red-500 hover:text-white transition-colors" 
                          onClick={() => openDeleteModal(enquiry)} 
                          aria-label="Delete Enquiry"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-[#E5E7EB]">
              {enquiries.map(enquiry => (
                <div className={`p-4 space-y-4 ${enquiry.status === 'New' ? 'bg-[#F0CD72]/5' : ''}`} key={enquiry._id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[15px] font-bold text-primary-deep flex items-center gap-2 mb-1">
                        {enquiry.status === 'New' && <span className="w-2 h-2 bg-[var(--color-gold-primary)] rounded-full"></span>}
                        {enquiry.fullName}
                      </div>
                      <div className="text-[13px] text-[#667085]">{enquiry.email}</div>
                    </div>
                    <EnquiryStatusBadge status={enquiry.status} />
                  </div>
                  <div className="text-[14px] text-primary-deep font-medium">{enquiry.serviceRequired} - {enquiry.facilityType}</div>
                  <div className="text-[13px] text-[#667085]">{formatDate(enquiry.createdAt)}</div>
                  
                  <div className="flex gap-2">
                    <Link to={`/admin/enquiries/${enquiry._id}`} className="flex-1 py-2.5 flex items-center justify-center gap-2 bg-warm-white text-primary-deep font-bold text-[13px] uppercase tracking-wider hover:bg-[#E5E7EB] transition-colors">
                      <FiEye /> View
                    </Link>
                    <button 
                      className="px-4 py-2.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      onClick={() => openDeleteModal(enquiry)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-[13px] text-[#667085]">
                  Showing <span className="font-bold text-primary-deep">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold text-primary-deep">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-bold text-primary-deep">{totalItems}</span> entries
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    className="w-8 h-8 flex items-center justify-center bg-warm-white text-primary-deep disabled:opacity-50 hover:bg-[#E5E7EB] transition-colors" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-label="Previous page"
                  >
                    <FiChevronLeft />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i + 1} 
                      className={`w-8 h-8 flex items-center justify-center font-medium transition-colors text-[13px] ${currentPage === i + 1 ? 'bg-primary-deep text-[var(--color-gold-primary)]' : 'bg-warm-white text-primary-deep hover:bg-[#E5E7EB]'}`}
                      onClick={() => handlePageChange(i + 1)}
                      aria-label={`Page ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    className="w-8 h-8 flex items-center justify-center bg-warm-white text-primary-deep disabled:opacity-50 hover:bg-[#E5E7EB] transition-colors" 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-label="Next page"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <DeleteEnquiryModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        enquiryName={enquiryToDelete?.fullName}
      />
    </motion.div>
  );
};

export default EnquiryList;
