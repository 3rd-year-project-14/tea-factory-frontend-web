import { useState } from "react";
import OwnerPaymentReport from "./OwnerPaymentReport";
import ViewAdvanceFactoryWise from "./viewAdvanceFactoryWise";
import ViewLoanFactoryWise from "./viewLoanFactoryWise";
import ViewPaymentFactoryWise from "./viewPaymentFactoryWise";

const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";

const factoryData = [
  { factory: "Factory A", teaPayment: 500000, loan: 120000, advance: 70000 },
  { factory: "Factory B", teaPayment: 350000, loan: 90000, advance: 50000 },
  { factory: "Factory C", teaPayment: 250000, loan: 80000, advance: 40000 },
  { factory: "Factory D", teaPayment: 150000, loan: 60000, advance: 20000 },
];

function Payment() {
  const [totalTeaPayment] = useState(1250000);
  const [totalLoanAmount] = useState(350000);
  const [totalAdvances] = useState(180000);
  const [popup, setPopup] = useState(null); // 'tea' | 'loan' | 'advance' | null
  const [factorySearch, setFactorySearch] = useState("");
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Helper functions for styling
  const getBorderColor = (type) => {
    switch (type) {
      case "tea":
        return ACCENT_COLOR;
      case "loan":
        return "#3b82f6";
      case "advance":
        return "#facc15";
      case "factory":
        return ACCENT_COLOR;
      default:
        return BORDER_COLOR;
    }
  };

  const getRingClass = (type) => {
    if (popup === type) {
      switch (type) {
        case "tea":
          return "ring-2 ring-[#165E52]/30";
        case "loan":
          return "ring-2 ring-[#3b82f6]/30";
        case "advance":
          return "ring-2 ring-[#facc15]/30";
        default:
          return "";
      }
    }
    return "";
  };

  const getBadgeColors = (type) => {
    switch (type) {
      case "tea":
        return {
          borderColor: ACCENT_COLOR,
          backgroundColor: "#e1f4ef",
          textColor: ACCENT_COLOR,
        };
      case "loan":
        return {
          borderColor: "#3b82f6",
          backgroundColor: "#dbeafe",
          textColor: "#1e40af",
        };
      case "advance":
        return {
          borderColor: "#facc15",
          backgroundColor: "#fef3c7",
          textColor: "#92400e",
        };
      case "factory":
        return {
          borderColor: ACCENT_COLOR,
          backgroundColor: "#d9f0e7", // very light green tint
          textColor: ACCENT_COLOR,
        };
      default:
        return {
          borderColor: BORDER_COLOR,
          backgroundColor: "#f9fafb",
          textColor: "black",
        };
    }
  };

  const getStrongTextColor = (type) => {
    switch (type) {
      case "tea":
        return ACCENT_COLOR;
      case "loan":
        return "#1e40af";
      case "advance":
        return "#92400e";
      case "factory":
        return ACCENT_COLOR;
      default:
        return "black";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className="shadow-sm border-b"
        // style={{ borderColor: BORDER_COLOR }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1
                className="text-3xl font-bold text-gray-900"
                // style={{ color: ACCENT_COLOR }}
              >
                Payments Overview
              </h1>
              <p className="text-gray-700 opacity-90 mt-1">
                Owner Dashboard - Payment Summary
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-8">
        {/* Payment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[
            {
              type: "tea",
              label: "Tea Leaves Payment",
              value: totalTeaPayment,
              description: "Total cost paid for tea leaves",
            },
            {
              type: "loan",
              label: "Loan Amount Given",
              value: totalLoanAmount,
              description: "Total loan amount given to suppliers",
            },
            {
              type: "advance",
              label: "Advances Given",
              value: totalAdvances,
              description: "Total advances given to suppliers",
            },
          ].map((card) => {
            const badge = getBadgeColors(card.type);
            const strongText = getStrongTextColor(card.type);
            return (
              <button
                key={card.type}
                onClick={() => setPopup(card.type)}
                className={`bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-[1.02] focus:outline-none ${getRingClass(
                  card.type
                )}`}
                style={{ border: `1px solid ${getBorderColor(card.type)}` }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 font-semibold text-base shadow-sm"
                      style={{
                        borderColor: badge.borderColor,
                        backgroundColor: badge.backgroundColor,
                        color: badge.textColor,
                      }}
                    >
                      {card.label}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span
                      className="block text-2xl font-bold"
                      style={{ color: strongText }}
                    >
                      LKR {card.value.toLocaleString()}
                    </span>
                  </div>
                  <div
                    className="text-sm opacity-90"
                    style={{ color: strongText }}
                  >
                    {card.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Factory Details Lookup - GREENERY THEME */}
        <section
          className={`rounded-lg shadow-md border-2 p-8 flex flex-col w-full ${getRingClass(
            "factory"
          )}`}
          style={{ borderColor: getBorderColor("factory") }}
          aria-label="Factory Details Lookup"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 font-semibold text-base shadow-sm"
                style={{
                  borderColor: ACCENT_COLOR,
                  backgroundColor: "#d9f0e7",
                  color: ACCENT_COLOR,
                }}
              >
                Factory Details Lookup
              </span>
            </div>
            <p
              className="text-base mb-2 leading-relaxed"
              style={{ color: ACCENT_COLOR }}
            >
              You can view all payment, loan, and advance details for a specific
              factory. Use the search box below to find a factory and see its
              summary.
            </p>
            <div className="w-full max-w-md relative">
              <input
                type="text"
                placeholder="Search factory name..."
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52] transition-all text-gray-900 placeholder-gray-400 mb-2"
                style={{ borderColor: BORDER_COLOR, color: ACCENT_COLOR }}
                value={factorySearch}
                onChange={(e) => {
                  setFactorySearch(e.target.value);
                  setSelectedFactory(null);
                }}
                autoComplete="off"
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                aria-label="Search factory"
              />
              {showDropdown && (
                <div className="absolute left-0 right-0 z-20 bg-white rounded-lg shadow-lg border border-gray-300 divide-y divide-gray-200 max-h-48 overflow-y-auto mt-1">
                  {factorySearch &&
                  factoryData.filter((f) =>
                    f.factory
                      .toLowerCase()
                      .includes(factorySearch.toLowerCase())
                  ).length === 0 ? (
                    <div className="p-3 text-gray-500 text-center">
                      No factories found.
                    </div>
                  ) : (
                    factoryData
                      .filter((f) =>
                        f.factory
                          .toLowerCase()
                          .includes(factorySearch.toLowerCase())
                      )
                      .map((f) => (
                        <div
                          key={f.factory}
                          className="p-3 cursor-pointer hover:bg-[#e1f4ef] rounded text-[#165E52] font-semibold transition-colors"
                          onMouseDown={() => {
                            setSelectedFactory(f);
                            setFactorySearch(f.factory);
                            setShowDropdown(false);
                          }}
                        >
                          {f.factory}
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>

            {/* Factory details modal */}
            {selectedFactory && (
              <div className="fixed inset-0 backdrop-blur-[2px] bg-white/60 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto relative p-6">
                  <button
                    onClick={() => setSelectedFactory(null)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: ACCENT_COLOR }}
                  >
                    {selectedFactory.factory}
                  </h3>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between">
                      <span
                        className="font-medium"
                        style={{ color: ACCENT_COLOR }}
                      >
                        Tea Leaves Payment:
                      </span>
                      <span className="font-bold text-green-700">
                        LKR {selectedFactory.teaPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className="font-medium"
                        style={{ color: ACCENT_COLOR }}
                      >
                        Loan Amount:
                      </span>
                      <span className="font-bold text-[#256d47]">
                        LKR {selectedFactory.loan.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className="font-medium"
                        style={{ color: ACCENT_COLOR }}
                      >
                        Advances Given:
                      </span>
                      <span className="font-bold text-yellow-700">
                        LKR {selectedFactory.advance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <section className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-4">
        <OwnerPaymentReport />
      </section>

      {/* Popup Overlay */}
      {popup && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-white/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative p-6">
            <button
              onClick={() => setPopup(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
              aria-label="Close"
            >
              &times;
            </button>
            <div>
              {popup === "tea" && <ViewPaymentFactoryWise />}
              {popup === "loan" && <ViewLoanFactoryWise />}
              {popup === "advance" && <ViewAdvanceFactoryWise />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
