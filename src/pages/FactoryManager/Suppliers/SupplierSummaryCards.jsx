import { Users, Clock, X } from "lucide-react";

export default function SupplierSummaryCards({
  metrics,
  currentView,
  setCurrentView,
}) {
  const getBorderColor = (type) => {
    switch (type) {
      case "approved":
        return "#000000";
      case "pending":
        return "#f59e0b";
      case "rejected":
        return "#ef4444";
      default:
        return "#d1d5db"; // default gray-300
    }
  };

  const getRingClass = (type) => {
    if (type === "approved") return ""; // No ring for approved
    if (currentView === type) {
      switch (type) {
        case "pending":
          return "ring-2 ring-[#f59e0b]/30";
        case "rejected":
          return "ring-2 ring-[#ef4444]/30";
        default:
          return "";
      }
    }
    return "";
  };

  const cards = [
    {
      type: "approved",
      label: "Total Suppliers",
      value: metrics.approved,
      icon: <Users size={30} color="black" />,
    },
    {
      type: "pending",
      label: "Pending Requests",
      value: metrics.pending,
      icon: <Clock size={30} color="black" />,
    },
    {
      type: "rejected",
      label: "Rejected",
      value: metrics.rejected,
      icon: <X size={30} color="#ef4444" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => {
        const isApproved = card.type === "approved";
        return (
          <div
            key={card.type}
            onClick={() => setCurrentView(card.type)}
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-transform ${
              !isApproved ? "hover:scale-[1.02]" : "hover:shadow-none"
            } ${getRingClass(card.type)}`}
            style={{
              border: `1px solid ${getBorderColor(card.type)}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">{card.label}</p>
                <p className="text-2xl font-bold text-black">{card.value}</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                {card.icon}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
