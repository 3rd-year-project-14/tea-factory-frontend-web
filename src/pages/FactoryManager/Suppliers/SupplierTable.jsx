import { Eye, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";

const BADGE_STYLES = {
  approved:
    "bg-tea-50 text-tea-700 border-tea-600 dark:bg-tea-900/30 dark:text-tea-200 dark:border-tea-500",
  pending:
    "bg-amber-50 text-amber-700 border-amber-500 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-500",
  rejected:
    "bg-red-50 text-red-700 border-red-500 dark:bg-red-900/20 dark:text-red-300 dark:border-red-500",
};

export default function SupplierTable({
  filteredSuppliers,
  currentView,
  page = 0,
  size = 10,
  totalElements = 0,
  first = false,
  last = false,
  onPageChange,
}) {
  const navigate = useNavigate();
  const currentPage = page + 1;
  const totalPages = Math.ceil(totalElements / size);
  const currentSuppliers = filteredSuppliers;

  const goToPage = (uiPage) => {
    if (onPageChange) onPageChange(uiPage - 1);
  };

  const handleViewDetails = (supplier) => {
    navigate(`/factoryManager/suppliers/${supplier.id}`, {
      state: { currentView },
    });
  };

  const getActionButton = (supplier) => (
    <button
      onClick={() => handleViewDetails(supplier)}
      className={`p-2 rounded-full border transition-colors ${
        currentView === "rejected"
          ? "border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
          : "border-tea-700 text-tea-700 hover:bg-tea-50 dark:border-tea-400 dark:text-tea-300 dark:hover:bg-tea-900/30"
      }`}
      title="View Details"
    >
      <Eye className="h-4 w-4" />
    </button>
  );

  const badgeClass = BADGE_STYLES[currentView] || BADGE_STYLES.approved;

  const columns =
    currentView === "approved"
      ? [
          {
            key: "id",
            label: "Supplier ID",
            render: (s) => (
              <span className={`font-semibold text-sm px-3 py-1 rounded-full border ${badgeClass}`}>
                SUP-{String(s.id).padStart(4, "0")}
              </span>
            ),
          },
          { key: "name", label: "Supplier Name", render: (s) => s.name },
          {
            key: "routeName",
            label: "Route",
            render: (s) => s.routeName || "-",
          },
          {
            key: "approvedDate",
            label: "Approved Date",
            render: (s) => s.approvedDate || "-",
          },
          {
            key: "actions",
            label: "View Details",
            render: (s) => getActionButton(s),
          },
        ]
      : [
          {
            key: "id",
            label: "Request ID",
            render: (s) => (
              <span className={`font-semibold text-sm px-3 py-1 rounded-full border ${badgeClass}`}>
                REQ-{String(s.id).padStart(4, "0")}
              </span>
            ),
          },
          { key: "name", label: "Supplier Name", render: (s) => s.name },
          {
            key: "monthlySupply",
            label: "Monthly Supply",
            render: (s) => (s.monthlySupply ? `${s.monthlySupply} kg` : "-"),
          },
          {
            key: "date",
            label: currentView === "pending" ? "Request Date" : "Rejected Date",
            render: (s) =>
              currentView === "pending"
                ? s.supplierCreatedDate || "-"
                : s.rejectedDate || "-",
          },
          {
            key: "actions",
            label: "View Details",
            render: (s) => getActionButton(s),
          },
        ];

  return (
    <Card className="!p-0 overflow-hidden">
      <div className="bg-tea-900">
        <div
          className={`grid grid-cols-${columns.length} gap-4 p-4 font-medium text-sm text-center text-white`}
        >
          {columns.map((col) => (
            <div key={col.key}>{col.label}</div>
          ))}
        </div>
      </div>

      <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
        {currentSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className={`grid grid-cols-${columns.length} gap-4 p-4 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors`}
          >
            {columns.map((col) => (
              <div key={col.key} className="text-sm text-ink dark:text-ink-dark text-center">
                {col.render(supplier)}
              </div>
            ))}
          </div>
        ))}

        {filteredSuppliers.length === 0 && (
          <EmptyState icon={Users} title="No suppliers found" description="" />
        )}
      </div>

      {totalElements > 0 && (
        <div className="bg-surface dark:bg-white/5 px-6 py-4 border-t border-tea-100 dark:border-card-border-dark">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-ink/70 dark:text-muted-dark">
              <span>
                Showing <span className="font-medium text-ink dark:text-ink-dark">{page * size + 1}</span>{" "}
                to{" "}
                <span className="font-medium text-ink dark:text-ink-dark">
                  {Math.min(page * size + currentSuppliers.length, totalElements)}
                </span>{" "}
                of <span className="font-medium text-ink dark:text-ink-dark">{totalElements}</span> suppliers
              </span>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={first}
                  className={`p-2 rounded-lg border transition-colors ${
                    first
                      ? "bg-tea-50 dark:bg-white/5 text-ink/30 dark:text-muted-dark/50 border-tea-100 dark:border-card-border-dark cursor-not-allowed"
                      : "bg-card dark:bg-card-dark text-ink dark:text-ink-dark border-tea-100 dark:border-card-border-dark hover:bg-tea-50 dark:hover:bg-white/10"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      return (
                        p === 1 ||
                        p === totalPages ||
                        (p >= currentPage - 1 && p <= currentPage + 1)
                      );
                    })
                    .map((p, index, array) => {
                      const showEllipsis = index > 0 && p - array[index - 1] > 1;
                      return (
                        <div key={p} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-3 py-2 text-ink/40 dark:text-muted-dark">...</span>
                          )}
                          <button
                            onClick={() => goToPage(p)}
                            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                              currentPage === p
                                ? "border-tea-700 bg-tea-700 text-white"
                                : "border-tea-100 dark:border-card-border-dark text-ink dark:text-ink-dark hover:bg-tea-50 dark:hover:bg-white/10"
                            }`}
                          >
                            {p}
                          </button>
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={last}
                  className={`p-2 rounded-lg border transition-colors ${
                    last
                      ? "bg-tea-50 dark:bg-white/5 text-ink/30 dark:text-muted-dark/50 border-tea-100 dark:border-card-border-dark cursor-not-allowed"
                      : "bg-card dark:bg-card-dark text-ink dark:text-ink-dark border-tea-100 dark:border-card-border-dark hover:bg-tea-50 dark:hover:bg-white/10"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
