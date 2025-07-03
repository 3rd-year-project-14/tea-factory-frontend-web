import { CheckCircle, AlertTriangle, User, Truck, MapPin } from "lucide-react";

export default function DriverSummaryCards({ currentView, summary }) {
  if (currentView !== "list") return null;

  const cards = [
    {
      title: "Total Drivers",
      value: summary.totalDrivers || 0,
      icon: "👨‍✈️",
      color: "emerald",
    },
    {
      title: "Available Today",
      value: summary.availableToday || 0,
      icon: CheckCircle,
      color: "emerald",
    },
    {
      title: "Assigned Drivers",
      value: summary.assignedDrivers || 0,
      icon: MapPin,
      color: "emerald",
    },
    {
      title: "On Leave",
      value: summary.onLeaveDrivers || 0,
      icon: User,
      color: "emerald",
    }, 
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => {
        const isWarning = card.color === "red";
        const isYellow = card.color === "yellow";
        const borderColor = isWarning
          ? "border-red-200"
          : isYellow
          ? "border-yellow-200"
          : "border-emerald-200";
        const hoverBorderColor = isWarning
          ? "hover:border-red-300"
          : isYellow
          ? "hover:border-yellow-300"
          : "hover:border-emerald-300";
        const textColor = isWarning
          ? "text-red-700"
          : isYellow
          ? "text-yellow-700"
          : "text-emerald-700";
        const valueColor = isWarning
          ? "text-red-800"
          : isYellow
          ? "text-yellow-800"
          : "text-emerald-800";
        const subtitleColor = isWarning
          ? "text-red-600"
          : isYellow
          ? "text-yellow-600"
          : "text-emerald-600";
        const bgColor = isWarning
          ? "bg-red-100"
          : isYellow
          ? "bg-yellow-100"
          : "bg-emerald-100";
        const iconColor = isWarning
          ? "text-red-600"
          : isYellow
          ? "text-yellow-600"
          : "text-emerald-600";

        return (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-md border ${borderColor} transition-all duration-200 hover:shadow-lg ${hoverBorderColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${textColor}`}>
                  {card.title}
                </p>
                <p className={`text-2xl font-bold ${valueColor}`}>
                  {card.value}
                </p>
                <p className={`text-xs ${subtitleColor}`}>{card.subtitle}</p>
              </div>
              <div
                className={`h-12 w-12 ${bgColor} rounded-full flex items-center justify-center`}
              >
                {typeof card.icon === "string" ? (
                  <div className={`${iconColor} text-2xl`}>{card.icon}</div>
                ) : (
                  <card.icon size={24} className={iconColor} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
