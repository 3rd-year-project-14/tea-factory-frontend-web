import { Eye, PackageX } from "lucide-react";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import { CardSkeleton } from "../../../components/ui/Skeleton";

export default function RoutesView({ filteredData, onViewRoute, loading }) {
  const getActionButton = (route) => (
    <button
      onClick={() => onViewRoute(route)}
      className="p-2 rounded-full border border-tea-700 text-tea-700 hover:bg-tea-50 dark:border-tea-400 dark:text-tea-300 dark:hover:bg-tea-900/30 transition-colors"
      title="View Details"
    >
      <Eye className="w-4 h-4" />
    </button>
  );

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
      {/* Table header */}
      <div className="bg-tea-900">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm text-center text-white">
          <div>Route Code</div>
          <div>Route Name</div>
          <div>Suppliers</div>
          <div>Total Weight (kg)</div>
          <div>Net Weight (kg)</div>
          <div>View Details</div>
        </div>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
        {filteredData.map((route) => (
          <div
            key={route.routeId}
            className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors text-center"
          >
            <div className="flex justify-center">
              <span className="text-sm font-semibold px-3 py-1 rounded-full border bg-tea-50 text-tea-700 border-tea-600 dark:bg-tea-900/30 dark:text-tea-200 dark:border-tea-500">
                {route.routeCode || route.routeNumber || "N/A"}
              </span>
            </div>
            <div className="text-ink dark:text-ink-dark font-medium text-sm">
              {route.routeName}
            </div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80">{route.supplierCount}</div>
            <div className="text-sm font-semibold text-ink dark:text-ink-dark">
              {route.totalGrossWeight?.toFixed(1) || "0.0"}
            </div>
            <div className="text-sm font-medium text-ink/80 dark:text-ink-dark/80">
              {route.netWeight?.toFixed(1) || "0.0"}
            </div>
            <div className="flex justify-center">{getActionButton(route)}</div>
          </div>
        ))}

        {/* Empty state */}
        {filteredData.length === 0 && (
          <EmptyState
            icon={PackageX}
            title="No routes found"
            description="Try adjusting your search or filter criteria"
          />
        )}
      </div>
    </Card>
  );
}
