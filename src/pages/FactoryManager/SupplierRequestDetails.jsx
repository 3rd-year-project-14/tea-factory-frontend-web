import React, { useState } from "react";
import {
  Check,
  X,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Download,
  Eye,
  Calendar,
  Building,
  TrendingUp,
} from "lucide-react";
import AdvanceChart from "../../components/charts/AdvanceChart";

export default function SupplierRequestDetails({
  supplier,
  onBack,
  onApprove,
  onReject,
}) {
  // Modal state (must be before any return)
  const [showApproval, setShowApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [approvalData, setApprovalData] = useState({
    route: "",
    bagLimit: "",
    notes: "",
  });
  const [rejectionReason, setRejectionReason] = useState("");
  const [contactData, setContactData] = useState({
    subject: "",
    message: "",
  });

  if (!supplier) return null;

  let statusText = "";
  let statusColor = "";

  if (supplier.status === "pending") {
    statusText = "Pending Review";
    statusColor = "text-yellow-600 bg-yellow-100";
  } else if (supplier.status === "approved") {
    statusText = "Approved";
    statusColor = "text-green-600 bg-green-100";
  } else {
    statusText = "Rejected";
    statusColor = "text-red-600 bg-red-100";
  }

  // Modal close handlers
  const closeApproval = () => {
    setShowApproval(false);
    setApprovalData({ route: "", bagLimit: "", notes: "" });
  };

  const closeRejection = () => {
    setShowRejection(false);
    setRejectionReason("");
  };

  const closeContact = () => {
    setShowContact(false);
    setContactData({ subject: "", message: "" });
  };

  // Enhanced handlers for confirm
  const handleApproveSupplier = () => {
    if (onApprove) {
      onApprove(supplier.id, approvalData);
    }
    closeApproval();
  };

  const handleRejectSupplier = () => {
    if (onReject) {
      onReject(supplier.id, rejectionReason);
    }
    closeRejection();
  };

  const handleSendMessage = () => {
    // Here you would typically send the message to the supplier
    alert(
      `Message sent to ${supplier.name}!\nSubject: ${contactData.subject}\nMessage: ${contactData.message}`
    );
    closeContact();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Approval Modal */}
      {showApproval && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Approve Supplier Registration
                </h2>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={closeApproval}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">
                  Supplier Information
                </h3>
                <p className="text-sm text-blue-700">
                  {supplier.name} - {supplier.location}
                </p>
                <p className="text-sm text-blue-700">
                  Expected Supply: {supplier.supply}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Assign Route *
                  </label>
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={approvalData.route}
                    onChange={(e) =>
                      setApprovalData({
                        ...approvalData,
                        route: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Route</option>
                    <option value="route1">Route A-01 (Colombo North)</option>
                    <option value="route2">Route B-02 (Colombo South)</option>
                    <option value="route3">Route C-03 (Colombo East)</option>
                    <option value="route4">Route D-04 (Colombo West)</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Supplier ID
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
                    value={`SUP-2025-00${supplier.id}`}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Initial Bag Limit *
                  </label>
                  <input
                    type="number"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 50"
                    value={approvalData.bagLimit}
                    onChange={(e) =>
                      setApprovalData({
                        ...approvalData,
                        bagLimit: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Manager Notes (Internal)
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[100px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add any internal notes about this supplier approval..."
                    value={approvalData.notes}
                    onChange={(e) =>
                      setApprovalData({
                        ...approvalData,
                        notes: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200 bg-gray-50">
              <button
                className="px-6 py-2 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 border border-gray-300 transition-colors"
                onClick={closeApproval}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleApproveSupplier}
                disabled={!approvalData.route || !approvalData.bagLimit}
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejection && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Reject Supplier Registration
                </h2>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={closeRejection}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-red-900 mb-2">
                  Confirm Rejection
                </h3>
                <p className="text-sm text-red-700">
                  Are you sure you want to reject the registration request from{" "}
                  <strong>{supplier.name}</strong>?
                </p>
                <p className="text-sm text-red-600 mt-2">
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection *
                </label>
                <textarea
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[120px] resize-y focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Please provide a clear reason for rejection. This will be communicated to the supplier."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200 bg-gray-50">
              <button
                className="px-6 py-2 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 border border-gray-300 transition-colors"
                onClick={closeRejection}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleRejectSupplier}
                disabled={!rejectionReason.trim()}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Contact Supplier
                </h2>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={closeContact}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">
                  Send Message To
                </h3>
                <p className="text-sm text-blue-700">
                  {supplier.name} - {supplier.location}
                </p>
                <p className="text-sm text-blue-700">Email: {supplier.email}</p>
                <p className="text-sm text-blue-700">Phone: {supplier.phone}</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter message subject..."
                    value={contactData.subject}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[150px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your message here..."
                    value={contactData.message}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200 bg-gray-50">
              <button
                className="px-6 py-2 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 border border-gray-300 transition-colors"
                onClick={closeContact}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={
                  !contactData.subject.trim() || !contactData.message.trim()
                }
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Header with Quick Stats */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {supplier.name}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-500">
                    ID: {supplier.supplierId || `2025-00${supplier.id}`}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  {supplier.status === "approved" && supplier.approvedDate && (
                    <>
                      <span className="text-sm text-gray-500">
                        Approved: {supplier.approvedDate}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                    </>
                  )}
                  {supplier.status === "pending" && (
                    <>
                      <span className="text-sm text-gray-500">
                        Submitted: {supplier.date}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                    </>
                  )}
                  {supplier.status === "rejected" && supplier.rejectedDate && (
                    <>
                      <span className="text-sm text-gray-500">
                        Rejected: {supplier.rejectedDate}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                    </>
                  )}
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                  >
                    {statusText}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Back
              </button>
              {supplier.status === "pending" && (
                <>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                    onClick={() => setShowApproval(true)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                    onClick={() => setShowRejection(true)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </>
              )}
              <button
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                onClick={() => setShowContact(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Information - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Full Name
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {supplier.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      NIC Number
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {supplier.nic}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Date of Birth
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      December 15, 1995
                    </p>
                    <p className="text-xs text-gray-500">29 years old</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Mobile Number
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        {supplier.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        kamal.perera@email.com
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Address
                    </label>
                    <div className="mt-1 flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          123, Galle Road
                        </p>
                        <p className="text-xs text-gray-500">
                          {supplier.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business & Land Information Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Business & Land Information
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Land Size
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      2.5 acres
                    </p>
                    <p className="text-xs text-gray-500">1.01 hectares</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Land Location
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {supplier.location}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Monthly Supply
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <p className="text-sm font-medium text-gray-900">
                        {supplier.supply}
                      </p>
                    </div>
                  </div>
                  {supplier.status === "approved" && supplier.route && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Assigned Route
                      </label>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {supplier.route}
                      </p>
                    </div>
                  )}
                  {supplier.status === "pending" && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Requested Route
                      </label>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        Nugegoda-Maharagama
                      </p>
                    </div>
                  )}
                  {supplier.status === "rejected" &&
                    supplier.rejectionReason && (
                      <div className="md:col-span-2 lg:col-span-3">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Rejection Reason
                        </label>
                        <p className="mt-1 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                          {supplier.rejectionReason}
                        </p>
                      </div>
                    )}
                </div>

                {/* Maps Placeholder */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Land Location Map</p>
                    </div>
                  </div>
                  <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Pickup Location Map
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Banking Information Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Banking Information
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Bank Name
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      Commercial Bank
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Account Holder
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {supplier.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Account Number
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      8001234567
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Branch
                    </label>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      Maharagama Branch
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Supply Performance Chart - Only for Approved Suppliers */}
            {supplier.status === "approved" && (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Monthly Supply Performance
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <AdvanceChart />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Document Management Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Documents
                    </h3>
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    Complete
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          NIC Copy
                        </p>
                        <p className="text-xs text-gray-500">PDF • 2.3 MB</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Land Ownership Deed
                        </p>
                        <p className="text-xs text-gray-500">PDF • 4.1 MB</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div> */}

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Bank Copy
                        </p>
                        <p className="text-xs text-gray-500">PDF • 1.8 MB</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Download All Documents
                </button>
              </div>
            </div>

            {/* Activity Timeline Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Activity Timeline
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Application Submitted
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {supplier.date} at 2:30 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Documents Verified
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {supplier.date} at 2:45 PM
                      </p>
                    </div>
                  </div>

                  {supplier.status === "approved" && supplier.approvedDate && (
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Application Approved
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {supplier.approvedDate} at 9:00 AM
                        </p>
                      </div>
                    </div>
                  )}

                  {supplier.status === "rejected" && supplier.rejectedDate && (
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Application Rejected
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {supplier.rejectedDate} at 9:00 AM
                        </p>
                      </div>
                    </div>
                  )}

                  {supplier.status === "pending" && (
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Under Review
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Pending approval decision
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-sm font-medium text-gray-900">
                      Schedule Site Visit
                    </span>
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-sm font-medium text-gray-900">
                      Send Message
                    </span>
                    <Mail className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-sm font-medium text-gray-900">
                      Request More Info
                    </span>
                    <FileText className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
