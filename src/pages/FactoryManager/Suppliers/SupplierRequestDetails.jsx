import React, { useState } from "react";
import { Check, X, Mail } from "lucide-react";

// Import modular components
import ApprovalModal from "./SupplierDetails/Modals/ApprovalModal";
import RejectionModal from "./SupplierDetails/Modals/RejectionModal";
import ContactModal from "./SupplierDetails/Modals/ContactModal";
import PersonalInfoCard from "./SupplierDetails/PersonalInfoCard";
import BusinessInfoCard from "./SupplierDetails/BusinessInfoCard";
import BankingInfoCard from "./SupplierDetails/BankingInfoCard";
import DocumentsCard from "./SupplierDetails/DocumentsCard";
import ActivityTimelineCard from "./SupplierDetails/ActivityTimelineCard";
import QuickActionsCard from "./SupplierDetails/QuickActionsCard";
import PerformanceChart from "./SupplierDetails/PerformanceChart";

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
      {/* Modals */}
      <ApprovalModal
        show={showApproval}
        onClose={closeApproval}
        supplier={supplier}
        approvalData={approvalData}
        setApprovalData={setApprovalData}
        onConfirm={handleApproveSupplier}
      />

      <RejectionModal
        show={showRejection}
        onClose={closeRejection}
        supplier={supplier}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onConfirm={handleRejectSupplier}
      />

      <ContactModal
        show={showContact}
        onClose={closeContact}
        supplier={supplier}
        contactData={contactData}
        setContactData={setContactData}
        onConfirm={handleSendMessage}
      />

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
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#f1f5f9] text-[#000] border-none hover:bg-[#e2e8f0] ml-2"
              >
                ← Back
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
            <PersonalInfoCard supplier={supplier} />
            <BusinessInfoCard supplier={supplier} />
            <BankingInfoCard supplier={supplier} />
            <PerformanceChart supplier={supplier} />
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <DocumentsCard />
            <ActivityTimelineCard supplier={supplier} />
            <QuickActionsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
