import React from "react";
import { Calendar, Mail, FileText } from "lucide-react";

export default function QuickActionsCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-emerald-200 bg-emerald-50">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-sm font-medium text-gray-900">
              Schedule Site Visit
            </span>
            <Calendar className="w-4 h-4 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-sm font-medium text-gray-900">
              Send Message
            </span>
            <Mail className="w-4 h-4 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-sm font-medium text-gray-900">
              Request More Info
            </span>
            <FileText className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
