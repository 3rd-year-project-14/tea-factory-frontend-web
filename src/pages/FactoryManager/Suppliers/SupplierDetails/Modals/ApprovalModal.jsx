import React, { useEffect } from "react";
import { Check } from "lucide-react";
import { useRoutes } from "../../../../../data/useRoutes";
import axios from "axios";


// Design Colors
const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";


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
    document.body.style.overflow = show ? "hidden" : "unset";
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


      if (onApproveSupplierRequest) {
        onApproveSupplierRequest(supplier.id, approvalData.route, bagLimitNum);
      }


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
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border"
        style={{ borderColor: BORDER_COLOR }}
      >
        {/* Header */}
        <div
          className="p-6 border-b flex items-center space-x-3"
          style={{ borderColor: BORDER_COLOR, backgroundColor: HEADER_BG }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e1f4ef" }}>
            <Check className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
          </div>
          <h2
            className="text-xl font-semibold"
            style={{ color: ACCENT_COLOR }}
          >
            Approve Supplier Registration
          </h2>
        </div>


        {/* Body */}
        <div className="p-6">
          <div
            className="border rounded-lg p-4 mb-6"
            style={{ backgroundColor: "#f0faf7", borderColor: BORDER_COLOR }}
          >
            <h3 className="font-medium mb-2" style={{ color: ACCENT_COLOR }}>
              Supplier Information
            </h3>
            <p className="text-sm text-gray-700">
              {supplier.user.name} - {supplier.user.address}
            </p>
            <p className="text-sm text-gray-700">
              Expected Supply: {supplier.monthlySupply} Kg
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Route Selector */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Assign Route <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                style={{ borderColor: BORDER_COLOR }}
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


            {/* Bag Limit */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Initial Bag Limit <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                placeholder="e.g., 50"
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                style={{ borderColor: BORDER_COLOR }}
                value={approvalData.bagLimit > 0 ? approvalData.bagLimit : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setApprovalData({
                    ...approvalData,
                    bagLimit:
                      val !== "" && Number(val) > 0 ? Number(val) : "",
                  });
                }}
              />
            </div>
          </div>
        </div>


        {/* Footer Buttons */}
        <div
          className="flex gap-3 justify-end p-6 border-t"
          style={{ borderColor: BORDER_COLOR, backgroundColor: HEADER_BG }}
        >
          <button
            className="px-6 py-2 rounded-lg text-sm font-medium transition"
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              color: ACCENT_COLOR,
              border: `2px solid ${BORDER_COLOR}`,
            }}
          >
            Cancel
          </button>


          <button
            className="px-6 py-2 rounded-lg text-sm font-medium text-white transition"
            style={{
              backgroundColor: BTN_COLOR,
              opacity:
                !approvalData.route ||
                !approvalData.bagLimit ||
                approvalData.bagLimit <= 0 ||
                isNaN(approvalData.bagLimit)
                  ? 0.5
                  : 1,
              cursor:
                !approvalData.route ||
                !approvalData.bagLimit ||
                approvalData.bagLimit <= 0 ||
                isNaN(approvalData.bagLimit)
                  ? "not-allowed"
                  : "pointer",
            }}
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



