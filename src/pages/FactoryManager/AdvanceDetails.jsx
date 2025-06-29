import React, { useState } from "react";
import AdvanceChart from "../../components/charts/AdvanceChart";

export default function SupplierRequestDetails({ supplier, onBack }) {
  // Modal state (must be before any return)
  const [showApproval, setShowApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);

  if (!supplier) return null;
  let statusText = "";

  if (supplier.status === "pending") {
    statusText = "Pending";
  } else if (supplier.status === "approved") {
    statusText = "Approved";
  } else {
    statusText = "Rejected";
  }

  // Modal close handlers
  const closeApproval = () => setShowApproval(false);
  const closeRejection = () => setShowRejection(false);

  // Dummy handlers for confirm
  const approveSupplier = () => {
    // TODO: handle approval logic
    closeApproval();
  };
  const rejectSupplier = () => {
    // TODO: handle rejection logic
    closeRejection();
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 text-[#1e293b] font-sans flex flex-col overflow-hidden">
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
                onClick={approveSupplier}
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
                onClick={rejectSupplier}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 mb-6 shadow flex-shrink-0 sticky top-0 z-30">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a] mb-2">
              {supplier.name}
            </h1>
            <div className="flex gap-6 mt-4">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide">
                  Supplier ID
                </span>
                <span className="text-sm font-semibold text-[#0f172a] mt-1">{`${supplier.id}`}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide">
                  Submitted
                </span>
                <span className="text-sm font-semibold text-[#0f172a] mt-1">
                  June 8, 2025
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide">
                  Status
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-wide mt-1 ${
                    supplier.status === "pending"
                      ? "text-[#92400e]"
                      : supplier.status === "approved"
                      ? "text-[#065f46]"
                      : "text-[#991b1b]"
                  }`}
                >
                  {statusText}
                </span>
              </div>
            </div>
          </div>
          {/* Action buttons and Back always in header */}
          <div className="flex gap-3 items-center">
            {supplier.status === "pending" && (
              <>
                <button
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#10b981] text-white hover:bg-[#059669]"
                  onClick={() => setShowApproval(true)}
                >
                  ✓ Approve
                </button>
                <button
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#ef4444] text-white hover:bg-[#dc2626]"
                  onClick={() => setShowRejection(true)}
                >
                  ✗ Reject
                </button>
              </>
            )}
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#f1f5f9] text-[#000] border-none hover:bg-[#e2e8f0] ml-2"
            >
              ← Back to Requests
            </button>
          </div>
        </div>
      </div>
      {/* Content Grid (scrollable area) */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Advance Request Details */}
        <div className="bg-white shadow overflow-hidden mb-6 rounded border border-[#94a3b8]">
          <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
            <h2 className="text-lg font-bold text-[#0f172a] mb-2">
              Advance Request Details
            </h2>
          </div>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              {/* Eligibility on the left, centered */}
              <div className="flex flex-col items-center justify-center md:row-span-full md:h-full">
                <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                  ELIGIBILITY
                </span>
                <span
                  className={`text-xl font-bold text-[#0f172a] ${
                    supplier.eligibility === "PASS"
                      ? "text-[#10b981]"
                      : "text-[#ef4444]"
                  }`}
                >
                  {supplier.eligibility}
                </span>
              </div>
              {/* Other details */}
              <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    REQUESTED AMOUNT
                  </span>
                  <span className="text-base font-bold text-[#0f172a]">
                    Rs. {supplier.amount}
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
                    THIS MONTH WEIGHT
                  </span>
                  <span className="text-base font-bold text-[#0f172a]">
                    {supplier.this_weight}Kg
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    EXITING LOANS
                  </span>
                  <span className="text-base font-bold text-[#0f172a]">
                    Rs. {supplier.loans}
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
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                    THIS MONTH INCOME
                  </span>
                  <span className="text-base font-bold text-[#0f172a]">
                    Rs. {supplier.this_income}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Chart and Timeline below Advance Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Supply Performance */}
          <div className="bg-white shadow overflow-hidden rounded border border-[#94a3b8]">
            <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
              <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                Monthly Supply Performance
              </h2>
            </div>
            <div className="px-6 pb-6">
              <AdvanceChart />
            </div>
          </div>
          {/* Activity Timeline */}
          <div className="bg-white shadow overflow-hidden rounded border border-[#94a3b8]">
            <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">
                Activity Timeline
              </h3>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col">
                <div className="flex gap-3 py-4 border-b border-[#f1f5f9]">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9ff] flex items-center justify-center text-lg">
                    📝
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#0f172a] mb-1">
                      Application Submitted
                    </div>
                    <div className="text-xs text-[#64748b] mb-1">
                      Supplier submitted registration request
                    </div>
                    <div className="text-xs text-[#94a3b8]">
                      June 8, 2025 at 2:30 PM
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 py-4 border-b border-[#f1f5f9]">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9ff] flex items-center justify-center text-lg">
                    📋
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#0f172a] mb-1">
                      Documents Uploaded
                    </div>
                    <div className="text-xs text-[#64748b] mb-1">
                      All required documents submitted
                    </div>
                    <div className="text-xs text-[#94a3b8]">
                      June 8, 2025 at 2:35 PM
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 py-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9ff] flex items-center justify-center text-lg">
                    👁️
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#0f172a] mb-1">
                      Under Review
                    </div>
                    <div className="text-xs text-[#64748b] mb-1">
                      Application is being reviewed by manager
                    </div>
                    <div className="text-xs text-[#94a3b8]">
                      June 9, 2025 at 9:00 AM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
