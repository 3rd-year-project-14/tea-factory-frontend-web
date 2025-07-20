import React, { useEffect } from "react";
import { Check, X } from "lucide-react";
import { useRoutes } from "../../../../../data/useRoutes";
import axios from "axios";

export default function ApprovalModal({
  show,
  onClose,
  supplier,
  approvalData,
  setApprovalData,
  onApproveSupplierRequest,
}) {
  const { routes, loading, error } = useRoutes();
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
    if (
      !approvalData.route ||
      !approvalData.bagLimit ||
      isNaN(Number(approvalData.bagLimit)) ||
      Number(approvalData.bagLimit) <= 0
    )
      return;
    const bagLimitNum = Number(approvalData.bagLimit);
    try {
      const params = { routeId: approvalData.route };
      if (bagLimitNum > 0) {
        params.initialBagCount = bagLimitNum;
      }
      await axios.post(
        `http://localhost:8080/api/supplier-requests/${supplier.id}/approve`,
        null,
        { params }
      );
      // Optionally call onApproveSupplierRequest for local state update
      if (onApproveSupplierRequest) {
        onApproveSupplierRequest(supplier.id, approvalData.route, bagLimitNum);
      }
      // Close modal and go back to pending suppliers
      if (onClose) onClose();
      if (window.history && window.history.length > 1) {
        window.history.back();
      }
    } catch (error) {
      console.error("Error approving supplier request:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30 overflow-hidden">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-emerald-300">
        <div className="p-6 border-b border-emerald-300 bg-emerald-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Approve Supplier Registration
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-emerald-900 mb-2">
              Supplier Information
            </h3>
            <p className="text-sm text-emerald-700">
              {supplier.user.name} - {supplier.user.address}
            </p>
            <p className="text-sm text-emerald-700">
              Expected Supply: {supplier.monthlySupply} Kg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Assign Route *
              </label>
              <select
                className="border border-emerald-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={approvalData.route}
                onChange={(e) =>
                  setApprovalData({
                    ...approvalData,
                    route: e.target.value,
                  })
                }
              >
                <option value="">Select Route</option>
                {loading && <option disabled>Loading routes...</option>}
                {error && <option disabled>Error loading routes</option>}
                {routes &&
                  Array.isArray(routes) &&
                  routes.map((route) => (
                    <option
                      key={route.routeId || route._id || route.name}
                      value={route.routeId || route._id || route.name}
                    >
                      {route.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Initial Bag Limit *
              </label>
              <input
                type="number"
                min={1}
                className="border border-emerald-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., 50"
                value={approvalData.bagLimit > 0 ? approvalData.bagLimit : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  // Only set if valid number and > 0
                  setApprovalData({
                    ...approvalData,
                    bagLimit: val !== "" && Number(val) > 0 ? Number(val) : "",
                  });
                }}
              />
            </div>

            
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
            className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleConfirm}
            disabled={
              !approvalData.route ||
              !approvalData.bagLimit ||
              approvalData.bagLimit <= 0 ||
              isNaN(approvalData.bagLimit)
            }
          >
            Confirm Approval
          </button>
        </div>
      </div>
    </div>
  );
}
