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

const ACCENT_COLOR = "#165E52";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";

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
  // const totalFertilizer = filteredSuppliers.reduce(
  //   (sum, s) => sum + (s.fertilizer || 0),
  //   0
  // );
  // const totalTransport = filteredSuppliers.reduce(
  //   (sum, s) => sum + (s.transport || 0),
  //   0
  // );

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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [2024, 2025];

  return (
    <div
      className="bg-white rounded-xl shadow-xl w-full min-h-[600px] mx-auto p-8 flex flex-col justify-start overflow-auto"
      style={{ borderColor: BORDER_COLOR }}
    >
      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 border-b pb-4 gap-4"
        style={{ borderColor: BORDER_COLOR }}
      >
        <div>
          <h2
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: "#256d47" }} // a pleasing green
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 font-semibold text-base shadow-sm"
              style={{
                borderColor: "#256d47",
                backgroundColor: "#d9f0e7",
                color: "#256d47",
              }}
            >
              Owner Payment Report
            </span>
          </h2>
          <p className="text-gray-600 mt-1 text-base max-w-lg">
            Summary of all supplier payments, advances, and deductions by route
            for the selected month and factory.
          </p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52]"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {monthNames.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52]"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52] capitalize"
            value={selectedFactory}
            onChange={(e) => {
              setSelectedFactory(e.target.value);
            }}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#d9f0e7] border border-[#165E52] rounded-lg p-6 flex flex-col gap-2">
          <span className="text-[#165E52] font-medium">Total Weight</span>
          <span className="text-2xl font-bold text-[#165E52]">
            {totalWeight.toLocaleString()} kg
          </span>
        </div>
        <div className="bg-[#ebf9f1] border border-[#165E52] rounded-lg p-6 flex flex-col gap-2">
          <span className="text-[#165E52] font-medium">Total Amount</span>
          <span className="text-2xl font-bold text-[#165E52]">
            LKR {totalAmount.toLocaleString()}
          </span>
        </div>
        <div className="bg-[#fef7db] border border-[#a27c00] rounded-lg p-6 flex flex-col gap-2">
          <span className="text-yellow-700 font-medium">Total Advances</span>
          <span className="text-2xl font-bold text-yellow-700">
            LKR {totalAdvances.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mb-8 flex-1">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="route"
              tick={{ fontSize: 14, fill: ACCENT_COLOR }}
            />
            <YAxis tick={{ fontSize: 14 }} />
            <Tooltip formatter={(v) => `LKR ${v.toLocaleString()}`} />
            <Legend />
            <Bar
              dataKey="totalAmount"
              fill="#22c55e"
              name="Total Amount"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="totalAdvances"
              fill="#eab308"
              name="Advances"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="totalFertilizer"
              fill="#a21caf"
              name="Fertilizer"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="totalTransport"
              fill="#0ea5e9"
              name="Transport"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-sm border">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Route",
                "Total Weight",
                "Total Amount",
                "Advances",
                "Fertilizer",
                "Transport",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chartData.map((row) => (
              <tr key={row.route}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {row.route}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#165E52] font-bold">
                  {row.totalWeight.toLocaleString()} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#165E52] font-bold">
                  LKR {row.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-yellow-700 font-bold">
                  LKR {row.totalAdvances.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-700 font-bold">
                  LKR {row.totalFertilizer.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sky-700 font-bold">
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
