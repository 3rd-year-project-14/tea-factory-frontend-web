import { Eye, User, CreditCard, Banknote } from "lucide-react";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";

export default function SuppliersView({
  filteredData,
  getCurrentData,
  onViewSupplierBill,
}) {
  return (
    <Card className="!p-0 overflow-hidden">
      {/* Table Header */}
      <div className="bg-tea-900">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm text-white">
          <div className="text-left">Supplier ID</div>
          <div className="text-left">Supplier Name</div>
          <div className="text-right">Final Amount</div>
          <div className="text-center">Payment Method</div>
          <div className="text-center">Status</div>
          <div className="text-center">View Details</div>
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
        {filteredData.map((supplier) => {
          const isBank = supplier.paymentMethod === "Bank";
          const isPaid = supplier.status === "Paid";

          return (
            <div
              key={supplier.id}
              className="grid grid-cols-6 gap-4 p-3 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors"
            >
              {/* Supplier ID Badge */}
              <div className="font-semibold text-tea-700 dark:text-tea-200 text-sm bg-tea-50 dark:bg-tea-900/30 px-3 py-1 rounded-full inline-block border border-tea-600 dark:border-tea-500 w-fit text-center">
                {supplier.id}
              </div>

              {/* Supplier Name */}
              <div className="font-medium text-ink dark:text-ink-dark text-sm">{supplier.supplierName}</div>

              {/* Final Amount */}
              <div className="text-sm font-bold text-ink dark:text-ink-dark text-right">
                Rs. {supplier.finalAmount.toLocaleString()}
              </div>

              {/* Payment Method Pill */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-tea-100 dark:border-card-border-dark text-ink dark:text-ink-dark bg-surface dark:bg-white/5">
                  {isBank ? (
                    <CreditCard className="h-3 w-3" />
                  ) : (
                    <Banknote className="h-3 w-3" />
                  )}
                  {supplier.paymentMethod}
                </span>
              </div>

              {/* Status Pill */}
              <div className="flex justify-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                    isPaid
                      ? "bg-tea-50 border-tea-600 text-tea-700 dark:bg-tea-900/30 dark:border-tea-500 dark:text-tea-200"
                      : "bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-900/20 dark:border-amber-500 dark:text-amber-300"
                  }`}
                >
                  {supplier.status}
                </span>
              </div>

              {/* View Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => onViewSupplierBill(supplier)}
                  className="text-tea-700 border border-tea-700 hover:bg-tea-50 dark:text-tea-300 dark:border-tea-400 dark:hover:bg-tea-900/30 p-2 rounded-full transition-colors"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {filteredData.length === 0 && (
          <EmptyState
            icon={User}
            title="No suppliers found"
            description="Try adjusting your search or filter criteria"
          />
        )}
      </div>

      {/* Table Footer */}
      <div className="bg-surface dark:bg-white/5 flex items-center justify-between text-sm text-ink/60 dark:text-muted-dark p-4 border-t border-tea-100 dark:border-card-border-dark">
        <div>
          Showing {filteredData.length} of {getCurrentData().length} results
        </div>
      </div>
    </Card>
  );
}
