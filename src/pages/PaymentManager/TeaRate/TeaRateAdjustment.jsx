import React, { useState, useEffect } from "react";
import {
  fetchTeaRateRecords,
  submitTeaRate,
} from "../../../api/factoryManager";

import { Calculator, TrendingUp, Send, Table } from "lucide-react";
import Card, { CardHeader } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const months = [
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

const getDefaultRate = (month) => {
  const defaultRates = {
    1: 68,
    2: 69,
    3: 67,
    4: 70,
    5: 68,
    6: 69,
    7: 68,
    8: 67,
    9: 70,
    10: 68,
    11: 69,
    12: 68,
  };
  return defaultRates[month] || 68;
};

export default function TeaRateAdjustment() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [nsaValue, setNsaValue] = useState("");
  const [gsaValue, setGsaValue] = useState("");
  const [monthlyRate, setMonthlyRate] = useState(getDefaultRate(currentMonth));
  const [totalWeight, setTotalWeight] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);
  const [teaRateRecords, setTeaRateRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
      fetchRecords(Number(storedUserId));
    } else {
      setUserId(null);
      console.warn("User ID not found in localStorage");
    }
  }, []);

  // Fetch tea rate records from backend
  const fetchRecords = async (userIdParam) => {
    setLoading(true);
    const records = await fetchTeaRateRecords(userIdParam);
    setTeaRateRecords(records);
    setLoading(false);
  };

  // Calculations
  const calculatedRate =
    ((parseFloat(gsaValue) || 0) * (parseFloat(monthlyRate) || 0)) / 100;
  const totalPayout = calculatedRate * (parseFloat(totalWeight) || 0);

  const handleSubmit = async () => {
    if (!userId) {
      alert("User not logged in.");
      return;
    }
    if (!gsaValue || calculatedRate === 0) {
      alert("Please fill valid GSA and Monthly Rate.");
      return;
    }
    try {
      const payload = {
        userId: userId,
        month: `${2025}-${currentMonth.toString().padStart(2, "0")}`,
        nsa: parseFloat(nsaValue),
        gsa: parseFloat(gsaValue),
        monthlyRate: parseFloat(monthlyRate),
        totalWeight: parseFloat(totalWeight),
        finalRatePerKg: calculatedRate,
        totalPayout: totalPayout,
      };

      const res = await submitTeaRate(payload);

      if (res.status === 200 || res.status === 201) {
        alert("Rate submitted successfully!");
        setIsSubmitted(true);

        // Refresh tea rate records from backend
        await fetchRecords(userId);

        // Reset form
        setNsaValue("");
        setGsaValue("");
        setTotalWeight("");
        setIsSubmitted(false);
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting data.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Rate Inputs */}
        <Card>
          <div className="flex items-center mb-4 gap-2">
            <Calculator className="h-5 w-5 text-tea-700 dark:text-tea-300" />
            <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark">
              Rate Inputs
            </h2>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-ink/60 dark:text-muted-dark mb-1 block">
              Select Month
            </label>
            <select
              value={currentMonth}
              onChange={(e) => {
                const month = parseInt(e.target.value);
                setCurrentMonth(month);
                setMonthlyRate(getDefaultRate(month));
              }}
              className="w-full p-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-sm text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            >
              {months.map((m, idx) => (
                <option key={idx} value={idx + 1}>
                  {m} 2025
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-ink/60 dark:text-muted-dark">NSA</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                value={nsaValue}
                onChange={(e) => setNsaValue(e.target.value)}
                placeholder="Net Sale Average"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-ink/60 dark:text-muted-dark">GSA *</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                value={gsaValue}
                onChange={(e) => setGsaValue(e.target.value)}
                placeholder="Gross Sale Average"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-ink/60 dark:text-muted-dark">
                Monthly Rate %
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full p-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                value={monthlyRate}
                onChange={(e) =>
                  setMonthlyRate(parseFloat(e.target.value) || 0)
                }
              />

              <p className="text-xs text-ink/40 dark:text-muted-dark mt-1">
                Default: {getDefaultRate(currentMonth)}%
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-ink/60 dark:text-muted-dark">
                Total Weight (kg)
              </label>

              <input
                type="number"
                className="w-full p-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                value={totalWeight}
                onChange={(e) => setTotalWeight(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Results */}
        <Card>
          <div className="flex items-center mb-4 gap-2">
            <TrendingUp className="h-5 w-5 text-tea-700 dark:text-tea-300" />
            <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark">
              Calculation Results
            </h2>
          </div>

          <div className="bg-surface dark:bg-white/5 p-3 rounded-lg text-sm space-y-1 text-ink dark:text-ink-dark">
            <div>
              <strong>GSA:</strong> Rs. {(parseFloat(gsaValue) || 0).toFixed(2)}
            </div>
            <div>
              <strong>{monthlyRate} % of GSA: </strong> Rs.{" "}
              {calculatedRate.toFixed(2)}
            </div>
          </div>

          <div className="mt-4 border-l-4 border-tea-700 dark:border-tea-400 p-3 rounded-lg bg-tea-50/50 dark:bg-tea-900/20">
            <p className="text-xs text-ink/60 dark:text-muted-dark mb-1">Final Rate per Kg</p>
            <p className="text-lg font-heading font-bold text-tea-700 dark:text-tea-300">
              Rs. {calculatedRate.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 border-l-4 border-tea-700 dark:border-tea-400 p-3 rounded-lg bg-tea-50/50 dark:bg-tea-900/20">
            <p className="text-xs text-ink/60 dark:text-muted-dark mb-1">Total Payout</p>
            <p className="text-lg font-heading font-bold text-tea-700 dark:text-tea-300">
              Rs. {totalPayout.toLocaleString()}
            </p>
            <p className="text-xs text-ink/40 dark:text-muted-dark">
              Based on {totalWeight.toLocaleString()} kg
            </p>
          </div>

          <div className="mt-4">
            <Button
              variant={isSubmitted ? "secondary" : "primary"}
              icon={Send}
              className={`w-full ${isSubmitted ? "!bg-green-600 hover:!bg-green-600 cursor-not-allowed" : ""}`}
              onClick={handleSubmit}
              disabled={!gsaValue || calculatedRate === 0 || isSubmitted}
            >
              {isSubmitted ? "Submitted" : "Submit for Approval"}
            </Button>
          </div>
        </Card>
      </div>

      {/* Tea Rate Records Table */}
      <Card>
        <CardHeader
          title="Tea Rate Records"
          action={<Table className="h-5 w-5 text-tea-700 dark:text-tea-300" />}
        />

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-tea-700 dark:border-tea-300"></div>
              <p className="mt-2 text-ink/50 dark:text-muted-dark">Loading tea rate records...</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-tea-900">
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">Month</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">NSA (Rs.)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">GSA (Rs.)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">Monthly Rate (%)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">Total Weight (kg)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">Final Rate/Kg (Rs.)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-white">Total Payout (Rs.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tea-100 dark:divide-card-border-dark">
                {teaRateRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-tea-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2 text-sm text-ink dark:text-ink-dark">
                      {record.month
                        ? new Date(record.month).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })
                        : ""}
                    </td>
                    <td className="px-4 py-2 text-sm text-ink dark:text-ink-dark">
                      {record.nsa != null ? record.nsa.toFixed(2) : ""}
                    </td>
                    <td className="px-4 py-2 text-sm text-ink dark:text-ink-dark">
                      {record.gsa != null ? record.gsa.toFixed(2) : ""}
                    </td>
                    <td className="px-4 py-2 text-sm text-ink dark:text-ink-dark">
                      {record.monthlyRate != null
                        ? record.monthlyRate.toFixed(1)
                        : ""}
                      %
                    </td>
                    <td className="px-4 py-2 text-sm text-ink dark:text-ink-dark">
                      {record.totalWeight != null
                        ? record.totalWeight.toLocaleString()
                        : ""}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                      {record.finalRatePerKg != null
                        ? record.finalRatePerKg.toFixed(2)
                        : ""}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                      {record.totalPayout != null
                        ? record.totalPayout.toLocaleString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!loading && teaRateRecords.length === 0 && (
          <div className="text-center py-8 text-ink/50 dark:text-muted-dark">
            No tea rate records found. Submit a rate to see it in the table.
          </div>
        )}
      </Card>
    </div>
  );
}
