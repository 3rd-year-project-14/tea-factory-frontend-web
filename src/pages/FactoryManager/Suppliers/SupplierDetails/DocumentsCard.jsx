import React from "react";
import { FileText, Eye, Download } from "lucide-react";

export default function DocumentsCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-emerald-300 overflow-hidden">
      <div className="px-6 py-4 border-b border-emerald-300 bg-emerald-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
          </div>
          <span className="text-sm text-emerald-600 font-medium">Complete</span>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">NIC Copy</p>
                <p className="text-xs text-gray-500">PDF • 2.3 MB</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border-2 border-emerald-300 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 border-2 border-emerald-300 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Bank Copy</p>
                <p className="text-xs text-gray-500">PDF • 1.8 MB</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border-2 border-emerald-300 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 border-2 border-emerald-300 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
          Download All Documents
        </button>
      </div>
    </div>
  );
}
