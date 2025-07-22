import { Users, Clock, X } from "lucide-react";


const ACCENT_COLOR = "#165e52";
const ORANGE_COLOR = "#eab308"; // Tailwind orange-400


export default function SupplierSummaryCards({
  metrics,
  currentView,
  setCurrentView,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Approved */}
      <div
        onClick={() => setCurrentView("approved")}
        className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-[#cfece6] cursor-pointer ${
          currentView === "approved"
            ? "ring-2 ring-[#165e52] ring-opacity-50"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: ACCENT_COLOR }}>
              Total Suppliers
            </p>
            <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>
              {metrics.approved}
            </p>
          </div>
          <div
            className="h-12 w-12 bg-[#e1f4ef] rounded-full flex items-center justify-center"
          >
            <Users size={30} style={{ color: ACCENT_COLOR }} />
          </div>
        </div>
      </div>
      {/* Pending */}
      <div
        onClick={() => setCurrentView("pending")}
        className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-orange-200 cursor-pointer ${
          currentView === "pending"
            ? "ring-2 ring-[#eab308] ring-opacity-60"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: ACCENT_COLOR }}>
              Pending Requests
            </p>
            <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>
              {metrics.pending}
            </p>
          </div>
          <div
            className="h-12 w-12 bg-orange-50 rounded-full flex items-center justify-center"
          >
            <Clock size={30} style={{ color: ORANGE_COLOR }} />
          </div>
        </div>
      </div>
      {/* Rejected */}
      <div
        onClick={() => setCurrentView("rejected")}
        className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-red-200 cursor-pointer ${
          currentView === "rejected"
            ? "ring-2 ring-red-400 ring-opacity-50"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
             <p className="text-sm font-medium" style={{ color: ACCENT_COLOR }}>
              Rejected
            </p>
              <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>
              {metrics.rejected}
            </p>
          </div>
          <div
            className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center"
          >
            <X size={30} className="text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
}





