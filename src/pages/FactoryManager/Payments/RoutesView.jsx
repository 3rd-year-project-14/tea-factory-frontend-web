import { Eye } from "lucide-react";

export default function RoutesView({
  filteredData,
  getCurrentData,
  onViewRoute,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="bg-green-600 text-white">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm">
          <div className="text-left">Route Number</div>
          <div className="text-left">Route Name</div>
          <div className="text-center">Suppliers</div>
          <div className="text-right">Total Weight (kg)</div>
          <div className="text-right">Total Amount</div>
          <div className="text-center">View Details</div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredData.map((route) => (
          <div
            key={route.id}
            className="grid grid-cols-6 gap-4 p-3 items-center hover:bg-gray-50 transition-colors"
          >
            <div className="font-semibold text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full inline-block w-fit">
              {route.routeNumber}
            </div>
            <div className="font-medium text-gray-900 text-sm">
              {route.routeName}
            </div>
            <div className="text-sm text-gray-900 text-center">
              {route.supplierCount}
            </div>
            <div className="text-sm font-bold text-gray-900 text-right">
              {route.totalWeight.toFixed(1)}
            </div>
            <div className="text-sm font-bold text-gray-900 text-right">
              Rs. {route.totalAmount.toLocaleString()}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => onViewRoute(route)}
                className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-full transition-colors"
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <div className="h-12 w-12 text-gray-400 mx-auto mb-4 text-4xl">
              🚛
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

      {/* Results count at bottom */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600 p-4 border-t border-gray-200">
        <div>
          Showing {filteredData.length} of {getCurrentData().length} results
        </div>
      </div>
    </div>
  );
}
