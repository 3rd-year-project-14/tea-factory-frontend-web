import React from "react";

export default function SupplierRequestDetails({ supplier, onBack }) {
  if (!supplier) return null;
  let statusText = "";
  return (
    <div className="max-w-[1200px] mx-auto p-6 text-[#1e293b] font-sans flex flex-col overflow-hidden">
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
                  Request ID
                </span>
                <span className="text-sm font-semibold text-[#0f172a] mt-1">{`REQ-2025-00${supplier.id}`}</span>
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
                <button className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#10b981] text-white hover:bg-[#059669]">
                  ✓ Approve
                </button>
                <button className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#ef4444] text-white hover:bg-[#dc2626]">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 flex flex-col gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="p-6 pb-0 border-b border-[#f1f5f9] mb-6">
                <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                  Personal Information
                </h2>
              </div>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Full Name
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      {supplier.name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      NIC Number
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      {supplier.nic}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Date of Birth
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      December 15, 1995
                    </span>
                    <span className="text-xs text-[#64748b] mt-1">
                      29 years old
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Mobile Number
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      +94 77 123 4567
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Email Address
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      kamal.perera@email.com
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Address
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      123, Galle Road
                    </span>
                    <span className="text-xs text-[#64748b] mt-1">
                      Maharagama, Colombo
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Land Information */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="p-6 pb-0 border-b border-[#f1f5f9] mb-6">
                <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                  Land Information
                </h2>
              </div>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Land Size
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      2.5 acres
                    </span>
                    <span className="text-xs text-[#64748b] mt-1">
                      1.01 hectares
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Land Location
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Maharagama
                    </span>
                    <span className="text-xs text-[#64748b] mt-1">Colombo</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Factory
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Maharagama Estate
                    </span>
                    <span className="text-xs text-[#64748b] mt-1">Colombo</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Estimated Monthly Supply
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      500 kg
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Requested Route
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Nugegoda-Maharagama
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Pickup Location
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Maharagama Bus stand
                    </span>
                    <span className="text-xs text-[#64748b] mt-1">Colombo</span>
                  </div>
                </div>
                <div className="h-[120px] bg-[#f1f5f9] rounded-xl flex items-center justify-center text-[#94a3b8] text-base mt-4">
                  Interactive Map View of Land Location
                </div>
                <div className="h-[120px] bg-[#f1f5f9] rounded-xl flex items-center justify-center text-[#94a3b8] text-base mt-4">
                  Interactive Map View of Pickup Location
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Documents */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="p-6 pb-0 border-b border-[#f1f5f9] mb-6">
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">
                  Submitted Documents
                </h3>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg">
                      📄
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#0f172a] mb-1">
                        NIC Copy
                      </div>
                      <div className="text-xs text-[#64748b]">PDF • 2.3 MB</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-[#f0fdf4] text-[#166534] hover:bg-[#dcfce7]">
                        👁️
                      </button>
                      <button className="p-2 rounded-lg bg-[#f0f9ff] text-[#0369a1] hover:bg-[#e0f2fe]">
                        ⬇️
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg">
                      🏡
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#0f172a] mb-1">
                        Land Ownership Deed
                      </div>
                      <div className="text-xs text-[#64748b]">PDF • 4.1 MB</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-[#f0fdf4] text-[#166534] hover:bg-[#dcfce7]">
                        👁️
                      </button>
                      <button className="p-2 rounded-lg bg-[#f0f9ff] text-[#0369a1] hover:bg-[#e0f2fe]">
                        ⬇️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Activity Timeline */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="p-6 pb-0 border-b border-[#f1f5f9] mb-6">
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
            {/* Banking & Financial Information */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="p-6 pb-0 border-b border-[#f1f5f9] mb-6">
                <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                  Banking & Financial Information
                </h2>
              </div>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Row 1 */}
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Bank Name
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Commercial Bank
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Account Holder
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Kamal Perera
                    </span>
                  </div>
                  {/* Row 2 */}
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Account Number
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      8001234567
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                      Branch
                    </span>
                    <span className="text-base font-bold text-[#0f172a]">
                      Maharagama Branch
                    </span>
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
