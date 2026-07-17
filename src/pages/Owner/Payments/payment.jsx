import { useState } from "react";
import { TrendingUp, Users, DollarSign } from "lucide-react";
import OwnerPaymentReport from "./OwnerPaymentReport";
import ViewAdvanceFactoryWise from "./viewAdvanceFactoryWise";
import ViewLoanFactoryWise from "./viewLoanFactoryWise";
import ViewPaymentFactoryWise from "./viewPaymentFactoryWise";
import Card from "../../../components/ui/Card";

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

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
          Payments Overview
        </h1>
        <p className="text-ink/60 dark:text-muted-dark mt-1 text-sm">
          Owner Dashboard - Payment Summary
        </p>
      </Card>

      {/* Payment Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            type: "tea",
            label: "Tea Leaves Payment",
            value: totalTeaPayment,
            description: "Total cost paid for tea leaves",
            icon: TrendingUp,
          },
          {
            type: "loan",
            label: "Loan Amount Given",
            value: totalLoanAmount,
            description: "Total loan amount given to suppliers",
            icon: DollarSign,
          },
          {
            type: "advance",
            label: "Advances Given",
            value: totalAdvances,
            description: "Total advances given to suppliers",
            icon: Users,
          },
        ].map((card) => (
          <Card
            key={card.type}
            hoverable
            className="cursor-pointer flex items-center justify-between"
            onClick={() => setPopup(card.type)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setPopup(card.type);
              }
            }}
            aria-pressed={popup === card.type}
          >
            <div>
              <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{card.label}</p>
              <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">
                {card.value.toLocaleString()}
              </p>
              <p className="text-xs text-ink/40 dark:text-muted-dark mt-1">{card.description}</p>
            </div>
            <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
              <card.icon size={24} className="text-tea-700 dark:text-tea-300" />
            </div>
          </Card>
        ))}
      </section>

      {/* Factory Details Lookup Section */}
      <Card className="mb-6" aria-label="Factory Details Lookup">
        <div className="mb-2 font-heading font-semibold text-tea-700 dark:text-tea-300 text-xl select-none">
          Factory Details Lookup
        </div>

        <p className="text-base mb-4 leading-relaxed text-ink/70 dark:text-ink-dark/70">
          You can view all payment, loan, and advance details for a specific
          factory. Use the search box below to find a factory and see its
          summary.
        </p>

        <div className="w-full max-w-md relative">
          <input
            type="text"
            placeholder="Search factory name..."
            className="w-full px-4 py-3 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40 transition-all mb-2"
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
            <div className="absolute left-0 right-0 z-20 bg-card dark:bg-card-dark rounded-lg shadow-card border border-tea-100 dark:border-card-border-dark divide-y divide-tea-100 dark:divide-card-border-dark max-h-48 overflow-y-auto mt-1">
              {factorySearch &&
              factoryData.filter((f) =>
                f.factory.toLowerCase().includes(factorySearch.toLowerCase())
              ).length === 0 ? (
                <div className="p-3 text-ink/50 dark:text-muted-dark text-center">
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
                      className="p-3 cursor-pointer hover:bg-tea-50 dark:hover:bg-white/10 rounded text-tea-700 dark:text-tea-300 font-semibold transition-colors"
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

        {/* Factory Details Modal */}
        {selectedFactory && (
          <div className="fixed inset-0 backdrop-blur-[2px] bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto custom-scrollbar relative p-6">
              <button
                onClick={() => setSelectedFactory(null)}
                className="absolute top-3 right-3 text-ink/40 dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark text-2xl font-bold z-10"
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-lg font-heading font-bold text-tea-700 dark:text-tea-300">
                {selectedFactory.factory}
              </h3>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="font-medium text-ink/70 dark:text-ink-dark/70">
                    Tea Leaves Payment:
                  </span>
                  <span className="font-bold text-tea-700 dark:text-tea-300">
                    LKR {selectedFactory.teaPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-ink/70 dark:text-ink-dark/70">
                    Loan Amount:
                  </span>
                  <span className="font-bold text-tea-700 dark:text-tea-300">
                    LKR {selectedFactory.loan.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-ink/70 dark:text-ink-dark/70">
                    Advances Given:
                  </span>
                  <span className="font-bold text-tea-700 dark:text-tea-300">
                    LKR {selectedFactory.advance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Owner Payment Report Section */}
      <section className="py-2">
        <OwnerPaymentReport />
      </section>

      {/* Popup Overlay for detail views */}
      {popup && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto custom-scrollbar relative p-6">
            <button
              onClick={() => setPopup(null)}
              className="absolute top-3 right-3 text-ink/40 dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark text-2xl font-bold z-10"
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
