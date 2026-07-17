import { Eye, Users } from "lucide-react";

import PaginationControls from "../../../components/ui/PaginationControls";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import { CardSkeleton } from "../../../components/ui/Skeleton";

export default function SuppliersView({
  suppliersData,
  onViewSupplierDetail,
  page,
  totalPages,
  totalElements,
  setPage,
  loading,
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <Card className="!p-0 overflow-hidden">
      {/* Table Header */}
      <div className="bg-tea-900">
        <div className="grid grid-cols-6 gap-4 p-4 font-semibold text-sm text-white">
          <div className="text-center">Supplier ID</div>
          <div className="text-center">Supplier Name</div>
          <div className="text-center">Weight (kg)</div>
          <div className="text-center">Bags</div>
          <div className="text-center">Net Weight</div>
          <div className="text-center">Details</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
        {suppliersData.map((supplier) => {
          return (
            <div
              key={supplier.id}
              className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex justify-center">
                <span className="text-sm font-semibold text-tea-700 dark:text-tea-200 bg-tea-50 dark:bg-tea-900/30 px-3 py-1 rounded-full border border-tea-600 dark:border-tea-500">
                  {supplier.id}
                </span>
              </div>
              <div className="text-center text-sm font-medium text-ink dark:text-ink-dark">
                {supplier.supplierName}
              </div>
              <div className="text-center text-sm text-ink/80 dark:text-ink-dark/80 font-semibold">
                {supplier.totalWeight.toFixed(1)}
              </div>
              <div className="text-center text-sm text-ink/80 dark:text-ink-dark/80 font-semibold">
                {supplier.totalBags}
              </div>
              <div className="text-center text-sm text-ink/80 dark:text-ink-dark/80 font-medium">
                {supplier.totalNetWeight.toFixed(1)}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => onViewSupplierDetail(supplier)}
                  className="p-2 rounded-full border border-tea-700 text-tea-700 hover:bg-tea-50 dark:border-tea-400 dark:text-tea-300 dark:hover:bg-tea-900/30 transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {suppliersData.length === 0 && (
          <EmptyState
            icon={Users}
            title="No suppliers found"
            description="Please adjust your filters or search term."
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          totalElements={totalElements}
          setPage={setPage}
        />
      )}
    </Card>
  );
}
