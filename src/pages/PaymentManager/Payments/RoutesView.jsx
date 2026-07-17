import { Eye, Truck } from "lucide-react";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";

export default function RoutesView({ filteredData, getCurrentData, onViewRoute }) {
  return (
    <Card className="!p-0 overflow-hidden">
      {/* Table Header */}
      <div className="bg-tea-900">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm text-center text-white">
          <div className="text-left">Route Number</div>
          <div className="text-left">Route Name</div>
          <div>Suppliers</div>
          <div>Total Weight (kg)</div>
          <div>Total Amount</div>
          <div>View</div>
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
        {filteredData.map((route) => (
          <div
            key={route.id}
            className="grid grid-cols-6 gap-4 px-4 py-3 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors"
          >
            <div className="text-sm font-medium">
              <span className="px-3 py-1 border border-tea-600 dark:border-tea-500 bg-tea-50 dark:bg-tea-900/30 text-tea-700 dark:text-tea-200 rounded-full text-xs inline-block">
                {route.routeNumber}
              </span>
            </div>
            <div className="text-sm font-semibold text-ink dark:text-ink-dark text-left">
              {route.routeName}
            </div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80 font-medium text-center">
              {route.supplierCount}
            </div>
            <div className="text-sm text-ink dark:text-ink-dark font-semibold text-center">
              {route.totalWeight.toFixed(1)}
            </div>
            <div className="text-sm text-ink dark:text-ink-dark font-semibold text-right">
              Rs. {route.totalAmount.toLocaleString()}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => onViewRoute(route)}
                className="p-2 rounded-full border border-tea-700 text-tea-700 hover:bg-tea-50 dark:border-tea-400 dark:text-tea-300 dark:hover:bg-tea-900/30 transition-colors"
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <EmptyState
            icon={Truck}
            title="No routes found"
            description="Try adjusting your search or filter criteria"
          />
        )}
      </div>

      {/* Results Count (Bottom Footer) */}
      <div className="bg-surface dark:bg-white/5 px-4 py-3 border-t border-tea-100 dark:border-card-border-dark text-sm text-ink/60 dark:text-muted-dark flex justify-between">
        <span>
          Showing <strong className="text-ink dark:text-ink-dark">{filteredData.length}</strong> of{" "}
          <strong className="text-ink dark:text-ink-dark">{getCurrentData().length}</strong> results
        </span>
      </div>
    </Card>
  );
}
