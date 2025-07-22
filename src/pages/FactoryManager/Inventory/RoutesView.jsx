import {
  Eye,
  ChevronLeft,
  ChevronRight,
  PackageX
} from "lucide-react";
import { useState, useEffect } from "react";

const ACCENT_COLOR = "#01251F";

export default function RoutesView({ filteredData, onViewRoute }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoutes = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData.length]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getHeaderColor = () => ({
    backgroundColor: ACCENT_COLOR,
    color: "#ffffff",
  });

  const getActionButton = (route) => (
    <button
      onClick={() => onViewRoute(route)}
      className="p-2 rounded-full border"
      style={{ borderColor: ACCENT_COLOR, color: ACCENT_COLOR }}
      title="View Details"
    >
      <Eye className="w-4 h-4" />
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Table header */}
      <div style={getHeaderColor()}>
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm text-center">
          <div>Route Number</div>
          <div>Route Name</div>
          <div>Suppliers</div>
          <div>Total Weight (kg)</div>
          <div>Net Weight (kg)</div>
          <div>View Details</div>
        </div>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-gray-100">
        {currentRoutes.map((route) => (
          <div
            key={route.id}
            className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-center"
          >
            <div className="flex justify-center">
              <span
                className="text-sm font-semibold px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: "#e1f4ef",
                  color: "#165e52",
                  borderColor: "#165e52",
                }}
              >
                R-{String(route.routeNumber).padStart(3, "0")}
              </span>
            </div>
            <div className="text-gray-900 font-medium text-sm">
              {route.routeName}
            </div>
            <div className="text-sm text-gray-800">
              {route.supplierCount}
            </div>
            <div className="text-sm font-semibold text-gray-800">
              {route.totalWeight.toFixed(1)}
            </div>
            <div className="text-sm font-medium text-gray-800">
              {route.netWeight?.toFixed(1) || "0.0"}
            </div>
            <div className="flex justify-center">
              {getActionButton(route)}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filteredData.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <PackageX className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No routes found
            </h3>
            <p className="text-gray-600 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Range Info */}
            <div className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(endIndex, filteredData.length)}
              </span>{' '}
              of{' '}
              <span className="font-medium">{filteredData.length}</span> routes
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                {/* Prev */}
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

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) =>
                      [1, totalPages, currentPage - 1, currentPage, currentPage + 1].includes(page)
                    )
                    .map((page, index, arr) => {
                      const showEllipsis =
                        index > 0 && page - arr[index - 1] > 1;
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-2 text-gray-400">...</span>
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

                {/* Next */}
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
