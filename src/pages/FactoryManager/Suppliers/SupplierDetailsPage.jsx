import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function SupplierDetailsPage() {
  // Backend handler for approval
  const [approvalError, setApprovalError] = useState("");
  const handleApproveSupplierRequest = async () => {
    setApprovalError("");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/supplier-requests/${supplier.id}/approve?routeId=${approvalData.route}`
      );
      if (response.status >= 200 && response.status < 300) {
        setSupplier({
          ...supplier,
          status: "approved",
          approvedDate: new Date().toISOString(),
        });
        closeApproval();
      } else {
        setApprovalError("Failed to approve supplier.");
      }
    } catch {
      setApprovalError("Failed to approve supplier.");
    }
  };
  // Backend handler for rejection
  const handleRejectSupplierRequest = async (id, reason) => {
    try {
      await axios.post(
        `http://localhost:8080/api/supplier-requests/${id}/reject?reason=${encodeURIComponent(
          reason
        )}`
      );
      // Update local supplier state to reflect rejection
      setSupplier({ ...supplier, status: "rejected", rejectReason: reason });
      closeRejection();
    } catch {
      alert("Failed to reject supplier.");
    }
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Decide which table to fetch from based on route or context
    // If viewing approved supplier, get from supplier table only
    // If viewing pending/rejected, get from request table only
    // For this, you may need to pass a prop or use route context, but here we'll try supplier table first
    axios
      .get(`http://localhost:8080/api/suppliers/${id}`)
      .then((res) => {
        if (res.data && Object.keys(res.data).length > 0) {
          setSupplier(res.data);
          setLoading(false);
        } else {
          // If not found, try supplier-requests
          axios
            .get(`http://localhost:8080/api/supplier-requests/${id}`)
            .then((res2) => {
              setSupplier(res2.data);
            })
            .catch(() => setSupplier(null))
            .finally(() => setLoading(false));
        }
      })
      .catch(() => {
        // If error, fallback to supplier-requests
        axios
          .get(`http://localhost:8080/api/supplier-requests/${id}`)
          .then((res2) => {
            setSupplier(res2.data);
          })
          .catch(() => setSupplier(null))
          .finally(() => setLoading(false));
      });
  }, [id]);

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

  // ...existing code...

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500 border-solid mb-4"></div>
          <span className="text-emerald-700 font-semibold text-lg">
            Loading supplier details...
          </span>
          {approvalError && (
            <span className="text-red-600 font-semibold mt-2">
              {approvalError}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (!supplier && !loading) {
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

  // Fix: treat missing or falsy status as 'approved' if supplier is in approved view
  let normalizedStatus = supplier.status;
  // If supplier.status is missing and supplier is from supplier table, treat as approved
  if (!normalizedStatus && supplier && supplier.approvedDate) {
    normalizedStatus = "approved";
  }

  if (normalizedStatus === "pending") {
    statusText = "Pending Review";
    statusColor = "text-yellow-600 bg-yellow-100";
  } else if (normalizedStatus === "rejected") {
    statusText = "Rejected";
    statusColor = "text-red-600 bg-red-100";
  } else if (normalizedStatus === "approved") {
    statusText = "Approved";
    statusColor = "text-emerald-600 bg-emerald-100";
  } else {
    statusText = normalizedStatus || "Unknown";
    statusColor = "text-gray-600 bg-gray-100";
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
        onApproveSupplierRequest={handleApproveSupplierRequest}
      />

      <RejectionModal
        show={showRejection}
        onClose={closeRejection}
        supplier={supplier}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onRejectSupplierRequest={handleRejectSupplierRequest}
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
                  {supplier.user.name}
                </p>
                <div className="flex items-center space-x-4 mt-1">
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
            <PersonalInfoCard supplier={{
              ...supplier,
              status: normalizedStatus,
            }} />
            <BusinessInfoCard supplier={{
              ...supplier,
              status: normalizedStatus,
              
            }} />
            <PerformanceChart supplier={{ ...supplier, status: normalizedStatus }} />
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <DocumentsCard supplier={{ ...supplier, status: normalizedStatus }} />
            <BankingInfoCard supplier={{ ...supplier, status: normalizedStatus }} />
            <ActivityTimelineCard supplier={{ ...supplier, status: normalizedStatus }} />
          </div>
        </div>
      </div>
    </div>
  );
}
