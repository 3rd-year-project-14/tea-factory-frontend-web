import React from "react";
import { Building, TrendingUp, MapPin } from "lucide-react";

export default function BusinessInfoCard({ supplier }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <Building className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Business & Land Information
          </h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Land Size
            </label>
            <p className="mt-1 text-sm font-medium text-gray-900">2.5 acres</p>
            <p className="text-xs text-gray-500">1.01 hectares</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Land Location
            </label>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {supplier.location}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Monthly Supply
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="text-sm font-medium text-gray-900">
                {supplier.supply}
              </p>
            </div>
          </div>
          {supplier.status === "approved" && supplier.route && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Assigned Route
              </label>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {supplier.route}
              </p>
            </div>
          )}
          {supplier.status === "pending" && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Requested Route
              </label>
              <p className="mt-1 text-sm font-medium text-gray-900">
                Nugegoda-Maharagama
              </p>
            </div>
          )}
          {supplier.status === "rejected" && supplier.rejectionReason && (
            <div className="md:col-span-2 lg:col-span-3">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Rejection Reason
              </label>
              <p className="mt-1 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                {supplier.rejectionReason}
              </p>
            </div>
          )}
        </div>

        {/* Maps Placeholder */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Land Location Map</p>
            </div>
          </div>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Pickup Location Map</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
