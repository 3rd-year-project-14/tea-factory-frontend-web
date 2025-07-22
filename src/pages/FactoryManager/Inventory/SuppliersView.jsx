import { Eye, ChevronLeft, ChevronRight, Users } from "lucide-react";

import { useState, useEffect } from "react";

export default function SuppliersView({ filteredData, onViewSupplierDetail }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSuppliers = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData.length]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="bg-white rounded-xl shadow border border-[#d1e7dd] overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#172526] text-white">
        <div className="grid grid-cols-6 gap-4 p-4 font-semibold text-sm">
          <div className="text-center">Supplier ID</div>
          <div className="text-center">Supplier Name</div>
          <div className="text-center">Weight (kg)</div>
          <div className="text-center">Bags</div>
          <div className="text-center">Net Weight</div>
          <div className="text-center">Details</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {currentSuppliers.map((supplier) => {
          const moisturePercent = supplier.moistureContent || 3.0;
          const netWeight = supplier.totalWeight * (1 - moisturePercent / 100);
          return (
            <div
              key={supplier.id}
              className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition"
            >
              <div className="flex justify-center">
                <span className="text-sm font-semibold text-[#172526] bg-[#edf3f2] px-3 py-1 rounded-full border border-[#d1e7dd]">
                  {supplier.id}
                </span>
              </div>
              <div className="text-center text-sm font-medium text-gray-800">
                {supplier.supplierName}
              </div>
              <div className="text-center text-sm text-gray-700 font-semibold">
                {supplier.totalWeight.toFixed(1)}
              </div>
              <div className="text-center text-sm text-gray-700 font-semibold">
                {supplier.totalBags}
              </div>
              <div className="text-center text-sm text-gray-700 font-medium">
                {netWeight.toFixed(1)}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => onViewSupplierDetail(supplier)}
                  className="text-[#172526] hover:bg-[#edf3f2] p-2 rounded-full transition"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredData.length === 0 && (
          <div className="p-10 text-center text-gray-500">
          <div className="flex justify-center mb-2">
  <Users className="w-12 h-12 text-gray-300" />
</div>

            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              No suppliers found
            </h3>
            <p className="text-gray-600 text-sm">
              Please adjust your filters or search term.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(endIndex, filteredData.length)}
              </span>{" "}
              of <span className="font-medium">{filteredData.length}</span>{" "}
              suppliers
            </span>

            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                {/* Previous */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#172526] hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    )
                    .map((page, i, arr) => {
                      const prevPage = arr[i - 1];
                      const showEllipsis = i > 0 && page - prevPage > 1;
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          <button
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 text-sm rounded-md transition ${
                              page === currentPage
                                ? "bg-[#172526] text-white font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                </div>

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#172526] hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
