import React, { useState } from "react";
import {
  Check,
  X,
  Clock,
  Package,
  User,
  Calendar,
} from "lucide-react";

const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";

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
      prev.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
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
    setRejectReason("");
    setRejectingId(null);
    setShowRejectModal(false);
  };

  const cancelReject = () => {
    setShowRejectModal(false);
    setRejectingId(null);
    setRejectReason("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#fefce8] text-[#854d0e] border-yellow-200";
      case "approved":
        return "bg-[#e1f4ef] text-[#165E52] border-[#cfece6]";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <Check className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const processedRequests = requests.filter((req) => req.status !== "pending");

  // All cards: remove green border by setting border to transparent and width to 1px
  const cardStyle = {
    borderColor: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
            Fertilizer Requests
          </h1>
          <p className="text-gray-600">
            Review and approve fertilizer requests from suppliers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm transition-colors hover:bg-gray-50 ring-2 ring-[#165E52] flex items-center border" style={cardStyle}>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-[#165E52]">{pendingRequests.length}</p>
                <p className="text-xs text-gray-500">Awaiting Action</p>
              </div>
              <Clock className="w-6 h-6 text-black" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm transition-colors hover:bg-gray-50 ring-2 ring-[#165E52] flex items-center border" style={cardStyle}>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-[#165E52]">
                  {requests.filter((r) => r.status === "approved").length}
                </p>
                <p className="text-xs text-gray-500">Processed</p>
              </div>
              <Check className="w-6 h-6 text-black" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm transition-colors hover:bg-gray-50 ring-2 ring-[#165E52] flex items-center border" style={cardStyle}>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-[#165E52]">{requests.length}</p>
                <p className="text-xs text-gray-500">All Time</p>
              </div>
              <Package className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        {/* Pending Requests List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: ACCENT_COLOR }}>
            Pending Requests
          </h2>
          <div className="bg-white rounded-lg shadow-sm border" style={cardStyle}>
            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No pending requests at the moment</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex gap-6 mb-2 text-gray-700">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-gray-400" />
                            {req.supplier}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {req.requestDate}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                          <div>
                            <p className="font-medium text-gray-600">Fertilizer Type</p>
                            <p className="text-gray-800">{req.fertilizerType}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-600">Quantity</p>
                            <p className="text-gray-800">
                              {req.quantity.toLocaleString()} {req.unit}
                            </p>
                          </div>
                        </div>
                        {req.notes && (
                          <div className="text-sm mt-1">
                            <p className="font-medium text-gray-600">Notes</p>
                            <p className="text-gray-700">{req.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleReject(req.id)}
                          className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-[#165E52] border border-[#165E52] rounded-lg hover:bg-[#144d45] flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-transparent"
              style={{ borderWidth: "1px" }}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-red-700">
                <X className="w-5 h-5" /> Reject Request
              </h3>
              <p className="text-sm text-gray-600 mb-3">Please provide a reason:</p>
              <textarea
                className="w-full border-gray-300 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason..."
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={cancelReject}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  disabled={!rejectReason.trim()}
                  className={`px-4 py-2 text-white rounded-lg ${
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
            Recent Processed Requests
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-transparent" style={{ borderWidth: "1px" }}>
            <div className="divide-y divide-gray-200">
              {processedRequests.map((req) => (
                <div key={req.id} className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {req.supplier}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {req.requestDate}
                    </div>
                    <div
                      className={`px-3 py-1 text-xs font-medium rounded-full border flex items-center gap-2 ${getStatusColor(
                        req.status
                      )}`}
                    >
                      {getStatusIcon(req.status)}
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Fertilizer Type</p>
                      <p className="text-gray-800">{req.fertilizerType}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Quantity</p>
                      <p className="text-gray-800">
                        {req.quantity.toLocaleString()} {req.unit}
                      </p>
                    </div>
                  </div>
                  {req.notes && (
                    <div className="text-sm mt-3">
                      <p className="font-medium text-gray-600">Notes</p>
                      <p className="text-gray-700">{req.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRequestsPage;
