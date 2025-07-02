export default function SummaryCards({ currentView, summary }) {
  if (currentView === "routes") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Total Weight Card */}
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="text-orange-600 text-sm font-medium">
            Total Weight
          </div>
          <div className="text-2xl font-bold text-[#2c2c2c]">
            {summary.totalWeight?.toFixed(1) || "0.0"} kg
          </div>
          <div className="text-xs text-[#666] mt-1">
            {summary.routeCount || 0} routes • {summary.supplierCount || 0}{" "}
            suppliers
          </div>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="text-green-600 text-sm font-medium">Total Amount</div>
          <div className="text-2xl font-bold text-[#2c2c2c]">
            Rs. {summary.total?.toLocaleString() || "0"}
          </div>
          <div className="text-xs text-[#666] mt-1">
            {summary.routeCount || 0} routes • {summary.supplierCount || 0}{" "}
            suppliers
          </div>
        </div>
      </div>
    );
  } else if (currentView === "suppliers") {
    const cards = [
      {
        label: "Total Weight",
        value: `${summary.totalWeight?.toFixed(1) || "0.0"} kg`,
        colorClass: "text-orange-600 border-orange-500",
      },
      {
        label: "Total Amount",
        value: `Rs. ${summary.total?.toLocaleString() || "0"}`,
        colorClass: "text-blue-600 border-blue-500",
      },
      {
        label: "Paid",
        value: `Rs. ${summary.paid?.toLocaleString() || "0"}`,
        colorClass: "text-green-600 border-green-500",
      },
      {
        label: "Pending",
        value: `Rs. ${summary.pending?.toLocaleString() || "0"}`,
        colorClass: "text-orange-600 border-orange-500",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-xl shadow-md border-l-4 ${
              card.colorClass.split(" ")[1]
            }`}
          >
            <div
              className={`${card.colorClass.split(" ")[0]} text-sm font-medium`}
            >
              {card.label}
            </div>
            <div className="text-2xl font-bold text-[#2c2c2c]">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
