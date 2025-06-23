import { useState } from "react";
import AdvanceDetails from "./AdvanceDetails.jsx";

const initialSuppliers = [
  {
    id: "SP-2025-001",
    name: "Kamal Perera",
    amount: "20000",
    last_income: "74000",
    this_weight: "280",
    this_income: "560000",
    loans: "",
    fertilizer_loans: "12000",
    date: "2025-06-08",
    status: "pending",
    eligibility: "PASS",
  },
  {
    id: "SP-2025-002",
    name: "Nimal Silva",
    amount: "55000",
    last_income: "128000",
    this_weight: "480",
    this_income: "960000",
    loans: "15000",
    fertilizer_loans: "12000",
    date: "2025-06-07",
    status: "rejected",
    eligibility: "FAIL",
  },
  {
    id: "SP-2025-003",
    name: "Sunil Jayawardena",
    amount: "3000",
    last_income: "28000",
    this_weight: "80",
    this_income: "16000",
    loans: "",
    fertilizer_loans: "",
    date: "2025-06-05",
    status: "approved",
    eligibility: "PASS",
  },
];

export default function SupplierRegister() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [activeTab, setActiveTab] = useState("requests");
  const [profileModal, setProfileModal] = useState(null); // supplier id or null
  const [approvalModal, setApprovalModal] = useState(null); // supplier id or null
  const [rejectionModal, setRejectionModal] = useState(null); // supplier id or null
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    route: "",
  });
  const [detailedSupplier, setDetailedSupplier] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "", region: "", route: "" });
  };

  const filteredSuppliers = suppliers.filter((s) => {
    const matchesSearch =
      filters.search === "" ||
      s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      ("SUP-2025-00" + s.id).includes(filters.search);
    const matchesStatus = !filters.status || s.status === filters.status;
    // For demo, region/route filters are not implemented
    return matchesSearch && matchesStatus;
  });

  const approveSupplier = (id) => {
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );
    setApprovalModal(null);
    alert("Supplier approved successfully!");
  };

  const rejectSupplier = (id) => {
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );
    setRejectionModal(null);
    alert("Supplier rejected.");
  };

  // Show detailed view if a supplier is selected
  if (detailedSupplier) {
    return (
      <AdvanceDetails
        supplier={detailedSupplier}
        onBack={() => setDetailedSupplier(null)}
      />
    );
  }

  return (
    <div className="container max-w-[1440px] mx-auto p-6 bg-[#f8fafc] text-[#1e293b] min-h-screen">
      {/* Page Header */}
      <div className="page-header bg-white rounded-xl p-8 mb-6 shadow">
        <h1 className="page-title text-2xl font-bold text-[#0f172a] mb-2">
          Advance Requests
        </h1>
      </div>
      {/* Filter Section */}
      <div className="filter-section bg-white rounded-xl p-6 mb-6 shadow">
        <div className="filter-grid grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="form-group flex flex-col">
            <label className="form-label text-sm font-medium text-[#374151] mb-1">
              Search
            </label>
            <input
              type="text"
              name="search"
              className="form-input p-2 border border-[#d1d5db] rounded-lg text-sm"
              placeholder="Search by name or ID"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group flex flex-col">
            <label className="form-label text-sm font-medium text-[#374151] mb-1">
              Status
            </label>
            <select
              name="status"
              className="form-select p-2 border border-[#d1d5db] rounded-lg text-sm"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group flex flex-col">
            <label className="form-label text-sm font-medium text-[#374151] mb-1">
              Route
            </label>
            <select
              name="route"
              className="form-select p-2 border border-[#d1d5db] rounded-lg text-sm"
              value={filters.route}
              onChange={handleFilterChange}
            >
              <option value="">All Routes</option>
              <option value="route1">Route A-01</option>
              <option value="route2">Route B-02</option>
              <option value="route3">Route C-03</option>
            </select>
          </div>
          <button
            className="btn btn-secondary bg-[#f1f5f9] text-[#475569] rounded-lg px-4 py-2 font-medium hover:bg-[#e2e8f0]"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content bg-white rounded-xl shadow overflow-hidden">
        <div className="content-header p-6 border-b border-[#e2e8f0] flex justify-between items-center">
          <div className="tab-nav flex gap-1">
            <button
              className={`tab-btn px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === "requests"
                  ? "bg-[#3b82f6] text-white"
                  : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#475569]"
              }`}
              onClick={() => setActiveTab("requests")}
            >
              Pending Requests
            </button>
            <button
              className={`tab-btn px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === "history"
                  ? "bg-[#3b82f6] text-white"
                  : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#475569]"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Approval History
            </button>
          </div>
          <div className="export-options flex gap-2">
            <button className="btn btn-secondary bg-[#f1f5f9] text-[#475569] rounded-lg px-4 py-2 font-medium hover:bg-[#e2e8f0]">
              📊 Export Excel
            </button>
            <button className="btn btn-secondary bg-[#f1f5f9] text-[#475569] rounded-lg px-4 py-2 font-medium hover:bg-[#e2e8f0]">
              🖨️ Print
            </button>
          </div>
        </div>
        <div className="table-container overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-[#f8fafc] p-4 text-left text-sm font-semibold text-[#374151] border-b border-[#e2e8f0]">
                  ID
                </th>
                <th className="bg-[#f8fafc] p-4 text-left text-sm font-semibold text-[#374151] border-b border-[#e2e8f0]">
                  Supplier Name
                </th>
                <th className="bg-[#f8fafc] p-4 text-left text-sm font-semibold text-[#374151] border-b border-[#e2e8f0]">
                  Advance Requested (Rs)
                </th>
                <th className="bg-[#f8fafc] p-4 text-left text-sm font-semibold text-[#374151] border-b border-[#e2e8f0]">
                  Request Date
                </th>
                <th className="bg-[#f8fafc] p-4 text-left text-sm font-semibold text-[#374151] border-b border-[#e2e8f0]">
                  Status
                </th>
                <th className="bg-[#f8fafc] p-4 text-left text-sm font-semibold text-[#374151] border-b border-[#e2e8f0]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((s) => (
                <tr key={s.id} className="hover:bg-[#f8fafc]">
                  <td className="p-4">
                    <span className="text-[#0f172a] font-medium">{s.id}</span>
                  </td>
                  <td className="p-4">
                    <strong>{s.name}</strong>
                  </td>
                  <td className="p-4">{s.amount}</td>
                  <td className="p-4">{s.date}</td>
                  <td className="p-4">
                    <span
                      className={`status-badge px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                        s.status === "pending"
                          ? "bg-[#fef3c7] text-[#92400e]"
                          : s.status === "approved"
                          ? "bg-[#d1fae5] text-[#065f46]"
                          : "bg-[#fee2e2] text-[#991b1b]"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="action-buttons flex gap-2">
                      <button
                        className="btn-icon btn-view bg-[#f0f9ff] text-[#0369a1] rounded-md p-2 hover:bg-[#e0f2fe]"
                        title="View Details"
                        onClick={() => setDetailedSupplier(s)}
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Profile Modal */}
      {profileModal && (
        <Modal onClose={() => setProfileModal(null)}>
          <div className="modal-header p-6 border-b border-[#e2e8f0] flex justify-between items-center">
            <h2 className="modal-title text-lg font-semibold text-[#0f172a]">
              Supplier Profile
            </h2>
            <button
              className="modal-close text-2xl text-[#64748b] p-1"
              onClick={() => setProfileModal(null)}
            >
              &times;
            </button>
          </div>
          <div className="modal-content p-6">
            <div className="profile-section mb-6">
              <h3 className="section-title text-base font-semibold text-[#0f172a] mb-3">
                Personal Information
              </h3>
              <div className="profile-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="profile-item flex flex-col">
                  <span className="profile-label text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    Full Name
                  </span>
                  <span className="profile-value text-sm text-[#0f172a]">
                    {suppliers.find((s) => s.id === profileModal)?.name}
                  </span>
                </div>
                <div className="profile-item flex flex-col">
                  <span className="profile-label text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    NIC Number
                  </span>
                  <span className="profile-value text-sm text-[#0f172a]">
                    {suppliers.find((s) => s.id === profileModal)?.nic}
                  </span>
                </div>
                <div className="profile-item flex flex-col">
                  <span className="profile-label text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    Mobile Number
                  </span>
                  <span className="profile-value text-sm text-[#0f172a]">
                    {suppliers.find((s) => s.id === profileModal)?.phone}
                  </span>
                </div>
                <div className="profile-item flex flex-col">
                  <span className="profile-label text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    Date of Birth
                  </span>
                  <span className="profile-value text-sm text-[#0f172a]">
                    1995-12-15
                  </span>
                </div>
              </div>
            </div>
            <div className="profile-section mb-6">
              <h3 className="section-title text-base font-semibold text-[#0f172a] mb-3">
                Land & Supply Information
              </h3>
              <div className="profile-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="profile-item flex flex-col">
                  <span className="profile-label text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    Land Size
                  </span>
                  <span className="profile-value text-sm text-[#0f172a]">
                    2.5 acres
                  </span>
                </div>
                <div className="profile-item flex flex-col">
                  <span className="profile-label text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    Crop History
                  </span>
                  <span className="profile-value text-sm text-[#0f172a]">
                    Rice, Vegetables
                  </span>
                </div>
                <div className="profile-item flex flex-col">
                  <span className="profile-label text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    Location
                  </span>
                  <span className="profile-value text-sm text-[#0f172a]">
                    {suppliers.find((s) => s.id === profileModal)?.location}
                  </span>
                </div>
                <div className="profile-item flex flex-col">
                  <span className="profile-label text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    Monthly Supply
                  </span>
                  <span className="profile-value text-sm text-[#0f172a]">
                    {suppliers.find((s) => s.id === profileModal)?.supply}
                  </span>
                </div>
              </div>
            </div>
            <div className="profile-section mb-6">
              <h3 className="section-title text-base font-semibold text-[#0f172a] mb-3">
                Manager Notes
              </h3>
              <textarea
                className="form-input textarea p-2 border border-[#d1d5db] rounded-lg text-sm min-h-[80px] w-full"
                placeholder="Add notes about this supplier..."
              ></textarea>
            </div>
          </div>
          <div className="modal-footer p-6 border-t border-[#e2e8f0] flex gap-3 justify-end">
            <button
              className="btn btn-secondary bg-[#f1f5f9] text-[#475569] rounded-lg px-4 py-2 font-medium hover:bg-[#e2e8f0]"
              onClick={() => setProfileModal(null)}
            >
              Close
            </button>
            <button
              className="btn btn-success bg-[#10b981] text-white rounded-lg px-4 py-2 font-medium hover:bg-[#059669]"
              onClick={() => {
                setProfileModal(null);
                setApprovalModal(profileModal);
              }}
            >
              Approve Supplier
            </button>
            <button
              className="btn btn-danger bg-[#ef4444] text-white rounded-lg px-4 py-2 font-medium hover:bg-[#dc2626]"
              onClick={() => {
                setProfileModal(null);
                setRejectionModal(profileModal);
              }}
            >
              Reject
            </button>
          </div>
        </Modal>
      )}
      {/* Approval Modal */}
      {approvalModal && (
        <Modal onClose={() => setApprovalModal(null)}>
          <div className="modal-header p-6 border-b border-[#e2e8f0] flex justify-between items-center">
            <h2 className="modal-title text-lg font-semibold text-[#0f172a]">
              Approve Supplier
            </h2>
            <button
              className="modal-close text-2xl text-[#64748b] p-1"
              onClick={() => setApprovalModal(null)}
            >
              &times;
            </button>
          </div>
          <div className="modal-content p-6">
            <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-group flex flex-col">
                <label className="form-label text-sm font-medium text-[#374151] mb-1">
                  Assign Route
                </label>
                <select className="form-select p-2 border border-[#d1d5db] rounded-lg text-sm">
                  <option value="">Select Route</option>
                  <option value="route1">Route A-01 (Colombo North)</option>
                  <option value="route2">Route B-02 (Colombo South)</option>
                  <option value="route3">Route C-03 (Colombo East)</option>
                </select>
              </div>
              <div className="form-group flex flex-col">
                <label className="form-label text-sm font-medium text-[#374151] mb-1">
                  Supplier ID
                </label>
                <input
                  type="text"
                  className="form-input p-2 border border-[#d1d5db] rounded-lg text-sm"
                  value={`SUP-2025-00${approvalModal}`}
                  readOnly
                />
              </div>
              <div className="form-group flex flex-col">
                <label className="form-label text-sm font-medium text-[#374151] mb-1">
                  Initial Bag Limit
                </label>
                <input
                  type="number"
                  className="form-input p-2 border border-[#d1d5db] rounded-lg text-sm"
                  placeholder="e.g., 50"
                />
              </div>
              <div className="form-group flex flex-col md:col-span-2">
                <label className="form-label text-sm font-medium text-[#374151] mb-1">
                  Manager Notes (Internal)
                </label>
                <textarea
                  className="form-input textarea p-2 border border-[#d1d5db] rounded-lg text-sm min-h-[80px] w-full"
                  placeholder="e.g., needs physical visit before first supply"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="modal-footer p-6 border-t border-[#e2e8f0] flex gap-3 justify-end">
            <button
              className="btn btn-secondary bg-[#f1f5f9] text-[#475569] rounded-lg px-4 py-2 font-medium hover:bg-[#e2e8f0]"
              onClick={() => setApprovalModal(null)}
            >
              Cancel
            </button>
            <button
              className="btn btn-success bg-[#10b981] text-white rounded-lg px-4 py-2 font-medium hover:bg-[#059669]"
              onClick={() => approveSupplier(approvalModal)}
            >
              Confirm Approval
            </button>
          </div>
        </Modal>
      )}
      {/* Rejection Modal */}
      {rejectionModal && (
        <Modal onClose={() => setRejectionModal(null)}>
          <div className="modal-header p-6 border-b border-[#e2e8f0] flex justify-between items-center">
            <h2 className="modal-title text-lg font-semibold text-[#0f172a]">
              Reject Supplier
            </h2>
            <button
              className="modal-close text-2xl text-[#64748b] p-1"
              onClick={() => setRejectionModal(null)}
            >
              &times;
            </button>
          </div>
          <div className="modal-content p-6">
            <p className="mb-4 text-[#64748b]">
              Are you sure you want to reject this supplier application?
            </p>
            <div className="form-group flex flex-col">
              <label className="form-label text-sm font-medium text-[#374151] mb-1">
                Reason for Rejection (Optional)
              </label>
              <textarea
                className="form-input textarea p-2 border border-[#d1d5db] rounded-lg text-sm min-h-[80px] w-full"
                placeholder="This reason will be visible to the supplier..."
              ></textarea>
            </div>
          </div>
          <div className="modal-footer p-6 border-t border-[#e2e8f0] flex gap-3 justify-end">
            <button
              className="btn btn-secondary bg-[#f1f5f9] text-[#475569] rounded-lg px-4 py-2 font-medium hover:bg-[#e2e8f0]"
              onClick={() => setRejectionModal(null)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger bg-[#ef4444] text-white rounded-lg px-4 py-2 font-medium hover:bg-[#dc2626]"
              onClick={() => rejectSupplier(rejectionModal)}
            >
              Confirm Rejection
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {children}
      </div>
    </div>
  );
}
