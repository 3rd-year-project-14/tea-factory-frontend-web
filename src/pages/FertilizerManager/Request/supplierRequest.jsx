import React, { useState, useEffect } from "react";
import {
  Check,
  X,
  Clock,
  Package,
  User,
  Calendar,
  Eye,
} from "lucide-react";
import { getAllSupplierFertilizerRequests } from '../../../api/fertilizerManager';
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";

const FertilizerRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedFertilizers, setSelectedFertilizers] = useState([]);

  useEffect(() => {
    // Fetch supplier requests from backend
    const fetchRequests = async () => {
      try {
        const data = await getAllSupplierFertilizerRequests();
        // Map backend response to frontend format
        const mapped = data.map(req => ({
          id: req.id,
          supplierId: req.supplierId,
          supplier: req.supplierName,
          fertilizers: req.items?.map(item => ({
            id: item.id,
            type: item.productName,
            quantity: item.quantity,
            unit: item.unit || 'kg',
            status: item.status,
            rejectReason: item.rejectReason,
          })) || [],
          requestDate: req.requestDate,
          status: req.status,
          notes: req.note,
          rejectReason: req.rejectReason,
        }));
        setRequests(mapped);
      } catch (err) {
        setRequests([]);
      }
    };
    fetchRequests();
  }, []);

  const handleView = (request) => {
    setSelectedRequest(request);
    // Initialize with all fertilizer IDs selected
    setSelectedFertilizers(request.fertilizers.map(f => f.id));
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setSelectedRequest(null);
    setSelectedFertilizers([]);
    setShowViewModal(false);
  };

  const toggleFertilizerSelection = (fertilizerId) => {
    setSelectedFertilizers((prev) => {
      if (prev.includes(fertilizerId)) {
        return prev.filter((id) => id !== fertilizerId);
      } else {
        return [...prev, fertilizerId];
      }
    });
  };

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
        return "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-500/30";
      case "approved":
        return "bg-tea-50 text-tea-700 border border-tea-100 dark:bg-tea-900/30 dark:text-tea-200 dark:border-tea-500/30";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500/30";
      default:
        return "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-ink-dark";
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

  // Summary Cards Styled like SupplierSummaryCards
  const summaryCards = [
    {
      type: "pending",
      label: "Pending Requests",
      value: pendingRequests.length,
      icon: Clock,
      iconClass: "text-amber-600 dark:text-amber-400",
      borderClass: "border-amber-500 dark:border-amber-500",
    },
    {
      type: "approved",
      label: "Approved",
      value: requests.filter((r) => r.status === "approved").length,
      icon: Check,
      iconClass: "text-tea-700 dark:text-tea-300",
      borderClass: "border-tea-100 dark:border-card-border-dark",
    },
    {
      type: "total",
      label: "Total Requests",
      value: requests.length,
      icon: Package,
      iconClass: "text-ink/70 dark:text-ink-dark/70",
      borderClass: "border-tea-100 dark:border-card-border-dark",
    },
  ];

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
          Fertilizer Requests
        </h1>
      </Card>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summaryCards.map((card) => (
          <Card key={card.label} hoverable className={`!border ${card.borderClass}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{card.label}</p>
                <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{card.value}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-tea-50 dark:bg-tea-900/30 flex items-center justify-center shrink-0">
                <card.icon size={24} className={card.iconClass} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* All Requests Table */}
      <div>
        <h2 className="text-xl font-heading font-semibold mb-4 text-tea-700 dark:text-tea-300">
          Fertilizer Requests
        </h2>
        <Card className="!p-0 overflow-hidden">
          {requests.length === 0 ? (
            <EmptyState icon={Package} title="No requests found" description="" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-tea-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Supplier ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Supplier Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Fertilizers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Request Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Request Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tea-100 dark:divide-card-border-dark">
                  {requests.map((r) => (
                    <tr key={r.id} className="hover:bg-tea-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/80 dark:text-ink-dark/80">
                        {r.supplierId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink dark:text-ink-dark">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-ink/40 dark:text-muted-dark" />
                          {r.supplier}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink/80 dark:text-ink-dark/80">
                        <div className="flex flex-col gap-1">
                          {r.fertilizers.slice(0, 2).map((fert, idx) => (
                            <span key={idx} className="text-xs">
                              • {fert.type}
                            </span>
                          ))}
                          {r.fertilizers.length > 2 && (
                            <span className="text-xs text-ink/50 dark:text-muted-dark italic">
                              +{r.fertilizers.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink dark:text-ink-dark">
                        <span className="font-semibold">{r.fertilizers.length}</span> item{r.fertilizers.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/80 dark:text-ink-dark/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-ink/40 dark:text-muted-dark" />
                          {r.requestDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(r.status)}`}>
                          {getStatusIcon(r.status)}
                          {r.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Button variant="primary" size="sm" icon={Eye} onClick={() => handleView(r)} title="View Request Details">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* View Request Modal */}
      {showViewModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 max-w-2xl w-full shadow-card border border-tea-100 dark:border-card-border-dark max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading font-semibold text-ink dark:text-ink-dark flex items-center gap-2">
                <Package className="w-6 h-6 text-tea-700 dark:text-tea-300" />
                Request Details
              </h3>
              <button
                onClick={closeViewModal}
                className="text-ink/40 dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Supplier Name */}
              <div className="bg-surface dark:bg-white/5 p-4 rounded-lg border border-tea-100 dark:border-card-border-dark">
                <p className="text-xs text-ink/50 dark:text-muted-dark font-medium mb-2">Supplier Name</p>
                <p className="text-lg font-semibold text-ink dark:text-ink-dark flex items-center gap-2">
                  <User className="w-5 h-5 text-tea-700 dark:text-tea-300" />
                  {selectedRequest.supplier}
                </p>
              </div>

              {/* Request ID */}
              <div className="bg-surface dark:bg-white/5 p-4 rounded-lg border border-tea-100 dark:border-card-border-dark">
                <p className="text-xs text-ink/50 dark:text-muted-dark font-medium mb-2">Request ID</p>
                <p className="text-lg font-semibold text-ink dark:text-ink-dark">
                  #{selectedRequest.id.toString().padStart(4, '0')}
                </p>
              </div>

              {/* Requested Fertilizers */}
              <div className="border border-tea-100 dark:border-card-border-dark rounded-lg p-4">
                <p className="text-sm font-semibold text-ink dark:text-ink-dark mb-4">
                  Requested Fertilizers ({selectedRequest.fertilizers.length})
                </p>
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {selectedRequest.fertilizers.map((fertilizer) => (
                    <label
                      key={fertilizer.id}
                      className="flex items-start gap-3 p-3 bg-surface dark:bg-white/5 rounded-lg hover:bg-tea-50 dark:hover:bg-white/10 cursor-pointer transition-colors border border-transparent hover:border-tea-600 dark:hover:border-tea-500"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFertilizers.includes(fertilizer.id)}
                        onChange={() => toggleFertilizerSelection(fertilizer.id)}
                        className="mt-1 w-5 h-5 rounded border-tea-100 dark:border-card-border-dark text-tea-700 focus:ring-tea-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink dark:text-ink-dark">
                          {fertilizer.type}
                        </p>
                        <p className="text-xs text-ink/50 dark:text-muted-dark mt-1">
                          Quantity: <span className="font-semibold">{fertilizer.quantity} {fertilizer.unit}</span>
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface dark:bg-white/5 p-3 rounded-lg">
                  <p className="text-xs text-ink/50 dark:text-muted-dark font-medium mb-1">Request Date</p>
                  <p className="text-sm text-ink dark:text-ink-dark flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-ink/40 dark:text-muted-dark" />
                    {selectedRequest.requestDate}
                  </p>
                </div>
                <div className="bg-surface dark:bg-white/5 p-3 rounded-lg">
                  <p className="text-xs text-ink/50 dark:text-muted-dark font-medium mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                    {getStatusIcon(selectedRequest.status)}
                    {selectedRequest.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {selectedRequest.rejectReason && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-2">Rejection Reason</p>
                  <p className="text-sm text-ink/80 dark:text-ink-dark/80">
                    {selectedRequest.rejectReason}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-tea-100 dark:border-card-border-dark">
              {selectedRequest.status?.toLowerCase() === "pending" && (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    className="!bg-red-50 !text-red-700 dark:!bg-red-900/20 dark:!text-red-300 hover:!bg-red-100"
                    icon={X}
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      closeViewModal();
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Check}
                    onClick={() => {
                      handleApprove(selectedRequest.id);
                      closeViewModal();
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" className="!bg-gray-200 dark:!bg-white/10" onClick={closeViewModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 max-w-md w-full shadow-card border border-tea-100 dark:border-card-border-dark">
            <h3 className="text-lg font-heading font-semibold mb-3 text-red-700 dark:text-red-400 flex items-center gap-2">
              <X className="w-5 h-5" />
              Reject Request
            </h3>
            <label className="block text-sm text-ink/60 dark:text-muted-dark mb-1">
              Enter reason
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark p-2 focus:outline-none focus:ring-2 focus:ring-red-400/40"
              rows="3"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" className="!bg-gray-200 dark:!bg-white/10" onClick={cancelReject}>
                Cancel
              </Button>
              <Button
                variant="danger"
                disabled={!rejectReason.trim()}
                onClick={confirmReject}
              >
                Confirm Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerRequestsPage;
