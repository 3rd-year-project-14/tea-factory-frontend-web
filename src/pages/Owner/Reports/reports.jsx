import { useEffect, useRef, useState } from "react";
import axios from "../../../api/axios";
import { getLoanRates } from "../../../api/owner";
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

const ACCENT_COLOR = "#165E52";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";

export default function OwnerReportView() {
  // Dummy/placeholder data for demonstration
  const [loanRate, setLoanRate] = useState(null);
  const [upcomingRates, setUpcomingRates] = useState([]);
  const [teaRate, setTeaRate] = useState(null);
  const [teaCollections, setTeaCollections] = useState([]);
  const [factoryGrowth, setFactoryGrowth] = useState([]);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef();

  // Fix: define handlePrint before usage
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Loan rates
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

      // Tea rates
      try {
        const res = await axios.get("/api/tea_rates");
        const teaRates = Array.isArray(res.data) ? res.data : [];
        // Find the tea rate for the current month
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        // Find the latest rate whose effectiveDate is in the current month/year
        const filtered = teaRates.filter(r => {
          const d = new Date(r.effectiveDate);
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });
        // If multiple, pick the one with the latest effectiveDate
        let finalRate = null;
        if (filtered.length > 0) {
          finalRate = filtered.reduce((a, b) => new Date(a.effectiveDate) > new Date(b.effectiveDate) ? a : b);
        }
        setTeaRate(finalRate || null);
      } catch (err) {
        setTeaRate(null);
      }

      // Dummy data for collections and growth
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
    <div className="min-h-screen bg-gray-100 p-8">
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
          /* Hide sidebar and navbar when printing */
          .sidebar, .Sidebar, .navbar, .Navbar, nav, aside {
            display: none !important;
          }
          /* Optionally, expand report to full width */
          .max-w-5xl {
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto rounded-2xl border shadow-2xl bg-white" style={{ borderColor: BORDER_COLOR }}>
        <div className="px-8 py-6 border-b flex flex-wrap gap-4 justify-between items-center print:block" style={{ backgroundColor: HEADER_BG, borderColor: BORDER_COLOR }}>
          <h2 className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>Owner Report</h2>
          <div className="flex gap-2 print:hidden">
            {/* <button
              onClick={handleDownloadPDF}
              className="px-6 py-2 rounded-lg text-white font-medium shadow transition-colors"
              style={{ backgroundColor: '#01251F' }}
            >
              Download PDF
            </button> */}
            <button
              onClick={handlePrint}
              className="px-6 py-2 rounded-lg text-white font-medium shadow transition-colors"
              style={{ backgroundColor: '#165E52' }}
            >
              Print
            </button>
          </div>
        </div>

        <div ref={reportRef} className="px-8 py-8 space-y-10">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {/* Current Loan Rate */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: ACCENT_COLOR }}>Current Loan Rate</h3>
                <div className="bg-[#f4fbf9] rounded-lg p-6 border" style={{ borderColor: BORDER_COLOR }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current Rate</p>
                      <span className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>{loanRate ? loanRate.rate + "%" : "N/A"}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Effective Date</p>
                      <span className="text-lg font-medium">{loanRate ? loanRate.effectiveDate : "N/A"}</span>
                    </div>
                  </div>
                  {upcomingRates.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-md font-semibold mb-2" style={{ color: ACCENT_COLOR }}>Upcoming Loan Rates</h4>
                      <ul className="space-y-2">
                        {upcomingRates.map((r, i) => (
                          <li key={i} className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">{r.rate}%</span>
                            <span className="text-sm text-gray-600">Effective: {r.effectiveDate}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Tea Rate */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: ACCENT_COLOR }}>Current Tea Rate</h3>
                <div className="bg-[#f4fbf9] rounded-lg p-6 border" style={{ borderColor: BORDER_COLOR }}>
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current Rate</p>
                      <span className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>Rs. {teaRate && teaRate.rate ? teaRate.rate : "N/A"}</span>
                    </div>
                    <div className="ml-8">
                      <p className="text-sm text-gray-600 mb-1">Effective Date</p>
                      <span className="text-lg font-medium">{teaRate && teaRate.effectiveDate ? teaRate.effectiveDate : "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factory Growth Table */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: ACCENT_COLOR }}>Factory Growth (%)</h3>
                <table className="w-full table-auto border-collapse border" style={{ borderColor: BORDER_COLOR }}>
                  <thead>
                    <tr style={{ backgroundColor: HEADER_BG }}>
                      <th className="py-3 px-4 border text-left" style={{ color: ACCENT_COLOR, borderColor: BORDER_COLOR }}>Factory</th>
                      <th className="py-3 px-4 border text-right" style={{ color: ACCENT_COLOR, borderColor: BORDER_COLOR }}>Growth (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {factoryGrowth.map((f, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border" style={{ borderColor: BORDER_COLOR }}>{f.factory}</td>
                        <td className="py-3 px-4 border text-right" style={{ borderColor: BORDER_COLOR }}>{f.growth}</td>
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
