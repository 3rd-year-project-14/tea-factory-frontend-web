import { Scale, DollarSign, CheckCircle, Clock } from "lucide-react";
import Card from "../../../components/ui/Card";

export default function SummaryCards({ currentView, summary }) {
  if (currentView === "routes") {
    const cards = [
      {
        label: "Total Weight",
        value: `${summary.totalWeight?.toFixed(1) || "0.0"} kg`,
        sub: `${summary.routeCount || 0} routes • ${summary.supplierCount || 0} suppliers`,
        icon: Scale,
      },
      {
        label: "Total Amount",
        value: `Rs. ${summary.total?.toLocaleString() || "0"}`,
        sub: `${summary.routeCount || 0} routes • ${summary.supplierCount || 0} suppliers`,
        icon: DollarSign,
      },
    ];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {cards.map((card, idx) => (
          <Card key={idx} hoverable>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{card.label}</p>
                <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{card.value}</p>
                <p className="text-xs text-ink/40 dark:text-muted-dark mt-1">{card.sub}</p>
              </div>
              <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
                <card.icon size={24} className="text-tea-700 dark:text-tea-300" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (currentView === "suppliers") {
    const cards = [
      {
        label: "Total Weight",
        value: `${summary.totalWeight?.toFixed(1) || "0.0"} kg`,
        icon: Scale,
        iconClass: "text-tea-700 dark:text-tea-300",
      },
      {
        label: "Total Amount",
        value: `Rs. ${summary.total?.toLocaleString() || "0"}`,
        icon: DollarSign,
        iconClass: "text-tea-700 dark:text-tea-300",
      },
      {
        label: "Paid",
        value: `Rs. ${summary.paid?.toLocaleString() || "0"}`,
        icon: CheckCircle,
        iconClass: "text-green-600 dark:text-green-400",
      },
      {
        label: "Pending",
        value: `Rs. ${summary.pending?.toLocaleString() || "0"}`,
        icon: Clock,
        iconClass: "text-amber-600 dark:text-amber-400",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card, idx) => (
          <Card key={idx} hoverable>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{card.label}</p>
                <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{card.value}</p>
              </div>
              <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
                <card.icon size={24} className={card.iconClass} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return null;
}
