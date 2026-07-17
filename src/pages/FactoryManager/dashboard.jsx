import React, { useState } from "react";
import {
  Users2,
  Truck,
  Leaf,
  AlertCircle,
  Clock,
  TriangleAlert,
  MoveRight,
  Megaphone,
} from "lucide-react";
import TeaSupplyChart from "../../components/charts/TeaSupplyChart";
import Card, { CardHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const ALERT_STYLES = {
  danger: {
    bg: "bg-red-50 dark:bg-[#3A1F1F]",
    border: "border-red-500 dark:border-[#F87171]",
    text: "text-red-700 dark:text-red-300",
    icon: "text-red-600 dark:text-[#F87171]",
  },
  warning: {
    bg: "bg-orange-50 dark:bg-[#3A2F1F]",
    border: "border-orange-400 dark:border-[#FBBF24]",
    text: "text-orange-700 dark:text-orange-300",
    icon: "text-orange-600 dark:text-[#FBBF24]",
  },
};

export default function FactoryManagerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  const handlePeriodChange = (period) => setSelectedPeriod(period);

  const getDashboardData = () => {
    switch (selectedPeriod) {
      case "daily":
        return {
          totalTea: "3,480",
          activeSuppliers: "81",
          driversOnDuty: "6",
          period: "Today's",
        };
      case "monthly":
        return {
          totalTea: "78,520",
          activeSuppliers: "345",
          driversOnDuty: "25",
          period: "This Month's",
        };
      case "yearly":
        return {
          totalTea: "1,250,000",
          activeSuppliers: "1,284",
          driversOnDuty: "48",
          period: "This Year's",
        };
      default:
        return getDashboardData("daily");
    }
  };

  const dashboardData = getDashboardData();

  const alerts = [
    {
      type: "danger",
      icon: AlertCircle,
      title: "Driver Emergency",
      message: "Vehicle breakdown reported by Driver Pasindu",
      time: "2 min ago",
    },
    {
      type: "danger",
      icon: Clock,
      title: "Late Supplier Warning",
      message: "5 suppliers didn't mark supply before 4PM",
      time: "15 min ago",
    },
    {
      type: "warning",
      icon: TriangleAlert,
      title: "Low Fertilizer Stock",
      message: "Urea stock below minimum threshold",
      time: "1 hour ago",
    },
    {
      type: "danger",
      icon: MoveRight,
      title: "Route Delay",
      message: "Route TR-05 delayed due to weather conditions",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="min-h-full">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-tea-800 to-tea-600 rounded-2xl shadow-card p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-white">
              Dashboard Home
            </h1>
            <Button
              as="a"
              href="/factoryManager/payment/proceed"
              variant="secondary"
              size="sm"
            >
              Proceed Payment
            </Button>
            <Button
              as="a"
              href="/factoryManager/payment/main"
              variant="outline"
              size="sm"
              className="!border-white/40 !text-white hover:!bg-white/10"
            >
              View Main
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-white/10 rounded-lg overflow-hidden">
              {["daily", "monthly", "yearly"].map((period) => (
                <button
                  key={period}
                  onClick={() => handlePeriodChange(period)}
                  className={`px-4 py-2 font-medium text-sm min-w-[80px] transition duration-200 ${
                    selectedPeriod === period
                      ? "bg-white text-tea-800"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            <input
              type="date"
              defaultValue="2025-07-04"
              className="p-2 rounded-lg text-sm min-w-[140px] text-ink bg-white focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: `${dashboardData.period} Total Tea Collected (kg)`,
            value: dashboardData.totalTea,
            icon: Leaf,
          },
          {
            label: `Active Suppliers ${
              selectedPeriod === "daily"
                ? "Today"
                : selectedPeriod === "monthly"
                ? "This Month"
                : "This Year"
            }`,
            value: dashboardData.activeSuppliers,
            icon: Users2,
          },
          {
            label: "Drivers on Duty",
            value: dashboardData.driversOnDuty,
            icon: Truck,
          },
        ].map((card, index) => (
          <Card key={index} hoverable>
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
                <card.icon size={24} className="text-tea-700 dark:text-tea-300" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader
            title="Tea Collection Trends"
            subtitle={
              selectedPeriod === "daily"
                ? "Last 7 Days"
                : selectedPeriod === "monthly"
                ? "Last 12 Months"
                : "Last 6 Years"
            }
          />
          <div className="flex-1 min-h-[350px] flex items-center justify-center">
            <div className="w-full h-full">
              <TeaSupplyChart
                period={selectedPeriod}
                height={320}
                primaryColor="#4A7C59"
              />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Alerts & Notifications" />
          <div className="space-y-3">
            {alerts.map((alert, i) => {
              const style = ALERT_STYLES[alert.type];
              const Icon = alert.icon;
              return (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${style.bg} ${style.border}`}
                >
                  <div className="flex items-start gap-2">
                    <Icon size={20} className={`mt-0.5 shrink-0 ${style.icon}`} />
                    <div>
                      <div className={`text-sm font-medium ${style.text}`}>
                        {alert.title}
                      </div>
                      <div className="text-xs text-ink/60 dark:text-muted-dark mt-1">
                        {alert.message}
                      </div>
                      <div className="text-xs text-ink/40 dark:text-muted-dark mt-1">
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader title="Pending Approvals Summary" />
          <div className="space-y-1">
            {[
              { label: "New Supplier Registrations", count: 5 },
              { label: "Fertilizer Requests", count: 3 },
              { label: "Advance Requests", count: 2 },
              { label: "Routes Without Driver", count: 1 },
              { label: "System Notifications", count: 4 },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-tea-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-ink/80 dark:text-ink-dark text-sm">
                  {item.label}
                </span>
                <span className="font-bold text-sm text-tea-700 dark:text-tea-300">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Quick Actions" />
          <div className="space-y-3">
            {[
              { label: "Add New Route", icon: Leaf },
              { label: "Manage Drivers", icon: Users2 },
              { label: "Update Inventory", icon: Truck },
              { label: "Send Announcement", icon: Megaphone },
            ].map((action, i) => (
              <Button key={i} variant="primary" className="w-full justify-start" icon={action.icon}>
                {action.label}
              </Button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Recent Activity" />
          <div className="space-y-3">
            {[
              { time: "4:15 PM", text: "Supplier SP-045 marked 3 bags collected" },
              { time: "4:10 PM", text: "Driver D-03 started Route TR-02" },
              { time: "3:45 PM", text: "Driver assigned to new route TR-05" },
              { time: "3:30 PM", text: "Route TR-01 completed successfully" },
              { time: "3:15 PM", text: "New supplier SP-087 registered" },
            ].map((activity, i, arr) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  i < arr.length - 1 ? "pb-3 border-b border-tea-100 dark:border-card-border-dark" : ""
                }`}
              >
                <div className="text-xs text-ink/50 dark:text-muted-dark min-w-[50px] pt-0.5">
                  {activity.time}
                </div>
                <div className="flex-1 text-sm text-ink/80 dark:text-ink-dark">
                  {activity.text}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
