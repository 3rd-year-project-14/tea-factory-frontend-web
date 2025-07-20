import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function RejectionModal({
  show,
  onClose,
  supplier,
  rejectionReason,
  setRejectionReason,
  onRejectSupplierRequest,
}) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) return null;

  const handleConfirm = async () => {
    if (!rejectionReason.trim()) return;
    await onRejectSupplierRequest(supplier.id, rejectionReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30 overflow-hidden">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-emerald-300">
        <div className="p-6 border-b border-emerald-300 bg-emerald-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Reject Supplier Registration
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-red-900 mb-2">Confirm Rejection</h3>
            <p className="text-sm text-red-700">
              Are you sure you want to reject the registration request from{" "}
              <strong>{supplier.name}</strong>?
            </p>
            <p className="text-sm text-red-600 mt-2">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Reason for Rejection *
            </label>
            <textarea
              className="border border-emerald-300 rounded-lg px-3 py-2 text-sm min-h-[120px] resize-y focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Please provide a clear reason for rejection. This will be communicated to the supplier."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex gap-3 justify-end p-6 border-t border-emerald-300 bg-emerald-50">
          <button
            className="px-6 py-2 border-2 border-emerald-300 rounded-lg text-emerald-700 bg-emerald-50 font-medium hover:bg-emerald-100 hover:border-emerald-400 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleConfirm}
            disabled={!rejectionReason.trim()}
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}
