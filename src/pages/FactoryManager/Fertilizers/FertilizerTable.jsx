import { Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { getStatusColor } from "./fertilizerUtils";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import { CardSkeleton } from "../../../components/ui/Skeleton";

const REQUEST_ID_STYLES = {
  approved:
    "bg-tea-50 text-tea-700 border-tea-600 dark:bg-tea-900/30 dark:text-tea-200 dark:border-tea-500",
  pending:
    "bg-amber-50 text-amber-700 border-amber-500 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-500",
  rejected:
    "bg-red-50 text-red-700 border-red-500 dark:bg-red-900/20 dark:text-red-300 dark:border-red-500",
  all:
    "bg-tea-50 text-tea-700 border-tea-600 dark:bg-tea-900/30 dark:text-tea-200 dark:border-tea-500",
};

export default function FertilizerTable({
  filteredRequests,
  currentView,
  loading,
  onViewRequest,
  onApprove,
  onReject,
  page = 0,
  size = 10,
  totalElements = 0,
  first = false,
  last = false,
  onPageChange,
}) {
  const currentPage = page + 1;
  const totalPages = Math.ceil(totalElements / size);

  const goToPage = (uiPage) => {
    if (onPageChange) onPageChange(uiPage - 1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getActionButton = (request) => (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onViewRequest(request)}
        className="p-2 rounded-full border border-tea-700 text-tea-700 hover:bg-tea-50 dark:border-tea-400 dark:text-tea-300 dark:hover:bg-tea-900/30 transition-colors"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </button>
      {currentView === "pending" && (
        <>
          <button
            onClick={() => onApprove(request.id)}
            className="p-2 rounded-full border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 transition-colors"
            title="Approve Request"
          >
            <CheckCircle className="h-4 w-4" />
          </button>
          <button
            onClick={() => onReject(request.id)}
            className="p-2 rounded-full border border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            title="Reject Request"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (filteredRequests.length === 0) {
    return (
      <Card className="!p-0 overflow-hidden">
        <EmptyState
          icon={Package}
          title="No requests found"
          description={
            currentView === "pending"
              ? "There are no pending fertilizer requests at this time."
              : currentView === "approved"
              ? "No approved fertilizer requests found matching your filters."
              : currentView === "rejected"
              ? "No rejected fertilizer requests found matching your filters."
              : "No fertilizer requests found matching your filters."
          }
        />
      </Card>
    );
  }

  const columns = [
    {
      key: "id",
      label: "Request ID",
      render: (r) => (
        <span
          className={`font-semibold text-sm px-3 py-1 rounded-full border ${
            REQUEST_ID_STYLES[currentView] || REQUEST_ID_STYLES.all
          }`}
        >
          REQ-{String(r.id).padStart(4, "0")}
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (r) => r.categoryName || "-",
    },
    {
      key: "company",
      label: "Company",
      render: (r) => r.companyName || "-",
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (r) => `${r.quantity} ${r.unit || "kg"}`,
    },
    ...(currentView === "all"
      ? [
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(r.status)}`}
              >
                {r.status}
              </span>
            ),
          },
        ]
      : []),
    {
      key: "date",
      label: "Requested On",
      render: (r) => formatDate(r.createdAt),
    },
    {
      key: "actions",
      label: "Actions",
      render: (r) => getActionButton(r),
    },
  ];

  return (
    <Card className="!p-0 overflow-hidden">
      {/* Table Header */}
      <div className="bg-tea-900">
        <div
          className={`grid grid-cols-${columns.length} gap-4 p-4 font-medium text-sm text-center text-white`}
        >
          {columns.map((col) => (
            <div key={col.key}>{col.label}</div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className={`grid grid-cols-${columns.length} gap-4 p-4 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors`}
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className="text-sm text-ink dark:text-ink-dark text-center"
              >
                {col.render(request)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalElements > 0 && (
        <div className="bg-surface dark:bg-white/5 px-6 py-4 border-t border-tea-100 dark:border-card-border-dark">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-ink/70 dark:text-muted-dark">
              <span>
                Showing <span className="font-medium text-ink dark:text-ink-dark">{page * size + 1}</span>{" "}
                to{" "}
                <span className="font-medium text-ink dark:text-ink-dark">
                  {Math.min((page + 1) * size, totalElements)}
                </span>{" "}
                of <span className="font-medium text-ink dark:text-ink-dark">{totalElements}</span> results
              </span>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => !first && goToPage(currentPage - 1)}
                  disabled={first}
                  className={`p-2 rounded-lg border transition-colors ${
                    first
                      ? "bg-tea-50 dark:bg-white/5 text-ink/30 dark:text-muted-dark/50 border-tea-100 dark:border-card-border-dark cursor-not-allowed"
                      : "bg-card dark:bg-card-dark text-ink dark:text-ink-dark border-tea-100 dark:border-card-border-dark hover:bg-tea-50 dark:hover:bg-white/10"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="text-sm font-medium text-ink dark:text-ink-dark">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  onClick={() => !last && goToPage(currentPage + 1)}
                  disabled={last}
                  className={`p-2 rounded-lg border transition-colors ${
                    last
                      ? "bg-tea-50 dark:bg-white/5 text-ink/30 dark:text-muted-dark/50 border-tea-100 dark:border-card-border-dark cursor-not-allowed"
                      : "bg-card dark:bg-card-dark text-ink dark:text-ink-dark border-tea-100 dark:border-card-border-dark hover:bg-tea-50 dark:hover:bg-white/10"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
