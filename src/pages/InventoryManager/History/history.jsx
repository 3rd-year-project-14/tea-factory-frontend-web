import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, Clock, Calendar } from "lucide-react";
import { getRoutesDetails } from "../../../api/supplier";
import {
  getBagWeights,
  getInventoryManagersByFactory,
} from "../../../api/inventoryManager/history";
import PaginationControls from "../../../components/ui/PaginationControls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../contexts/AuthContext";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";

const selectClass =
  "w-full py-2 px-3 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40";

export default function InventoryHistory() {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimeout = useRef();
  const [routeFilter, setRouteFilter] = useState("");
  const [userIdFilter, setUserIdFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [routeOptions, setRouteOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const { user } = useAuth();
  const factoryId = user?.factoryId;

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  useEffect(() => {
    if (!factoryId) return;
    setLoading(true);
    const params = {
      page,
      size: 10,
    };
    if (routeFilter) params.routeId = routeFilter;
    if (userIdFilter) params.userId = userIdFilter;
    if (selectedDate) {
      const localDate = selectedDate;
      const yyyy = localDate.getFullYear();
      const mm = String(localDate.getMonth() + 1).padStart(2, "0");
      const dd = String(localDate.getDate()).padStart(2, "0");
      params.date = `${yyyy}-${mm}-${dd}`;
    }
    if (debouncedSearch) params.search = debouncedSearch;
    getBagWeights(factoryId, params)
      .then((data) => {
        setHistory(data.content || []);
        setTotalPages(data.totalPages || 1);
        setTotalElements(data.totalElements || 0);
      })
      .catch(() => {
        setHistory([]);
        setTotalPages(1);
        setTotalElements(0);
      })
      .finally(() => setLoading(false));
  }, [
    factoryId,
    page,
    routeFilter,
    userIdFilter,
    selectedDate,
    debouncedSearch,
  ]);

  useEffect(() => {
    if (!factoryId) return;
    getInventoryManagersByFactory(factoryId)
      .then((data) => setUserOptions(data))
      .catch(() => setUserOptions([]));
  }, [factoryId]);

  useEffect(() => {
    getRoutesDetails(factoryId)
      .then((data) => {
        setRouteOptions(data);
      })
      .catch((err) => {
        console.error("Error fetching routes:", err);
        setRouteOptions([]);
      });
  }, [factoryId]);

  return (
    <div className="h-full">
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            Inventory Management History
          </h1>
        </Card>

        {/* Filters and Search Bar */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Supplier Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40 dark:text-muted-dark" />
            </div>
            {/* Route Filter */}
            <div>
              <select
                value={routeFilter}
                onChange={(e) => setRouteFilter(e.target.value)}
                className={selectClass}
              >
                <option value="">All Routes</option>
                {routeOptions.map((route) => (
                  <option key={route.routeId} value={route.routeId}>
                    {route.name} - {route.routeCode}
                  </option>
                ))}
              </select>
            </div>
            {/* UserId Filter */}
            <div>
              <select
                value={userIdFilter}
                onChange={(e) => setUserIdFilter(e.target.value)}
                className={selectClass}
              >
                <option value="">All Users</option>
                {userOptions.map((u) => (
                  <option key={u.userId} value={u.userId}>
                    {u.userName}
                  </option>
                ))}
              </select>
            </div>
            {/* Date Picker */}
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Date"
                className={selectClass}
                isClearable
                maxDate={new Date()}
                showIcon
                icon={<Calendar className="h-4 w-4 text-ink/40 dark:text-muted-dark" />}
              />
            </div>
            {/* Clear Filters */}
            <div>
              <Button
                variant="outline"
                icon={Filter}
                className="w-full justify-center"
                onClick={() => {
                  setSearchTerm("");
                  setRouteFilter("");
                  setUserIdFilter("");
                  setSelectedDate(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Table Header */}
        <Card>
          <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark">
            History Records
          </h2>
        </Card>

        {/* History Table */}
        <Card className="!p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-tea-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Supplier ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Supplier Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Gross Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Deductions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Net Weight
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tea-100 dark:divide-card-border-dark">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-ink/60 dark:text-muted-dark">
                      Loading...
                    </td>
                  </tr>
                ) : history.length > 0 ? (
                  history.map((item) => (
                    <tr
                      key={item.bagWeightId}
                      className="hover:bg-tea-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink dark:text-ink-dark">
                        {item.supplierId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink dark:text-ink-dark">
                        {item.supplierName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tea-700 dark:text-tea-300 font-medium">
                        {item.grossWeight} Kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 font-medium">
                        {item.deduction} Kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tea-700 dark:text-tea-300 font-medium">
                        {item.netWeight} Kg
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <EmptyState
                        icon={Clock}
                        title="No History Records Found"
                        description="No records match your current search and filter criteria."
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
            setPage={setPage}
          />
        </Card>
      </div>
    </div>
  );
}
