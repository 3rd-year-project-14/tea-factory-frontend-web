export default function SummaryCards({ currentView, summary }) {
  if (currentView === "routes") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Total Weight Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Total Weight
              </p>
              <p className="text-2xl font-bold text-emerald-800">
                {summary.totalWeight?.toFixed(1) || "0.0"} kg
              </p>
              <p className="text-xs text-emerald-600">
                {summary.routeCount || 0} routes • {summary.supplierCount || 0}{" "}
                suppliers
              </p>
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <div className="text-emerald-600 text-2xl">⚖️</div>
            </div>
          </div>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Total Amount
              </p>
              <p className="text-2xl font-bold text-emerald-800">
                Rs. {summary.total?.toLocaleString() || "0"}
              </p>
              <p className="text-xs text-emerald-600">
                {summary.routeCount || 0} routes • {summary.supplierCount || 0}{" "}
                suppliers
              </p>
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <div className="text-emerald-600 text-2xl">💰</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (currentView === "suppliers") {
    const cards = [
      {
        label: "Total Weight",
        value: `${summary.totalWeight?.toFixed(1) || "0.0"} kg`,
        colorClass: "text-emerald-800",
        bgColorClass: "bg-emerald-100",
        iconColorClass: "text-emerald-600",
        emoji: "⚖️",
      },
      {
        label: "Total Amount",
        value: `Rs. ${summary.total?.toLocaleString() || "0"}`,
        colorClass: "text-emerald-800",
        bgColorClass: "bg-blue-100",
        iconColorClass: "text-blue-600",
        emoji: "💰",
      },
      {
        label: "Paid",
        value: `Rs. ${summary.paid?.toLocaleString() || "0"}`,
        colorClass: "text-emerald-800",
        bgColorClass: "bg-green-100",
        iconColorClass: "text-green-600",
        emoji: "✅",
      },
      {
        label: "Pending",
        value: `Rs. ${summary.pending?.toLocaleString() || "0"}`,
        colorClass: "text-emerald-800",
        bgColorClass: "bg-orange-100",
        iconColorClass: "text-orange-600",
        emoji: "⏳",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  {card.label}
                </p>
                <p className={`text-2xl font-bold ${card.colorClass}`}>
                  {card.value}
                </p>
              </div>
              <div
                className={`h-12 w-12 ${card.bgColorClass} rounded-full flex items-center justify-center`}
              >
                <div className={`${card.iconColorClass} text-2xl`}>
                  {card.emoji}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
