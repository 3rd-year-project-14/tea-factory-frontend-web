import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Eye, Users, Clock, X } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import {
  getAdvancesByStatus,
  getAdvanceStatusCounts,
} from "../../../api/paymentManager";
import PaginationControls from "../../../components/ui/PaginationControls";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import { CardSkeleton } from "../../../components/ui/Skeleton";

const statusMapping = {
  approved: "APPROVED",
  pending: "REQUESTED",
  rejected: "REJECTED",
};

export default function AdvanceManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const factoryId = user?.factoryId;

  const currentDate = useMemo(() => new Date(), []);
  const availableYears = Array.from(
    { length: 10 },
    (_, i) => currentDate.getFullYear() - i
  );

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("en", { month: "long" })
      ),
    []
  );

  const [advances, setAdvances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("approved");
  const [statusCounts, setStatusCounts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    month: months[currentDate.getMonth()],
    year: currentDate.getFullYear(),
    page: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 0 }));
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Set initial view based on navigation state
  useEffect(() => {
    if (location.state?.view) {
      setCurrentView(location.state.view);
    }
  }, [location.state?.view]);

  // Fetch advances data
  useEffect(() => {
    const fetchAdvances = async () => {
      if (!factoryId) return;
      setLoading(true);
      try {
        const params = {
          page: filters.page,
          ...(filters.month && {
            month:
              new Date(
                `${filters.month} 1, ${
                  filters.year || currentDate.getFullYear()
                }`
              ).getMonth() + 1,
          }),
          ...(filters.year && { year: filters.year }),
          ...(filters.search && { search: filters.search }),
        };
        const data = await getAdvancesByStatus(
          factoryId,
          statusMapping[currentView],
          params
        );
        setAdvances(data.content || []);
        setTotalPages(data.totalPages || 1);
        setTotalElements(data.totalElements || 0);
      } catch (error) {
        console.error("Error fetching advances:", error);
        setAdvances([]);
        setTotalPages(1);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvances();

    // Refetch advances when window regains focus
    const handleFocus = () => {
      fetchAdvances();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [
    factoryId,
    currentView,
    filters.page,
    filters.month,
    filters.year,
    filters.search,
    currentDate,
  ]);

  // Fetch status counts
  useEffect(() => {
    const fetchStatusCounts = async () => {
      if (!factoryId) return;
      try {
        const params = {
          ...(filters.month && {
            month:
              new Date(
                `${filters.month} 1, ${
                  filters.year || currentDate.getFullYear()
                }`
              ).getMonth() + 1,
          }),
          ...(filters.year && { year: filters.year }),
        };
        const data = await getAdvanceStatusCounts(factoryId, params);
        setStatusCounts(data);
      } catch (error) {
        console.error("Error fetching status counts:", error);
        setStatusCounts([]);
      }
    };
    fetchStatusCounts();

    // Refetch counts when window regains focus (e.g., after returning from advance details)
    const handleFocus = () => {
      fetchStatusCounts();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [factoryId, filters.month, filters.year, currentDate]);

  const metrics = useMemo(() => {
    return statusCounts.reduce(
      (acc, item) => {
        if (item.status === "APPROVED") acc.approvedCount = item.count;
        else if (item.status === "REQUESTED") acc.pendingCount = item.count;
        else if (item.status === "REJECTED") acc.rejectedCount = item.count;
        return acc;
      },
      { approvedCount: 0, pendingCount: 0, rejectedCount: 0 }
    );
  }, [statusCounts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 0 })); // Reset page on filter change
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            Advance Management
          </h1>
          <div className="flex gap-4">
            <select
              name="month"
              value={filters.month}
              onChange={handleFilterChange}
              className="p-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            >
              <option value="">All Months</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="p-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            >
              <option value="">All Years</option>
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Approved",
            count: metrics.approvedCount,
            icon: Users,
            view: "approved",
            iconClass: "text-tea-700 dark:text-tea-300",
            borderClass: "border-tea-600 dark:border-tea-500",
          },
          {
            label: "Pending Requests",
            count: metrics.pendingCount,
            icon: Clock,
            view: "pending",
            iconClass: "text-amber-600 dark:text-amber-400",
            borderClass: "border-tea-100 dark:border-card-border-dark",
          },
          {
            label: "Rejected",
            count: metrics.rejectedCount,
            icon: X,
            view: "rejected",
            iconClass: "text-red-600 dark:text-red-400",
            borderClass: "border-red-500 dark:border-red-500",
          },
        ].map((card, i) => (
          <Card
            key={i}
            hoverable
            onClick={() => setCurrentView(card.view)}
            className={`!border cursor-pointer transition-all duration-200 ${card.borderClass} ${
              currentView === card.view ? "ring-2 ring-tea-500 scale-[1.02] shadow-card" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{card.label}</p>
                <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{card.count}</p>
              </div>
              <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
                <card.icon size={24} className={card.iconClass} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6 !p-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink/40 dark:text-muted-dark h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-sm text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            />
          </div>
        </div>
      </Card>

      {/* Table */}
      {loading ? (
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <div className="bg-tea-900">
            <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-center text-white">
              <div>Name</div>
              <div>Purpose</div>
              <div>Amount</div>
              <div>Date</div>
              <div>View</div>
            </div>
          </div>
          <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
            {advances.length > 0 ? (
              advances.map((advance, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="text-center">
                    <span className="font-semibold text-sm text-ink dark:text-ink-dark">
                      {advance.supplierName}
                    </span>
                  </div>
                  <div className="text-center text-sm font-medium text-ink dark:text-ink-dark">
                    {advance.purpose}
                  </div>
                  <div className="text-center text-sm text-ink/80 dark:text-ink-dark/80">
                    Rs.{" "}
                    {advance.status === "APPROVED"
                      ? advance.approvedAmount
                      : advance.requestedAmount}
                  </div>
                  <div className="text-center text-sm text-ink/80 dark:text-ink-dark/80">
                    {new Date(advance.requestedDate).toLocaleDateString()}
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="p-2 rounded-full border border-tea-700 text-tea-700 hover:bg-tea-50 dark:border-tea-400 dark:text-tea-300 dark:hover:bg-tea-900/30 transition-colors"
                      onClick={() =>
                        navigate(
                          `/factoryManager/payment/advance/${advance.id}`
                        )
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState icon={Users} title="No advances found" description="" />
            )}
          </div>
        </Card>
      )}

      {/* Pagination */}
      <PaginationControls
        page={filters.page}
        totalPages={totalPages}
        totalElements={totalElements}
        setPage={handlePageChange}
      />
    </div>
  );
}
