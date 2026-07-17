import { useEffect, useRef, useState } from "react";
import axios from "../../../api/axios";
import { getLoanRates } from "../../../api/owner";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

// Dynamically load html2pdf.js when needed
function loadHtml2PdfScript() {
  return new Promise((resolve, reject) => {
    if (window.html2pdf) return resolve(window.html2pdf);
    const existing = document.querySelector('script[src*="html2pdf"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.html2pdf));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => resolve(window.html2pdf);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function OwnerReportView() {
  const [loanRate, setLoanRate] = useState(null);
  const [upcomingRates, setUpcomingRates] = useState([]);
  const [teaRate, setTeaRate] = useState(null);
  const [teaCollections, setTeaCollections] = useState([]);
  const [factoryGrowth, setFactoryGrowth] = useState([]);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const rates = await getLoanRates();
        const today = new Date().toISOString().slice(0, 10);
        let current = null;
        let futureRates = [];
        if (Array.isArray(rates)) {
          const sorted = rates.sort((a, b) => new Date(a.effectiveDate) - new Date(b.effectiveDate));
          current = sorted.filter(r => new Date(r.effectiveDate) <= new Date(today)).pop();
          futureRates = sorted.filter(r => new Date(r.effectiveDate) > new Date(today));
        }
        setLoanRate(current || null);
        setUpcomingRates(futureRates);
      } catch (err) {
        setLoanRate(null);
        setUpcomingRates([]);
      }

      try {
        const res = await axios.get("/api/tea_rates/approved");
        const teaRates = Array.isArray(res.data) ? res.data : [];
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const filtered = teaRates.filter(r => {
          const d = new Date(r.effectiveDate);
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });
        let finalRate = null;
        if (filtered.length > 0) {
          finalRate = filtered.reduce((a, b) => new Date(a.effectiveDate) > new Date(b.effectiveDate) ? a : b);
        }
        setTeaRate(finalRate || null);
      } catch (err) {
        setTeaRate(null);
      }

      setTeaCollections([
        { date: "2025-10-01", factory: "Factory A", amount: 1200 },
        { date: "2025-10-01", factory: "Factory B", amount: 950 },
        { date: "2025-10-01", factory: "Factory C", amount: 1100 },
      ]);
      setFactoryGrowth([
        { factory: 'Andaradeniya Tea Factory', growth: 11.3 },
        { factory: 'Batuwangala Tea Factory', growth: 9.7 },
        { factory: 'Ruhuna Tea Factory', growth: 13.2 },
        { factory: 'Duli Ella Tea Factory', growth: 7.8 },
        { factory: 'Fortune Tea Factory', growth: 10.5 },
        { factory: 'Waulugala Tea Factory', growth: 8.9 },
        { factory: 'Williegroup Tea Factory', growth: 12.1 },
        { factory: 'Devonia Tea Factory', growth: 14.4 },
        { factory: 'Galaxy Tea Factory', growth: 10.9 },
        { factory: 'Nivithigala Tea Factory', growth: 9.3 },
      ]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleDownloadPDF = async () => {
    try {
      let html2pdf = window.html2pdf;
      if (!html2pdf) {
        await loadHtml2PdfScript();
        html2pdf = window.html2pdf;
      }
      if (!html2pdf) {
        alert('Failed to load PDF library. Please check your internet connection.');
        return;
      }
      html2pdf()
        .set({
          margin: 0.5,
          filename: 'owner_dashboard_report.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        })
        .from(reportRef.current)
        .save();
    } catch (err) {
      alert('PDF download failed. Please try again.');
    }
  };

  return (
    <div className="min-h-full">
      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .shadow, .shadow-2xl, .rounded-2xl, .rounded-lg, .border {
            box-shadow: none !important;
            border: none !important;
          }
          .bg-white, .bg-gray-100, .bg-\\[\\#f4fbf9\\] {
            background: white !important;
          }
          .px-8, .py-8, .py-6, .px-4, .py-2 {
            padding: 0 !important;
          }
          .min-h-screen {
            min-height: auto !important;
          }
          .sidebar, .Sidebar, .navbar, .Navbar, nav, aside {
            display: none !important;
          }
          .max-w-5xl {
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto rounded-2xl border border-tea-100 dark:border-card-border-dark shadow-card bg-card dark:bg-card-dark">
        <div className="px-8 py-6 border-b border-tea-100 dark:border-card-border-dark flex flex-wrap gap-4 justify-between items-center print:block bg-tea-50 dark:bg-tea-900/20 rounded-t-2xl">
          <h2 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">Owner Report</h2>
          <div className="flex gap-2 print:hidden">
            <Button variant="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </div>

        <div ref={reportRef} className="px-8 py-8 space-y-10">
          {loading ? (
            <div className="text-ink/60 dark:text-muted-dark">Loading...</div>
          ) : (
            <>
              {/* Current Loan Rate */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4 text-tea-700 dark:text-tea-300">
                  Current Loan Rate
                </h3>
                <div className="bg-surface dark:bg-white/5 rounded-lg p-6 border border-tea-100 dark:border-card-border-dark">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-ink/60 dark:text-muted-dark mb-1">Current Rate</p>
                      <span className="text-3xl font-heading font-bold text-tea-700 dark:text-tea-300">
                        {loanRate ? loanRate.rate + "%" : "N/A"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-ink/60 dark:text-muted-dark mb-1">Effective Date</p>
                      <span className="text-lg font-medium text-ink dark:text-ink-dark">
                        {loanRate ? loanRate.effectiveDate : "N/A"}
                      </span>
                    </div>
                  </div>
                  {upcomingRates.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-md font-semibold mb-2 text-tea-700 dark:text-tea-300">
                        Upcoming Loan Rates
                      </h4>
                      <ul className="space-y-2">
                        {upcomingRates.map((r, i) => (
                          <li key={i} className="flex justify-between items-center">
                            <span className="font-medium text-ink/80 dark:text-ink-dark/80">{r.rate}%</span>
                            <span className="text-sm text-ink/60 dark:text-muted-dark">Effective: {r.effectiveDate}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Tea Rate */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4 text-tea-700 dark:text-tea-300">
                  Current Tea Rate
                </h3>
                <div className="bg-surface dark:bg-white/5 rounded-lg p-6 border border-tea-100 dark:border-card-border-dark">
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-ink/60 dark:text-muted-dark mb-1">Current Rate</p>
                      <span className="text-3xl font-heading font-bold text-tea-700 dark:text-tea-300">
                        Rs. {teaRate && teaRate.rate ? teaRate.rate : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factory Growth Table */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4 text-tea-700 dark:text-tea-300">
                  Factory Growth (%)
                </h3>
                <table className="w-full table-auto border-collapse border border-tea-100 dark:border-card-border-dark">
                  <thead>
                    <tr className="bg-tea-50 dark:bg-tea-900/20">
                      <th className="py-3 px-4 border border-tea-100 dark:border-card-border-dark text-left text-tea-700 dark:text-tea-300">
                        Factory
                      </th>
                      <th className="py-3 px-4 border border-tea-100 dark:border-card-border-dark text-right text-tea-700 dark:text-tea-300">
                        Growth (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {factoryGrowth.map((f, idx) => (
                      <tr key={idx} className="hover:bg-tea-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 border border-tea-100 dark:border-card-border-dark text-ink dark:text-ink-dark">
                          {f.factory}
                        </td>
                        <td className="py-3 px-4 border border-tea-100 dark:border-card-border-dark text-right text-ink dark:text-ink-dark">
                          {f.growth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
