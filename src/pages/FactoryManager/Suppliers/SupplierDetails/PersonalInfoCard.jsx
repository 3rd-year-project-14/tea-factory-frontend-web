import React from "react";
import { User, Phone, Mail, MapPin } from "lucide-react";

export default function PersonalInfoCard({ supplier }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Full Name
            </label>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {supplier.name}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              NIC Number
            </label>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {supplier.nic}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Date of Birth
            </label>
            <p className="mt-1 text-sm font-medium text-gray-900">
              December 15, 1995
            </p>
            <p className="text-xs text-gray-500">29 years old</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Mobile Number
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-900">
                {supplier.phone}
              </p>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Email Address
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-900">
                kamal.perera@email.com
              </p>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Address
            </label>
            <div className="mt-1 flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  123, Galle Road
                </p>
                <p className="text-xs text-gray-500">{supplier.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
