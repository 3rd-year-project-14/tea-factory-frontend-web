import { X } from "lucide-react";
import { useState } from "react";
import { getStatusColor, formatDate } from "./fertilizerUtils";
import Button from "../../../components/ui/Button";

export default function FertilizerRequestModal({ request, isOpen, onClose, onApprove, onReject, loading }) {
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-tea-100 dark:border-card-border-dark pb-4">
            <h2 className="text-xl font-heading font-bold text-ink dark:text-ink-dark">
              Request Details
            </h2>
            <button
              onClick={onClose}
              className="text-ink/50 dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          {request ? (
            <div className="py-4">
              {/* Request ID and Status */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-sm text-ink/50 dark:text-muted-dark">Request ID</span>
                  <h3 className="text-lg font-medium text-ink dark:text-ink-dark">{request.id}</h3>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>

              {/* Main Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-ink/50 dark:text-muted-dark">Fertilizer Type</span>
                  <p className="font-medium text-ink dark:text-ink-dark">{request.categoryName}</p>
                </div>
                <div>
                  <span className="text-sm text-ink/50 dark:text-muted-dark">Company</span>
                  <p className="font-medium text-ink dark:text-ink-dark">{request.companyName}</p>
                </div>
                <div>
                  <span className="text-sm text-ink/50 dark:text-muted-dark">Quantity</span>
                  <p className="font-medium text-ink dark:text-ink-dark">
                    {request.quantity} {request.unit || 'kg'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-ink/50 dark:text-muted-dark">Requested By</span>
                  <p className="font-medium text-ink dark:text-ink-dark">{request.userName}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mb-4">
                <span className="text-sm text-ink/50 dark:text-muted-dark">Note</span>
                <p className="p-3 bg-surface dark:bg-white/5 rounded-lg text-ink dark:text-ink-dark">
                  {request.note || "No notes provided"}
                </p>
              </div>

              {request.description && (
                <div className="mb-4">
                  <span className="text-sm text-ink/50 dark:text-muted-dark">Description</span>
                  <p className="p-3 bg-surface dark:bg-white/5 rounded-lg text-ink dark:text-ink-dark">
                    {request.description}
                  </p>
                </div>
              )}

              {request.rejectReason && (
                <div className="mb-4">
                  <span className="text-sm text-ink/50 dark:text-muted-dark">Rejection Reason</span>
                  <p className="p-3 bg-surface dark:bg-white/5 rounded-lg text-red-600 dark:text-red-400">
                    {request.rejectReason}
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-ink/50 dark:text-muted-dark">
                <div>
                  <span>Created: {formatDate(request.createdAt)}</span>
                </div>
                <div>
                  <span>Last Updated: {formatDate(request.updatedAt)}</span>
                </div>
              </div>

              {/* Actions */}
              {request.status === "PENDING" && (
                <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-tea-100 dark:border-card-border-dark">
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="danger"
                      className="!bg-transparent !border !border-red-500 !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20"
                      onClick={() => setShowRejectBox((prev) => !prev)}
                      disabled={loading}
                    >
                      {loading === "reject" ? "Rejecting..." : "Reject"}
                    </Button>
                    <Button
                      variant="primary"
                      className="!bg-green-600 hover:!bg-green-700"
                      onClick={() => onApprove(request.id)}
                      disabled={loading}
                    >
                      {loading === "approve" ? "Approving..." : "Approve"}
                    </Button>
                  </div>
                  {showRejectBox && (
                    <div className="mt-2 flex flex-col items-end gap-2">
                      <input
                        type="text"
                        className="w-full border border-red-300 dark:border-red-500/40 rounded-lg p-2 bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-red-400/40"
                        placeholder="Enter reject reason..."
                        value={rejectReason}
                        onChange={e => setRejectReason(e.target.value)}
                        disabled={loading}
                      />
                      <Button
                        variant="danger"
                        onClick={() => onReject(request.id, rejectReason)}
                        disabled={loading || !rejectReason.trim()}
                      >
                        Confirm Reject
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 text-center text-ink/60 dark:text-muted-dark">Request not found</div>
          )}
        </div>
      </div>
    </div>
  );
}
