import React, { useState } from "react";
import { Check, X, Clock, FileText } from "lucide-react";
import AdvanceChart from "../../components/charts/AdvanceChart";

export default function AdvanceDetails({
  supplier,
  onBack,
  onApprove,
  onReject,
}) {
  // Modal state (must be before any return)
  const [showApproval, setShowApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);

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
  const closeApproval = () => setShowApproval(false);
  const closeRejection = () => setShowRejection(false);

  // Handlers for confirm actions
  const handleApprove = () => {
    if (onApprove) {
      onApprove(supplier.id, {
        route: "Route A-01",
        loanTerms: {
          duration: 3, // months
          monthlyInstallment: Math.ceil(supplier.amount / 3),
        },
      });
    }
    closeApproval();
  };

  const handleReject = () => {
    if (onReject) {
      onReject(supplier.id, "Reason not specified");
    }
    closeRejection();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Approval Modal */}
      {showApproval && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-[#e2e8f0]">
              <h2 className="text-xl font-semibold text-[#0f172a]">
                Approve Advance
              </h2>
              {/* <button
                className="text-2xl text-[#64748b] hover:text-[#0f172a]"
                onClick={closeApproval}
              >
                &times;
              </button> */}
            </div>
            <div className="p-6">
              <div className="mb-6 text-[#0f172a] text-base">
                <p className="mb-2 font-semibold text-align-center">
                  Approve advance request for Rs. {supplier.amount} <br />
                  from {supplier.name}?
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Loan Terms
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Duration: 3 months</p>
                    <p>
                      • Monthly Installment: Rs.{" "}
                      {Math.ceil(supplier.amount / 3).toLocaleString()}
                    </p>
                    <p>
                      • This will create a loan entry for tracking repayments
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-[#e2e8f0]">
              <button
                className="px-5 py-2 rounded-lg bg-[#f1f5f9] text-[#0f172a] font-semibold hover:bg-[#e2e8f0]"
                onClick={closeApproval}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-[#10b981] text-white font-semibold hover:bg-[#059669]"
                onClick={handleApprove}
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Rejection Modal */}
      {showRejection && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-[#e2e8f0]">
              <h2 className="text-xl font-semibold text-[#0f172a]">
                Reject Supplier
              </h2>
              <button
                className="text-2xl text-[#64748b] hover:text-[#0f172a]"
                onClick={closeRejection}
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <p className="mb-4 text-[#64748b]">
                Are you sure you want to reject this advance request?
              </p>
              <div className="flex flex-col">
                <label className="text-xs font-medium text-[#64748b] mb-1">
                  Reason for Rejection (Optional)
                </label>
                <textarea
                  className="border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm min-h-[80px] resize-y"
                  placeholder="This reason will be visible to the supplier..."
                ></textarea>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-[#e2e8f0]">
              <button
                className="px-5 py-2 rounded-lg bg-[#f1f5f9] text-[#0f172a] font-semibold hover:bg-[#e2e8f0]"
                onClick={closeRejection}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-[#ef4444] text-white font-semibold hover:bg-[#dc2626]"
                onClick={handleReject}
              >
                Confirm Rejection
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
                    ID: {supplier.id}
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
                onClick={onBack}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#f1f5f9] text-[#000] border-none hover:bg-[#e2e8f0] ml-2"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-6">
          {/* Advance Request Details */}
          <div className="bg-white shadow overflow-hidden mb-6 rounded border border-[#94a3b8]">
            <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
              <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                {supplier.status === "approved"
                  ? "Advance Details"
                  : "Advance Request Details"}
              </h2>
            </div>
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Show eligibility only for pending status */}
                {supplier.status === "pending" && (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      ELIGIBILITY
                    </span>
                    <span
                      className={`text-xl font-bold ${
                        supplier.eligibility === "PASS"
                          ? "text-[#10b981]"
                          : "text-[#ef4444]"
                      }`}
                    >
                      {supplier.eligibility}
                    </span>
                  </div>
                )}

                {/* Other details - adjust grid based on status */}
                <div
                  className={`${
                    supplier.status === "pending" ? "col-span-2" : "col-span-3"
                  } grid grid-cols-1 md:grid-cols-3 gap-6`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      {supplier.status === "approved"
                        ? "GIVEN AMOUNT"
                        : "REQUESTED AMOUNT"}
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Rs. {supplier.amount}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      TYPE
                    </span>
                    <span className="text-base font-bold text-[#0f172a] capitalize">
                      {supplier.type || "Cash"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      LAST MONTH INCOME
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Rs. {supplier.last_income}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      {supplier.status === "approved"
                        ? "CURRENT MONTH TEA WEIGHT"
                        : "THIS MONTH WEIGHT"}
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      {supplier.this_weight}Kg
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      EXISTING LOANS
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Rs. {supplier.loans || "0"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      FERTILIZER LOANS
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Rs. {supplier.fertilizer_loans}
                    </span>
                  </div>
                  {supplier.status === "pending" && (
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                        THIS MONTH INCOME
                      </span>
                      <span className="text-base font-bold text-[#0f172a]">
                        Rs. {supplier.this_income}
                      </span>
                    </div>
                  )}
                  {supplier.status === "rejected" &&
                    supplier.rejectionReason && (
                      <div className="flex flex-col col-span-3">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Rejection Reason
                        </span>
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                          {supplier.rejectionReason}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          {/* Chart and Timeline below Advance Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tea Supply Chart */}
            <div className="bg-white shadow overflow-hidden rounded border border-[#94a3b8]">
              <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
                <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                  Tea Supply Analytics
                </h2>
              </div>
              <div className="px-6 pb-6">
                <AdvanceChart />
              </div>
            </div>
            {/* Activity Timeline */}
            <div className="bg-white shadow overflow-hidden rounded border border-[#94a3b8]">
              <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
                <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                  Activity Timeline
                </h2>
              </div>
              <div className="px-6 pb-6">
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Advance Request Submitted
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(supplier.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at 2:30 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Eligibility Assessment
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(supplier.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at 2:45 PM
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
                          Advance Approved
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
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
                          Advance Rejected
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
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
                        <p className="text-xs text-gray-500 mt-1">
                          Pending approval decision
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
