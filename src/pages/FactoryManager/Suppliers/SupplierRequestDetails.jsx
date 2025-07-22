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


// Design colors
const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";


export default function SupplierRequestDetails({ supplier, onBack, onApprove, onReject }) {
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


  // Status logic
  let statusText = "Unknown";
  let statusColor = "text-gray-600 bg-gray-100";


  if (supplier.status === "pending") {
    statusText = "Pending Review";
    statusColor = "text-yellow-700 bg-yellow-100";
  } else if (supplier.status === "approved") {
    statusText = "Approved";
    statusColor = "text-green-700 bg-green-100";
  } else if (supplier.status === "rejected") {
    statusText = "Rejected";
    statusColor = "text-red-700 bg-red-100";
  }


  // Handlers
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


  const handleApproveSupplier = () => {
    onApprove?.(supplier.id, approvalData.route, approvalData.bagLimit);
    closeApproval();
  };


  const handleRejectSupplier = () => {
    onReject?.(supplier.id, rejectionReason);
    closeRejection();
  };


  const handleSendMessage = () => {
    alert(`Message sent to ${supplier.name}!\nSubject: ${contactData.subject}\nMessage: ${contactData.message}`);
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
        onApproveSupplierRequest={handleApproveSupplier}
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


      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#cfece6] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
            <div>
              <p className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>
                {supplier.name}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 font-medium">
                <span>ID: {supplier.supplierId || `2025-00${supplier.id}`}</span>
                {supplier.status === "approved" && supplier.approvedDate && (
                  <>
                    <span>•</span>
                    <span>Approved: {supplier.approvedDate}</span>
                  </>
                )}
                {supplier.status === "pending" && (
                  <>
                    <span>•</span>
                    <span>Submitted: {supplier.date}</span>
                  </>
                )}
                {supplier.status === "rejected" && supplier.rejectedDate && (
                  <>
                    <span>•</span>
                    <span>Rejected: {supplier.rejectedDate}</span>
                  </>
                )}
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                >
                  {statusText}
                </span>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="px-5 py-2 rounded-lg border text-sm font-medium bg-[#f1f5f9] hover:bg-gray-100 text-black"
              >
                ← Back
              </button>
              {supplier.status === "pending" && (
                <>
                  <button
                    onClick={() => setShowApproval(true)}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-white font-medium transition"
                    style={{ backgroundColor: BTN_COLOR }}
                  >
                    <Check size={16} className="mr-2" />
                    Approve
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                    onClick={() => setShowRejection(true)}
                  >
                    <X size={16} className="mr-2" />
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setShowContact(true)}
                className="inline-flex items-center px-4 py-2 rounded-lg text-white font-medium transition"
                style={{ backgroundColor: BTN_COLOR }}
              >
                <Mail size={16} className="mr-2" />
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard supplier={supplier} />
            <BusinessInfoCard supplier={supplier} />
            <BankingInfoCard supplier={supplier} />
            <PerformanceChart supplier={supplier} />
          </div>


          {/* Right side */}
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



