import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import Card from "../../../components/ui/Card";

export default function FertilizerSummaryCards({
  metrics,
  currentView,
  setCurrentView,
}) {
  const cards = [
    {
      type: "all",
      label: "All Requests",
      value: metrics.total,
      icon: Package,
      iconClass: "text-ink/70 dark:text-ink-dark/70",
    },
    {
      type: "pending",
      label: "Pending Requests",
      value: metrics.pending,
      icon: Clock,
      iconClass: "text-amber-600 dark:text-amber-400",
    },
    {
      type: "approved",
      label: "Approved Requests",
      value: metrics.approved,
      icon: CheckCircle,
      iconClass: "text-tea-700 dark:text-tea-300",
    },
    {
      type: "rejected",
      label: "Rejected Requests",
      value: metrics.rejected,
      icon: XCircle,
      iconClass: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const isActive = currentView === card.type;
        const Icon = card.icon;
        return (
          <Card
            key={card.type}
            hoverable
            onClick={() => setCurrentView(card.type)}
            className={`cursor-pointer transition-all duration-200 ${
              isActive
                ? "ring-2 ring-tea-500 shadow-card scale-[1.02]"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">
                  {card.label}
                </p>
                <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">
                  {card.value}
                </p>
              </div>
              <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
                <Icon size={24} className={card.iconClass} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
