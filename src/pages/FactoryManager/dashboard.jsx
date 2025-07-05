import React, { useState } from "react";
import TeaSupplyChart from "../../components/charts/TeaSupplyChart";

export default function FactoryManagerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  // Dynamic data based on selected period
  const getDashboardData = () => {
    switch (selectedPeriod) {
      case "daily":
        return {
          totalTea: "3,480",
          activeSuppliers: "81",
          driversOnDuty: "6",
          fertilizerStock: "85%",
          period: "Today's",
        };
      case "monthly":
        return {
          totalTea: "78,520",
          activeSuppliers: "345",
          driversOnDuty: "25",
          fertilizerStock: "78%",
          period: "This Month's",
        };
      case "yearly":
        return {
          totalTea: "1,250,000",
          activeSuppliers: "1,284",
          driversOnDuty: "48",
          fertilizerStock: "92%",
          period: "This Year's",
        };
      default:
        return getDashboardData("daily");
    }
  };

  const dashboardData = getDashboardData();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-emerald-800 mb-1">
            Dashboard Home
          </h1>
          <div className="filter-section float-right -mt-11 flex items-center gap-4">
            <div className="period-filter flex bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => handlePeriodChange("daily")}
                className={`period-btn px-4 py-2 font-medium text-sm border-r border-gray-200 transition-all duration-300 ${
                  selectedPeriod === "daily"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-white text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => handlePeriodChange("monthly")}
                className={`period-btn px-4 py-2 font-medium text-sm border-r border-gray-200 transition-all duration-300 ${
                  selectedPeriod === "monthly"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-white text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handlePeriodChange("yearly")}
                className={`period-btn px-4 py-2 font-medium text-sm transition-all duration-300 ${
                  selectedPeriod === "yearly"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-white text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Yearly
              </button>
            </div>
            <div className="date-filter flex items-center">
              <span className="filter-label text-sm text-emerald-700 font-medium mr-2">
                Date:
              </span>
              <input
                type="date"
                id="dateFilter"
                defaultValue="2025-07-04"
                className="p-2 border border-gray-300 rounded-md text-sm min-w-[140px] text-gray-900 bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  {dashboardData.period} Total Tea Collected (kg)
                </p>
                <p className="text-2xl font-bold text-emerald-800">
                  {dashboardData.totalTea}
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-2xl">🍃</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  Active Suppliers{" "}
                  {selectedPeriod === "daily"
                    ? "Today"
                    : selectedPeriod === "monthly"
                    ? "This Month"
                    : "This Year"}
                </p>
                <p className="text-2xl font-bold text-emerald-800">
                  {dashboardData.activeSuppliers}
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-2xl">👥</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  Drivers on Duty
                </p>
                <p className="text-2xl font-bold text-emerald-800">
                  {dashboardData.driversOnDuty}
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-2xl">🚛</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  Fertilizer Stock Level
                </p>
                <p className="text-2xl font-bold text-emerald-800">
                  {dashboardData.fertilizerStock}
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-2xl">🌱</div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Charts Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 col-span-2 flex flex-col">
            <h3 className="text-lg font-semibold text-emerald-800 mb-5">
              Tea Collection Trends -{" "}
              {selectedPeriod === "daily"
                ? "Last 7 Days"
                : selectedPeriod === "monthly"
                ? "Last 12 Months"
                : "Last 6 Years"}
            </h3>
            <div className="flex-1 min-h-[350px] flex items-center justify-center">
              <div className="w-full h-full">
                <TeaSupplyChart period={selectedPeriod} height={320} />
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-800 mb-5">
              Alerts & Notifications
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🛑</span>
                  <div>
                    <div className="text-sm font-medium text-red-700">
                      Driver Emergency
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Vehicle breakdown reported by Driver Pasindu
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2 min ago</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🕑</span>
                  <div>
                    <div className="text-sm font-medium text-emerald-700">
                      Late Supplier Warning
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      5 suppliers didn't mark supply before 4PM
                    </div>
                    <div className="text-xs text-gray-500 mt-1">15 min ago</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <div className="text-sm font-medium text-emerald-700">
                      Low Fertilizer Stock
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Urea stock below minimum threshold
                    </div>
                    <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🚧</span>
                  <div>
                    <div className="text-sm font-medium text-emerald-700">
                      Route Delay
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Route TR-05 delayed due to weather conditions
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      2 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Pending Approvals Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-800 mb-5">
              Pending Approvals Summary
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 transition-colors">
                <div>
                  <span className="font-medium text-gray-800 text-xs">
                    New Supplier Registrations
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-emerald-600">5</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 transition-colors">
                <div>
                  <span className="font-medium text-gray-800 text-xs">
                    Fertilizer Requests
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-emerald-600">3</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 transition-colors">
                <div>
                  <span className="font-medium text-gray-800 text-xs">
                    Advance Requests
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-emerald-600">2</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 transition-colors">
                <div>
                  <span className="font-medium text-gray-800 text-xs">
                    Routes Without Driver
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-emerald-600">1</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 transition-colors">
                <div>
                  <span className="font-medium text-gray-800 text-xs">
                    System Notifications
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-emerald-600">4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-800 mb-5">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center gap-2">
                <span>➕</span> Add New Route
              </button>
              <button className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center gap-2">
                <span>👥</span> Manage Drivers
              </button>
              <button className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center gap-2">
                <span>�</span> Update Inventory
              </button>
              <button className="w-full p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center gap-2">
                <span>📢</span> Send Announcement
              </button>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-800 mb-5">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 pb-3 border-b border-gray-200">
                <div className="text-xs text-gray-600 min-w-[50px] pt-1">
                  4:15 PM
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    Supplier SP-045 marked 3 bags collected
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pb-3 border-b border-gray-200">
                <div className="text-xs text-gray-600 min-w-[50px] pt-1">
                  4:10 PM
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    Driver D-03 started Route TR-02
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pb-3 border-b border-gray-200">
                <div className="text-xs text-gray-600 min-w-[50px] pt-1">
                  3:45 PM
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    Driver assigned to new route TR-05
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pb-3 border-b border-gray-200">
                <div className="text-xs text-gray-600 min-w-[50px] pt-1">
                  3:30 PM
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    Route TR-01 completed successfully
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-xs text-gray-600 min-w-[50px] pt-1">
                  3:15 PM
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    New supplier SP-087 registered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
