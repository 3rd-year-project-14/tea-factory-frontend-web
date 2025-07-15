import React from "react";
import { Check, X } from "lucide-react";

export default function ApprovalModal({
  show,
  onClose,
  supplier,
  approvalData,
  setApprovalData,
  onConfirm,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Approve Supplier Registration
            </h2>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">
              Supplier Information
            </h3>
            <p className="text-sm text-blue-700">
              {supplier.name} - {supplier.location}
            </p>
            <p className="text-sm text-blue-700">
              Expected Supply: {supplier.supply}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Assign Route *
              </label>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={approvalData.route}
                onChange={(e) =>
                  setApprovalData({
                    ...approvalData,
                    route: e.target.value,
                  })
                }
              >
                <option value="">Select Route</option>
                <option value="route1">Route A-01 (Colombo North)</option>
                <option value="route2">Route B-02 (Colombo South)</option>
                <option value="route3">Route C-03 (Colombo East)</option>
                <option value="route4">Route D-04 (Colombo West)</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Supplier ID
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
                value={`SUP-2025-00${supplier.id}`}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Initial Bag Limit *
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 50"
                value={approvalData.bagLimit}
                onChange={(e) =>
                  setApprovalData({
                    ...approvalData,
                    bagLimit: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Manager Notes (Internal)
              </label>
              <textarea
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[100px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any internal notes about this supplier approval..."
                value={approvalData.notes}
                onChange={(e) =>
                  setApprovalData({
                    ...approvalData,
                    notes: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            className="px-6 py-2 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 border border-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={!approvalData.route || !approvalData.bagLimit}
          >
            Confirm Approval
          </button>
        </div>
      </div>
    </div>
  );
}
