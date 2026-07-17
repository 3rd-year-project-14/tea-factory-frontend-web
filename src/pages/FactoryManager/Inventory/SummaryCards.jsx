import { Package, Scale, BarChart2 } from "lucide-react";
import Card from "../../../components/ui/Card";

export default function SummaryCards({ currentView, summary }) {
  if (currentView !== "routes" && currentView !== "suppliers") return null;

  const cards = [
    {
      label: "Total Weight",
      value: `${summary.totalWeight?.toFixed(1) || "0.0"} kg`,
      icon: Scale,
    },
    {
      label: "Total Bags",
      value: `${summary.totalBags || "0"}`,
      icon: Package,
    },
    {
      label: "Net Weight",
      value: `${summary.netWeight?.toFixed(1) || "0.0"} kg`,
      icon: BarChart2,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map(({ label, value, icon: Icon }, index) => (
        <Card key={index} hoverable>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{label}</p>
              <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{value}</p>
            </div>
            <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
              <Icon size={24} className="text-tea-700 dark:text-tea-300" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
