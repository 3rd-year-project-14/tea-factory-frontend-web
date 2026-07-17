import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLoanRate, getLoanRates } from "../../../api/owner";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

// Minimal local component to match Owner UI style
export default function LoanRates() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ effective_date: "", rate: "" });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      setLoading(true);
      try {
        const data = await getLoanRates();
        const mapped = Array.isArray(data)
          ? data.map((r) => ({
              rate_id: r.rateId || r.id || r.rate_id,
              effective_date: r.effectiveDate || r.effective_date,
              rate: r.rate,
              status: r.status ? "active" : "expired",
            }))
          : [];
        setRecords(mapped);
      } catch (err) {
        setNotification("Failed to fetch loan rates");
      }
      setLoading(false);
    }
    fetchRates();
  }, []);

  const openAdd = () => setShowAdd(true);
  const closeAdd = () => setShowAdd(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        rate: Number(form.rate),
        effectiveDate: form.effective_date,
        status: true,
      };
      const newRecord = await createLoanRate(payload);
      const mapped = {
        rate_id: newRecord.rateId || newRecord.id || newRecord.rate_id,
        effective_date: newRecord.effectiveDate || newRecord.effective_date,
        rate: newRecord.rate,
        status: newRecord.status ? "active" : "expired",
      };
      setRecords((r) => [mapped, ...r]);
      setNotification("Loan rate added");
      setForm({ effective_date: "", rate: "" });
      closeAdd();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification("Failed to add loan rate");
    }
  };

  return (
    <div className="min-h-full">
      {notification && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-white bg-green-600 shadow-card">
          {notification}
        </div>
      )}

      <Card className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 mb-1">
          Loan Rates
        </h1>
        <p className="text-sm text-ink/60 dark:text-muted-dark">
          Owner Dashboard - Manage Loan Rates
        </p>
      </Card>

      {/* Add Loan Rate Form */}
      <Card className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark mb-4">
          Add Loan Rate
        </h3>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-wrap items-end gap-4 w-full">
            <div className="flex flex-col flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                Effective Date
              </label>
              <input
                type="date"
                value={form.effective_date}
                onChange={(e) => setForm((f) => ({ ...f, effective_date: e.target.value }))}
                className="block w-full rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                required
              />
            </div>

            <div className="flex flex-col flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.rate}
                onChange={(e) => setForm((f) => ({ ...f, rate: e.target.value }))}
                className="block w-full rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                required
              />
            </div>

            <div className="flex flex-col justify-end">
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Current Month's Loan Rate Display */}
      <Card className="mb-6">
        <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark mb-4">
          Current Month's Loan Rate
        </h2>
        {(() => {
          const now = new Date();
          const current = records.find((r) => {
            if (!r.effective_date) return false;
            const d = new Date(r.effective_date);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
          });
          if (current) {
            return (
              <div className="p-4 rounded-lg bg-tea-50 dark:bg-tea-900/20 flex flex-col md:flex-row md:items-center gap-4">
                <span className="text-tea-700 dark:text-tea-300 font-bold text-xl">Rate: {current.rate}%</span>
                <span className="text-tea-700 dark:text-tea-300">Effective Date: {current.effective_date}</span>
                <span className="text-tea-700 dark:text-tea-300">Status: {current.status}</span>
              </div>
            );
          } else {
            return (
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300">
                No rate found for this month.
              </div>
            );
          }
        })()}
      </Card>

      {/* Loan Rate Records List */}
      <Card>
        <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark mb-4">
          Loan Rate Records
        </h2>
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b border-tea-100 dark:border-card-border-dark">
                <th className="py-3 pr-4 text-ink/70 dark:text-ink-dark/70">Rate ID</th>
                <th className="py-3 pr-4 text-ink/70 dark:text-ink-dark/70">Effective Date</th>
                <th className="py-3 pr-4 text-ink/70 dark:text-ink-dark/70">Rate (%)</th>
                <th className="py-3 pr-4 text-ink/70 dark:text-ink-dark/70">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => {
                let isCurrentMonth = false;
                if (r.effective_date) {
                  const d = new Date(r.effective_date);
                  const now = new Date();
                  isCurrentMonth = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }
                return (
                  <tr
                    key={r.rate_id}
                    className={`border-b border-tea-100 dark:border-card-border-dark hover:bg-tea-50 dark:hover:bg-white/5 transition-colors ${
                      isCurrentMonth ? "bg-tea-50 dark:bg-tea-900/20" : ""
                    }`}
                  >
                    <td className="py-3 pr-4 text-ink dark:text-ink-dark">{r.rate_id}</td>
                    <td className={`py-3 pr-4 ${isCurrentMonth ? "text-tea-700 dark:text-tea-300 font-bold" : "text-ink dark:text-ink-dark"}`}>
                      {r.effective_date}
                    </td>
                    <td className="py-3 pr-4 text-ink dark:text-ink-dark">{r.rate}</td>
                    <td className="py-3 pr-4 text-ink dark:text-ink-dark">{r.status ?? "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
