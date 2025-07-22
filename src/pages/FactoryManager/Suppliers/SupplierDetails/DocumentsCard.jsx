import React from "react";
import { FileText, Eye, Download } from "lucide-react";


const ACCENT_COLOR = "#165E52";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";


export default function DocumentsCard({ supplier }) {
  const nicComplete = !!supplier.nicImage;


  return (
    <div
      className="bg-white rounded-xl shadow-sm border overflow-hidden"
      style={{ borderColor: BORDER_COLOR }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex items-center justify-between"
        style={{ borderColor: BORDER_COLOR, backgroundColor: HEADER_BG }}
      >
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
          <h3 className="text-lg font-semibold" style={{ color: ACCENT_COLOR }}>
            Documents
          </h3>
        </div>
        <span
          className={`text-sm font-medium ${
            nicComplete ? "text-green-700" : "text-red-600"
          }`}
        >
          {nicComplete ? "Complete" : "Incomplete"}
        </span>
      </div>


      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          <div
            className="flex items-center justify-between p-3 rounded-lg border"
            style={{ backgroundColor: "#f9faf9", borderColor: BORDER_COLOR }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#e1f4ef" }}
              >
                <FileText className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">NIC Copy</p>
              </div>
            </div>


            {supplier.nicImage && (
              <div className="flex space-x-2">
                <button
                  className="p-2 rounded-lg transition-colors shadow-sm"
                  style={{
                    color: ACCENT_COLOR,
                    backgroundColor: "#f0fdfa",
                    border: `2px solid ${BORDER_COLOR}`,
                  }}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-lg transition-colors shadow-sm"
                  style={{
                    color: ACCENT_COLOR,
                    backgroundColor: "#f0fdfa",
                    border: `2px solid ${BORDER_COLOR}`,
                  }}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



