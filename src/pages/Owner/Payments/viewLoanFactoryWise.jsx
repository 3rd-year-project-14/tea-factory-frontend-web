import { useLocation, useNavigate } from "react-router-dom";
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
import Button from "../../../components/ui/Button";

const factoryLoans = [
  { factory: "Factory A", amount: 120000 },
  { factory: "Factory B", amount: 90000 },
  { factory: "Factory C", amount: 80000 },
  { factory: "Factory D", amount: 60000 },
];

export default function ViewLoanFactoryWise() {
  const location = useLocation();
  const navigate = useNavigate();
  const label = location.state?.label || "Loan Amount (LKR)";
  const data = location.state?.data || factoryLoans;

  const total = data.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card max-w-2xl w-full mx-auto p-8">
      <div className="flex items-center justify-between mb-6 border-b border-tea-100 dark:border-card-border-dark pb-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-tea-600 dark:border-tea-500 bg-blue-50 dark:bg-blue-900/20 text-tea-700 dark:text-tea-300 font-semibold text-base">
              Loan Amount Given
            </span>
          </h2>
          <p className="text-ink/60 dark:text-muted-dark mt-1 text-base">
            Visual breakdown of total loan amount given to suppliers, by
            factory.
          </p>
        </div>
        <Button variant="ghost" className="!bg-gray-200 dark:!bg-white/10" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-ink/70 dark:text-ink-dark/70">
            Total Loans:
          </span>
          <span className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            LKR {total.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="factory" tick={{ fontSize: 14, fill: "#4C8D7E" }} />
            <YAxis tick={{ fontSize: 14 }} />
            <Tooltip formatter={(v) => `LKR ${v.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="amount" fill="#4C8D7E" name="Loan Amount (LKR)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-tea-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Factory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {label}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tea-100 dark:divide-card-border-dark">
            {data.map((fp) => (
              <tr key={fp.factory} className="hover:bg-tea-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-ink dark:text-ink-dark font-medium">
                  {fp.factory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-tea-700 dark:text-tea-300 font-bold">
                  LKR {fp.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
