import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { routes, suppliers } from "../../PaymentManager/Payments/paymentData";

const factoryOptions = Array.from(
  new Set(suppliers.map((s) => s.factory))
).filter(Boolean);

export default function OwnerPaymentReport() {
  const [selectedMonth, setSelectedMonth] = useState(5); // June (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedFactory, setSelectedFactory] = useState("All");

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      if (!s.paymentDate) return false;
      const d = new Date(s.paymentDate);
      const matchesMonth =
        d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
      const matchesFactory =
        selectedFactory === "All" || s.factory === selectedFactory;
      return matchesMonth && matchesFactory;
    });
  }, [selectedMonth, selectedYear, selectedFactory]);

  const totalWeight = filteredSuppliers.reduce(
    (sum, s) => sum + (s.totalWeight || 0),
    0
  );
  const totalAmount = filteredSuppliers.reduce(
    (sum, s) => sum + (s.finalAmount || 0),
    0
  );
  const totalAdvances = filteredSuppliers.reduce(
    (sum, s) => sum + (s.advances || 0),
    0
  );

  const chartData = routes.map((route) => {
    const routeSuppliers = filteredSuppliers.filter(
      (s) => s.routeId === route.id
    );
    return {
      route: route.routeName,
      totalWeight: routeSuppliers.reduce(
        (sum, s) => sum + (s.totalWeight || 0),
        0
      ),
      totalAmount: routeSuppliers.reduce(
        (sum, s) => sum + (s.finalAmount || 0),
        0
      ),
      totalAdvances: routeSuppliers.reduce(
        (sum, s) => sum + (s.advances || 0),
        0
      ),
      totalFertilizer: routeSuppliers.reduce(
        (sum, s) => sum + (s.fertilizer || 0),
        0
      ),
      totalTransport: routeSuppliers.reduce(
        (sum, s) => sum + (s.transport || 0),
        0
      ),
    };
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = [2024, 2025];

  return (
    <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card w-full min-h-[600px] mx-auto p-8 flex flex-col justify-start overflow-auto border border-tea-100 dark:border-card-border-dark">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 border-b border-tea-100 dark:border-card-border-dark pb-4 gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold flex items-center gap-4 text-tea-700 dark:text-tea-300">
            Owner Payment Report
          </h2>
          <p className="text-ink/60 dark:text-muted-dark mt-1 text-base max-w-lg">
            Summary of all supplier payments, advances, and deductions by route
            for the selected month and factory.
          </p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <select
            className="rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 px-3 py-2 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            aria-label="Select month"
          >
            {monthNames.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            className="rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 px-3 py-2 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            aria-label="Select year"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            className="rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 px-3 py-2 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40 capitalize"
            value={selectedFactory}
            onChange={(e) => setSelectedFactory(e.target.value)}
            aria-label="Select factory"
          >
            <option value="All">All Factories</option>
            {factoryOptions.map((f) => (
              <option key={f} value={f} className="capitalize">
                {f.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Totals Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border border-tea-100 dark:border-card-border-dark rounded-lg p-6 flex flex-col gap-2 bg-surface dark:bg-white/5">
          <span className="text-tea-700 dark:text-tea-300 font-medium select-none">
            Total Weight
          </span>
          <span className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 select-text">
            {totalWeight.toLocaleString()} kg
          </span>
        </div>
        <div className="border border-tea-100 dark:border-card-border-dark rounded-lg p-6 flex flex-col gap-2 bg-surface dark:bg-white/5">
          <span className="text-tea-700 dark:text-tea-300 font-medium select-none">
            Total Amount
          </span>
          <span className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 select-text">
            LKR {totalAmount.toLocaleString()}
          </span>
        </div>
        <div className="border border-tea-100 dark:border-card-border-dark rounded-lg p-6 flex flex-col gap-2 bg-surface dark:bg-white/5">
          <span className="text-tea-700 dark:text-tea-300 font-medium select-none">
            Total Advances
          </span>
          <span className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 select-text">
            LKR {totalAdvances.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-8 flex-1">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cfece6" />
            <XAxis dataKey="route" tick={{ fontSize: 14, fill: "#165E52" }} />
            <YAxis tick={{ fontSize: 14, fill: "#165E52" }} />
            <Tooltip
              formatter={(v) => `LKR ${v.toLocaleString()}`}
              contentStyle={{ borderRadius: 6, borderColor: "#165E52" }}
            />
            <Legend wrapperStyle={{ color: "#165E52" }} />
            <Bar dataKey="totalAmount" fill="#165E52" name="Total Amount" radius={[8, 8, 0, 0]} />
            <Bar dataKey="totalAdvances" fill="#4C8D7E" name="Advances" radius={[8, 8, 0, 0]} />
            <Bar dataKey="totalFertilizer" fill="#82BCAA" name="Fertilizer" radius={[8, 8, 0, 0]} />
            <Bar dataKey="totalTransport" fill="#CFECE6" name="Transport" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg overflow-hidden border border-tea-100 dark:border-card-border-dark">
          <thead className="bg-tea-900">
            <tr>
              {["Route", "Total Weight", "Total Amount", "Advances", "Fertilizer", "Transport"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider select-none"
                  scope="col"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-tea-100 dark:divide-card-border-dark">
            {chartData.map((row) => (
              <tr
                key={row.route}
                className="hover:bg-tea-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                tabIndex={0}
                aria-label={`Details for route ${row.route}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-tea-700 dark:text-tea-300 font-medium select-text">
                  {row.route}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-tea-700 dark:text-tea-300 font-bold select-text">
                  {row.totalWeight.toLocaleString()} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-tea-700 dark:text-tea-300 font-bold select-text">
                  LKR {row.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-700 dark:text-green-300 font-bold select-text">
                  LKR {row.totalAdvances.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-teal-800 dark:text-teal-300 font-bold select-text">
                  LKR {row.totalFertilizer.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-800 dark:text-green-300 font-bold select-text">
                  LKR {row.totalTransport.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
