import React, { useState } from "react";
import {
  Check,
  X,
  Clock,
  Package,
  User,
  Calendar,
} from "lucide-react";

// Theme Constants
const ACCENT_COLOR = "#165E52";

const FertilizerRequestsPage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      supplier: "GreenGrow Supplies",
      fertilizerType: "Nitrogen (NPK 20-10-10)",
      quantity: 500,
      unit: "kg",
      requestDate: "2024-07-01",
      status: "pending",
      notes: "Urgent request for upcoming planting season",
    },
    {
      id: 2,
      supplier: "AgroTech Industries",
      fertilizerType: "Phosphorus (NPK 10-20-10)",
      quantity: 750,
      unit: "kg",
      requestDate: "2024-07-02",
      status: "pending",
      notes: "Standard monthly order",
    },
    {
      id: 3,
      supplier: "FarmCorp Solutions",
      fertilizerType: "Potassium (NPK 10-10-20)",
      quantity: 300,
      unit: "kg",
      requestDate: "2024-07-03",
      status: "pending",
      notes: "Special blend for citrus crops",
    },
    {
      id: 4,
      supplier: "BioNutrients Ltd",
      fertilizerType: "Organic Compost",
      quantity: 1000,
      unit: "kg",
      requestDate: "2024-06-30",
      status: "approved",
      notes: "Certified organic for premium crops",
    },
    {
      id: 5,
      supplier: "ChemAgri Corp",
      fertilizerType: "Urea (46% N)",
      quantity: 200,
      unit: "kg",
      requestDate: "2024-06-29",
      status: "rejected",
      notes: "Quality concerns with previous batch",
    },
  ]);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState(null);

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
  };

  const handleReject = (id) => {
    setRejectingId(id);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) return;
    setRequests((prev) =>
      prev.map((req) =>
        req.id === rejectingId
          ? { ...req, status: "rejected", rejectReason }
          : req
      )
    );
    setRejectingId(null);
    setRejectReason("");
    setShowRejectModal(false);
  };

  const cancelReject = () => {
    setRejectingId(null);
    setRejectReason("");
    setShowRejectModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#fefce8] text-[#854d0e] border border-yellow-200";
      case "approved":
        return "bg-[#e1f4ef] text-[#165E52] border border-[#cfece6]";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const processedRequests = requests.filter((r) => r.status !== "pending");

  // Summary Cards Styled like SupplierSummaryCards
  const summaryCards = [
    {
      type: "pending",
      label: "Pending Requests",
      value: pendingRequests.length,
      icon: <Clock size={30} color="black" />,
      border: "#f59e0b",
      ring: "ring-2 ring-[#f59e0b]/30",
    },
    {
      type: "approved",
      label: "Approved",
      value: requests.filter((r) => r.status === "approved").length,
      icon: <Check size={30} color="black" />,
      border: "#000000",
      ring: "",
    },
    {
      type: "total",
      label: "Total Requests",
      value: requests.length,
      icon: <Package size={30} color="black" />,
      border: "#d1d5db",
      ring: "",
    },
  ];

  // ----------- HEADER DESIGN ADDED BELOW --------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Modern Header Design */}
        <div className="bg-white p-5 shadow-md  mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-4xl font-bold mb-2 tracking-tight"
              style={{ color: ACCENT_COLOR }}
            >
              Fertilizer Requests
            </h1>
           
          </div>
          {/* Optionally, you can add a quick action/button to the header */}
          {/* <button
            className="mt-4 sm:mt-0 px-6 py-2 rounded text-white font-medium shadow bg-[#165E52] hover:bg-[#144d45] transition"
          >
            New Request
          </button> */}
        </div>

        {/* ====== Summary Cards Section ====== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className={`bg-white p-6 rounded-lg shadow-md transition-transform ${
                card.ring ? "hover:scale-[1.01]" : ""
              } ${card.ring}`}
              style={{ border: `1px solid ${card.border}` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">{card.label}</p>
                  <p className="text-2xl font-bold text-black">{card.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Requests Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: ACCENT_COLOR }}>
            Pending Requests
          </h2>
          <div className="bg-white rounded-lg shadow-sm border">
            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Package className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                No pending requests
              </div>
            ) : (
              <div className="divide-y">
                {pendingRequests.map((r) => (
                  <div key={r.id} className="p-6 space-y-2">
                    <div className="flex flex-wrap items-center justify-between text-gray-700 mb-2">
                      <div className="flex gap-6 text-sm">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {r.supplier}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {r.requestDate}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReject(r.id)}
                          className="text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-md text-sm"
                        >
                          <X className="w-4 h-4 inline mr-1" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove(r.id)}
                          className="bg-[#01251F] text-white hover:bg-[#144d45] px-4 py-2 rounded-md text-sm"
                        >
                          <Check className="w-4 h-4 inline mr-1" />
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 text-sm gap-4">
                      <div>
                        <p className="text-gray-500 font-medium">Fertilizer Type</p>
                        <p>{r.fertilizerType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Quantity</p>
                        <p>
                          {r.quantity} {r.unit}
                        </p>
                      </div>
                    </div>
                    {r.notes && (
                      <div className="text-sm mt-2">
                        <p className="text-gray-500 font-medium">Notes</p>
                        <p>{r.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-[#eee]">
              <h3 className="text-lg font-semibold mb-3 text-red-700 flex items-center gap-2">
                <X className="w-5 h-5" />
                Reject Request
              </h3>
              <label className="block text-sm text-gray-600 mb-1">
                Enter reason
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-red-500"
                rows="3"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={cancelReject}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  disabled={!rejectReason.trim()}
                  className={`px-4 py-2 text-white rounded ${
                    rejectReason.trim()
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-300 cursor-not-allowed"
                  }`}
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Processed Requests */}
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: ACCENT_COLOR }}>
            Processed Requests
          </h2>
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {processedRequests.map((r) => (
              <div key={r.id} className="p-6 space-y-3">
                <div className="flex flex-wrap justify-between items-center text-sm text-gray-700">
                  <div className="flex gap-5 items-center">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />{r.supplier}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />{r.requestDate}
                    </span>
                    <span className={`flex gap-2 items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(r.status)}`}>
                      {getStatusIcon(r.status)}
                      {r.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 font-medium">Fertilizer Type</p>
                    <p>{r.fertilizerType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Quantity</p>
                    <p>{r.quantity} {r.unit}</p>
                  </div>
                </div>
                {r.notes && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Notes</p>
                    <p className="text-sm">{r.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRequestsPage;
