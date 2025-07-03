import { Eye, User, CreditCard, Banknote } from "lucide-react";

export default function SuppliersView({
  filteredData,
  getCurrentData,
  onViewSupplierBill,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="bg-green-600 text-white">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm">
          <div className="text-left">Supplier ID</div>
          <div className="text-left">Supplier Name</div>
          <div className="text-right">Final Amount</div>
          <div className="text-center">Payment Method</div>
          <div className="text-center">Status</div>
          <div className="text-center">View Details</div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredData.map((supplier) => (
          <div
            key={supplier.id}
            className="grid grid-cols-6 gap-4 p-3 items-center hover:bg-gray-50 transition-colors"
          >
            <div className="font-semibold text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full inline-block w-fit">
              {supplier.id}
            </div>
            <div className="font-medium text-gray-900 text-sm">
              {supplier.supplierName}
            </div>
            <div className="text-sm font-bold text-gray-900 text-right">
              Rs. {supplier.finalAmount.toLocaleString()}
            </div>
            <div className="flex justify-center">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                  supplier.paymentMethod === "Bank"
                    ? "bg-[#e3f2fd] text-[#1976d2]"
                    : "bg-[#e8f5e8] text-[#4CAF50]"
                }`}
              >
                {supplier.paymentMethod === "Bank" ? (
                  <CreditCard className="h-3 w-3" />
                ) : (
                  <Banknote className="h-3 w-3" />
                )}
                {supplier.paymentMethod}
              </span>
            </div>
            <div className="flex justify-center">
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  supplier.status === "Paid"
                    ? "bg-[#e8f5e8] text-[#4CAF50]"
                    : "bg-[#fff3cd] text-[#856404]"
                }`}
              >
                {supplier.status}
              </span>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => onViewSupplierBill(supplier)}
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
              👥
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

      {/* Results count at bottom */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600 p-4 border-t border-gray-200">
        <div>
          Showing {filteredData.length} of {getCurrentData().length} results
        </div>
      </div>
    </div>
  );
}
