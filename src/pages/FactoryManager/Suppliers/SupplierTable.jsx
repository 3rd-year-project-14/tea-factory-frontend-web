import { Eye, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT_COLOR = "#01251F";

export default function SupplierTable({ filteredSuppliers, currentView }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredSuppliers.length, currentView]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleViewDetails = (supplier) => {
    navigate(`/factoryManager/suppliers/${supplier.id}`);
  };

  // ✅ Unified green header for all views
  const getHeaderColor = () => ({
    backgroundColor: ACCENT_COLOR,
    color: "#ffffff",
  });

  const getBadgeColor = () => {
    if (currentView === "approved")
      return {
        backgroundColor: "#e1f4ef",
        color: "#165e52",
        borderColor: "#165e52",
      };
    if (currentView === "pending")
      return {
        backgroundColor: "#fffbeb",
        color: "#b45309",
        borderColor: "#f59e0b",
      };
    if (currentView === "rejected")
      return {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        borderColor: "#ef4444",
      };
    return {};
  };

  const getActionButton = (supplier) => (
    <button
      onClick={() => handleViewDetails(supplier)}
      className="p-2 rounded-full transition-colors"
      title="View Details"
      style={
        currentView === "rejected"
          ? { border: "1.5px solid #dc2626", color: "#dc2626" }
          : { border: `1.5px solid ${ACCENT_COLOR}`, color: ACCENT_COLOR }
      }
    >
      <Eye className="h-4 w-4" />
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div style={getHeaderColor()}>
        <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm text-center">
          <div>Supplier ID</div>
          <div>Supplier Name</div>
          <div>
            {currentView === "pending" || currentView === "rejected"
              ? "Monthly Supply"
              : "Route"}
          </div>
          <div>
            {currentView === "pending"
              ? "Request Date"
              : currentView === "rejected"
              ? "Rejected Date"
              : "Approved Date"}
          </div>
          <div>View Details</div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {currentSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <div className="flex justify-center">
              <span
                className="font-semibold text-sm px-3 py-1 rounded-full border"
                style={getBadgeColor()}
              >
                SUP-{String(supplier.id).padStart(4, "0")}
              </span>
            </div>
            <div className="font-medium text-gray-900 text-sm text-center">
              {supplier.name}
            </div>
            <div className="font-medium text-gray-900 text-sm text-center">
              {currentView === "pending" || currentView === "rejected" ? (
                <span className="font-medium">
                  {supplier.monthlySupply
                    ? `${supplier.monthlySupply} kg`
                    : "-"}
                </span>
              ) : (
                <span className="font-medium">
                  {supplier.route?.name || supplier.requestedRoute || "-"}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-900 text-center">
              {currentView === "pending"
                ? supplier.supplierCreatedDate
                : currentView === "rejected"
                ? supplier.rejectedDate
                : supplier.approvedDate}
            </div>
            <div className="flex justify-center">
              {getActionButton(supplier)}
            </div>
          </div>
        ))}

        {filteredSuppliers.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No suppliers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {filteredSuppliers.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              <span>
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredSuppliers.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredSuppliers.length}</span>{" "}
                suppliers
              </span>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  } transition-colors`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => {
                      const showEllipsis =
                        index > 0 && page - array[index - 1] > 1;
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-3 py-2 text-gray-500">...</span>
                          )}
                          <button
                            onClick={() => goToPage(page)}
                            className={`px-3 py-2 text-sm rounded-md border ${
                              currentPage === page
                                ? "border-gray-400 bg-[#165e52] text-white"
                                : "border-gray-200 text-black hover:bg-gray-100"
                            } transition-colors`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  } transition-colors`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
