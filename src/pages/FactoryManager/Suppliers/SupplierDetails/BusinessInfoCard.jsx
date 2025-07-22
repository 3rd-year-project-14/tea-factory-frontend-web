import React from "react";
import { Building, MapPin } from "lucide-react";


const ACCENT_COLOR = "#165E52";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";


export default function BusinessInfoCard({ supplier }) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border overflow-hidden"
      style={{ borderColor: BORDER_COLOR }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex items-center space-x-2"
        style={{ borderColor: BORDER_COLOR, backgroundColor: HEADER_BG }}
      >
        <Building className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
        <h2 className="text-lg font-semibold" style={{ color: ACCENT_COLOR }}>
          Land Information
        </h2>
      </div>


      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Land Size */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Land Size
            </label>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {supplier.landSize ? `${supplier.landSize} acres` : "-"}
            </p>
          </div>


          {/* Land Location */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Land Location
            </label>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {supplier.landLocation || "Not specified"}
            </p>
          </div>


          {/* Monthly Supply */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Monthly Supply
            </label>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {supplier.status === "approved"
                ? supplier.initialBagCount
                  ? `${supplier.initialBagCount} kg`
                  : "-"
                : supplier.monthlySupply
                ? `${supplier.monthlySupply} kg`
                : "-"}
            </p>
          </div>


          {/* Route Info */}
          {supplier.status === "approved" && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Assigned Route
              </label>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {supplier.route?.name || "-"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Start: {supplier.route?.startLocation || "-"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                End: {supplier.route?.endLocation || "-"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Bag count: {supplier.route?.bagCount || supplier.initialBagCount || "-"}
              </p>
            </div>
          )}


          {supplier.status !== "approved" && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Requested Route
              </label>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {supplier.requestedRoute || "Not specified"}
              </p>
            </div>
          )}


          {/* Rejection Reason */}
          {supplier.status === "rejected" && (
            <div className="md:col-span-2 lg:col-span-3">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Rejection Reason
              </label>
              <p className="mt-1 text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                {supplier.rejectReason}
              </p>
            </div>
          )}
        </div>


        {/* Map Placeholder */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: ACCENT_COLOR }} />
              <p className="text-sm text-gray-500">Land Location Map</p>
            </div>
          </div>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: ACCENT_COLOR }} />
              <p className="text-sm text-gray-500">Pickup Location Map</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



