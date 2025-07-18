import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function RoutesView({ filteredData, onViewRoute }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 routes per page

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoutes = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData.length]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-emerald-200 overflow-hidden">
      <div className="bg-emerald-600 text-white">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm">
          <div className="text-center">Route Number</div>
          <div className="text-center">Route Name</div>
          <div className="text-center">Suppliers</div>
          <div className="text-center">Total Weight (kg)</div>
          <div className="text-center">Net Weight (kg)</div>
          <div className="text-center">View Details</div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {currentRoutes.map((route) => {
          return (
            <div
              key={route.id}
              className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-center">
                <span className="font-semibold text-emerald-600 text-sm bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {route.routeNumber}
                </span>
              </div>
              <div className="font-medium text-gray-900 text-sm text-center">
                {route.routeName}
              </div>
              <div className="text-sm text-gray-900 text-center">
                {route.supplierCount}
              </div>
              <div className="text-sm font-bold text-gray-900 text-center">
                {route.totalWeight.toFixed(1)}
              </div>
              <div className="text-sm font-medium text-gray-900 text-center">
                {route.netWeight?.toFixed(1) || "0.0"}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => onViewRoute(route)}
                  className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 p-2 rounded-full transition-colors"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <div className="h-12 w-12 text-gray-400 mx-auto mb-4 text-4xl">
              📦
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No routes found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredData.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              <span>
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredData.length)}
                </span>{" "}
                of <span className="font-medium">{filteredData.length}</span>{" "}
                routes
              </span>
            </div>

            {/* Only show pagination controls when there are multiple pages */}
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  } transition-colors`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if there's a gap
                      const showEllipsis =
                        index > 0 && page - array[index - 1] > 1;
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-3 py-2 text-gray-500">...</span>
                          )}
                          <button
                            onClick={() => goToPage(page)}
                            className={`px-3 py-2 text-sm rounded-md ${
                              currentPage === page
                                ? "bg-emerald-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            } transition-colors`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
