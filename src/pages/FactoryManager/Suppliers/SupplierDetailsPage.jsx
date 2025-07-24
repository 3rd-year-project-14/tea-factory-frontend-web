import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Check, X, Mail } from "lucide-react";

// Modular components
import ApprovalModal from "./SupplierDetails/Modals/ApprovalModal";
import RejectionModal from "./SupplierDetails/Modals/RejectionModal";
import ContactModal from "./SupplierDetails/Modals/ContactModal";
import PersonalInfoCard from "./SupplierDetails/PersonalInfoCard";
import BusinessInfoCard from "./SupplierDetails/BusinessInfoCard";
import BankingInfoCard from "./SupplierDetails/BankingInfoCard";
import DocumentsCard from "./SupplierDetails/DocumentsCard";
import ActivityTimelineCard from "./SupplierDetails/ActivityTimelineCard";
import PerformanceChart from "./SupplierDetails/PerformanceChart";
// ...existing code...

const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";

export default function SupplierDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approvalError, setApprovalError] = useState("");

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

  useEffect(() => {
    setLoading(true);

    const fetchSupplier = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/suppliers/${id}`
        );
        if (res.data && Object.keys(res.data).length > 0) {
          setSupplier(res.data);
        } else {
          const alt = await axios.get(
            `http://localhost:8080/api/supplier-requests/${id}`
          );
          setSupplier(alt.data);
        }
      } catch {
        try {
          const fallback = await axios.get(
            `http://localhost:8080/api/supplier-requests/${id}`
          );
          setSupplier(fallback.data);
        } catch {
          setSupplier(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

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

  const handleRejectSupplierRequest = async (id, reason) => {
    try {
      await axios.post(
        `http://localhost:8080/api/supplier-requests/${id}/reject?reason=${encodeURIComponent(
          reason
        )}`
      );
      setSupplier({ ...supplier, status: "rejected", rejectReason: reason });
      closeRejection();
    } catch {
      alert("Failed to reject supplier.");
    }
  };

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

  // Normalize status
  let normalizedStatus = supplier?.status;
  if (!normalizedStatus && supplier?.approvedDate) {
    normalizedStatus = "approved";
  }

  let statusText = "Unknown";
  let statusColor = "text-gray-600 bg-gray-100";

  if (normalizedStatus === "pending") {
    statusText = "Pending Review";
    statusColor = "text-yellow-700 bg-yellow-100";
  } else if (normalizedStatus === "rejected") {
    statusText = "Rejected";
    statusColor = "text-red-700 bg-red-100";
  } else if (normalizedStatus === "approved") {
    statusText = "Approved";
    statusColor = "text-green-700 bg-green-100";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#165E52] border-solid mb-4"></div>
          <span className="text-[#165E52] font-semibold text-lg">
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
          <h2
            className="text-2xl font-bold"
            style={{
              color: ACCENT_COLOR,
              marginBottom: "0.5rem",
            }}
          >
            Supplier Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The supplier you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-[#01251F] text-white rounded-lg hover:opacity-90"
          >
            Back to Suppliers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto">
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

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#cfece6] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
            <div>
              <p className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>
                {supplier.user?.name || supplier.name}
              </p>
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-2 mt-2">
                <span>
                  ID: {supplier.supplierId || `2025-00${supplier.id}`}
                </span>
                <span>•</span>
                {normalizedStatus === "approved" && supplier.approvedDate && (
                  <span>Approved: {supplier.approvedDate}</span>
                )}
                {normalizedStatus === "pending" && (
                  <span>Submitted: {supplier.date}</span>
                )}
                {normalizedStatus === "rejected" && supplier.rejectedDate && (
                  <span>Rejected: {supplier.rejectedDate}</span>
                )}
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  {statusText}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBack}
                className="px-5 py-2 border text-sm font-medium text-black bg-[#f1f5f9] rounded-md hover:bg-gray-100"
              >
                ← Back
              </button>
              {supplier.status === "pending" && (
                <>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg text-white font-medium"
                    onClick={() => setShowApproval(true)}
                    style={{ backgroundColor: BTN_COLOR }}
                  >
                    <Check size={16} className="mr-2" />
                    Approve
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700"
                    onClick={() => setShowRejection(true)}
                  >
                    <X size={16} className="mr-2" />
                    Reject
                  </button>
                </>
              )}
              <button
                className="inline-flex items-center px-4 py-2 rounded-lg text-white font-medium"
                onClick={() => setShowContact(true)}
                style={{ backgroundColor: BTN_COLOR }}
              >
                <Mail size={16} className="mr-2" />
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* ...existing code... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard
              supplier={{ ...supplier, status: normalizedStatus }}
            />
            <BusinessInfoCard
              supplier={{ ...supplier, status: normalizedStatus }}
            />
            <PerformanceChart
              supplier={{ ...supplier, status: normalizedStatus }}
            />
          </div>
          <div className="space-y-6">
            <DocumentsCard
              supplier={{ ...supplier, status: normalizedStatus }}
            />
            <BankingInfoCard
              supplier={{ ...supplier, status: normalizedStatus }}
            />
            <ActivityTimelineCard
              supplier={{ ...supplier, status: normalizedStatus }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
