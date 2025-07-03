import React, { useState } from "react";
import { Check, X, Clock, Package, User, Calendar } from "lucide-react";

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

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "rejected" } : request
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fertilizer Requests
          </h1>
          <p className="text-gray-600">
            Review and approve fertilizer requests from suppliers
          </p>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Requests
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingRequests.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Approved Today
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {requests.filter((req) => req.status === "approved").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pending Requests
          </h2>
          <div className="bg-white rounded-lg shadow-sm border">
            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No pending requests at the moment</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {request.supplier}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {request.requestDate}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Fertilizer Type
                            </p>
                            <p className="text-gray-900">
                              {request.fertilizerType}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Quantity
                            </p>
                            <p className="text-gray-900">
                              {request.quantity.toLocaleString()} {request.unit}
                            </p>
                          </div>
                        </div>
                        {request.notes && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700">
                              Notes
                            </p>
                            <p className="text-gray-600">{request.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 ml-6">
                        <button
                          onClick={() => handleReject(request.id)}
                          className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
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
        {/* Processed Requests Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Processed Requests
          </h2>
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="divide-y divide-gray-200">
              {processedRequests.map((request) => (
                <div key={request.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {request.supplier}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {request.requestDate}
                          </span>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {getStatusIcon(request.status)}
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Fertilizer Type
                          </p>
                          <p className="text-gray-900">
                            {request.fertilizerType}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Quantity
                          </p>
                          <p className="text-gray-900">
                            {request.quantity.toLocaleString()} {request.unit}
                          </p>
                        </div>
                      </div>
                      {request.notes && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700">
                            Notes
                          </p>
                          <p className="text-gray-600">{request.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
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
