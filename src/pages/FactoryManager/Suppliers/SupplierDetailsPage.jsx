import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import PerformanceChart from "./SupplierDetails/PerformanceChart";
import { initialSuppliers, supplierUtils } from "./supplierData.jsx";

export default function SupplierDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [supplier, setSupplier] = useState(null);

  // Modal state
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

  // Find supplier by ID
  useEffect(() => {
    const foundSupplier = suppliers.find((s) => s.id === parseInt(id));
    setSupplier(foundSupplier);
  }, [id, suppliers]);

  if (!supplier) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Supplier Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The supplier you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/factoryManager/suppliers")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Back to Suppliers
          </button>
        </div>
      </div>
    );
  }

  let statusText = "";
  let statusColor = "";

  if (supplier.status === "pending") {
    statusText = "Pending Review";
    statusColor = "text-yellow-600 bg-yellow-100";
  } else if (supplier.status === "approved") {
    statusText = "Approved";
    statusColor = "text-emerald-600 bg-emerald-100";
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
    const updatedSuppliers = supplierUtils.approveSupplier(
      suppliers,
      supplier.id,
      approvalData
    );
    setSuppliers(updatedSuppliers);
    // Update current supplier
    const updatedSupplier = updatedSuppliers.find((s) => s.id === supplier.id);
    setSupplier(updatedSupplier);
    alert(
      `Supplier approved successfully! Route: ${approvalData.route}, Bag Limit: ${approvalData.bagLimit}`
    );
    closeApproval();
  };

  const handleRejectSupplier = () => {
    const updatedSuppliers = supplierUtils.rejectSupplier(
      suppliers,
      supplier.id,
      rejectionReason
    );
    setSuppliers(updatedSuppliers);
    // Update current supplier
    const updatedSupplier = updatedSuppliers.find((s) => s.id === supplier.id);
    setSupplier(updatedSupplier);
    alert(`Supplier rejected. Reason: ${rejectionReason}`);
    closeRejection();
  };

  const handleSendMessage = () => {
    alert(
      `Message sent to ${supplier.name}!\nSubject: ${contactData.subject}\nMessage: ${contactData.message}`
    );
    closeContact();
  };

  const handleBack = () => {
    navigate("/factoryManager/suppliers");
  };

  return (
    <div className="min-h-screen bg-gray-50 scrollbar-hide">
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
      <div className="bg-white shadow-md border-b border-emerald-300">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-3xl font-bold text-emerald-800">
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
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border-2 border-emerald-300 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm"
              >
                ← Back
              </button>
              {supplier.status === "pending" && (
                <>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                    onClick={() => setShowApproval(true)}
                  >
                    <Check className="w-4 h-4 mr-2 text-white" />
                    Approve
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                    onClick={() => setShowRejection(true)}
                  >
                    <X className="w-4 h-4 mr-2 text-white" />
                    Reject
                  </button>
                </>
              )}
              <button
                className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                onClick={() => setShowContact(true)}
              >
                <Mail className="w-4 h-4 mr-2 text-white" />
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
            <PerformanceChart supplier={supplier} />
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <DocumentsCard />
            <BankingInfoCard supplier={supplier} />
            <ActivityTimelineCard supplier={supplier} />
          </div>
        </div>
      </div>
    </div>
  );
}
