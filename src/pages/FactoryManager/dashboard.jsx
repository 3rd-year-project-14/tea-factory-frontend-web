import React, { useState } from "react";
import {
  Users2, Truck, Leaf,
  AlertCircle, Clock, TriangleAlert, MoveRight, Megaphone
} from "lucide-react";
import TeaSupplyChart from "../../components/charts/TeaSupplyChart";


const ACCENT_COLOR = "#165e52";
const BUTTON_COLOR = "#193e40ff";


export default function FactoryManagerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");


  const handlePeriodChange = (period) => setSelectedPeriod(period);


  const getDashboardData = () => {
    switch (selectedPeriod) {
      case "daily":
        return { totalTea: "3,480", activeSuppliers: "81", driversOnDuty: "6", fertilizerStock: "85%", period: "Today's" };
      case "monthly":
        return { totalTea: "78,520", activeSuppliers: "345", driversOnDuty: "25", fertilizerStock: "78%", period: "This Month's" };
      case "yearly":
        return { totalTea: "1,250,000", activeSuppliers: "1,284", driversOnDuty: "48", fertilizerStock: "92%", period: "This Year's" };
      default:
        return getDashboardData("daily");
    }
  };


  const dashboardData = getDashboardData();


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md ">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold  mb-1" style={{ color: ACCENT_COLOR }}>Dashboard Home</h1>
          <div className="filter-section float-right -mt-11 flex items-center gap-4">
            <div className="period-filter flex bg-white border rounded-lg overflow-hidden shadow-sm" style={{ borderColor: ACCENT_COLOR }}>
              {["daily", "monthly", "yearly"].map((period, index) => (
                <button
                  key={period}
                  onClick={() => handlePeriodChange(period)}
                  className={`px-4 py-2 font-medium text-sm min-w-[80px] transition duration-300 ${selectedPeriod === period ? "text-white" : "hover:bg-[#ecf7f4]"}`}
                  style={{
                    backgroundColor: selectedPeriod === period ? BUTTON_COLOR : "#fff",
                    color: selectedPeriod === period ? "#fff" : BUTTON_COLOR,
                    borderRight: index < 2 ? "1px solid #cfece6" : "none",
                  }}>
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            <div className="date-filter flex items-center">
              <span className="text-sm font-medium mr-2" style={{ color: ACCENT_COLOR }}>Date:</span>
              <input
                type="date"
                defaultValue="2025-07-04"
                className="p-2 rounded-md text-sm min-w-[140px] text-gray-900 bg-white focus:outline-none"
                style={{
                  border: `1px solid ${ACCENT_COLOR}`,
                  boxShadow: `0 0 0 1px ${ACCENT_COLOR}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            {
              label: `${dashboardData.period} Total Tea Collected (kg)`,
              value: dashboardData.totalTea,
              icon: <Leaf size={28} color="black" />,
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
              icon: <Users2 size={28} color="black" />,
            },
            {
              label: "Drivers on Duty",
              value: dashboardData.driversOnDuty,
              icon: <Truck size={28} color="black" />,
            }
          ].map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-black transition duration-200 hover:shadow-lg hover:border-[#cfece6]">
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
          ))}
        </div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Charts Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black col-span-2 flex flex-col">
            <h3 className="text-lg font-semibold text-black mb-5">
              Tea Collection Trends -{" "}
              {selectedPeriod === "daily"
                ? "Last 7 Days"
                : selectedPeriod === "monthly"
                ? "Last 12 Months"
                : "Last 6 Years"}
            </h3>
            <div className="flex-1 min-h-[350px] flex items-center justify-center">
              <div className="w-full h-full">
                <TeaSupplyChart period={selectedPeriod} height={320} primaryColor={ACCENT_COLOR} />
              </div>
            </div>
          </div>


          {/* Alerts & Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black">
            <h3 className="text-lg font-semibold text-black mb-5">Alerts & Notifications</h3>
            <div className="space-y-3">
              {/* Emergency – Blinking Red */}
              <div className="p-3 bg-[#fceaea] border-l-4 border-red-600 rounded animate-pulse-slow">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">
                    <AlertCircle size={22} color="#dc2626" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-red-700">Driver Emergency</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Vehicle breakdown reported by Driver Pasindu
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2 min ago</div>
                  </div>
                </div>
              </div>
              {/* Late Supplier – Normal red */}
              <div className="p-3 bg-[#fff3f3] border-l-4 border-red-400 rounded">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">
                    <Clock size={22} color="#dc2626" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-red-700">Late Supplier Warning</div>
                    <div className="text-xs text-gray-600 mt-1">
                      5 suppliers didn't mark supply before 4PM
                    </div>
                    <div className="text-xs text-gray-500 mt-1">15 min ago</div>
                  </div>
                </div>
              </div>
              {/* Low Stock – Orange */}
              <div className="p-3 bg-[#fff7ed] border-l-4 border-orange-400 rounded">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">
                    <TriangleAlert size={22} color="#ea580c" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-orange-700">Low Fertilizer Stock</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Urea stock below minimum threshold
                    </div>
                    <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
                  </div>
                </div>
              </div>
              {/* Delay – Normal red */}
              <div className="p-3 bg-[#fff3f3] border-l-4 border-red-400 rounded">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">
                    <MoveRight size={22} color="#dc2626" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-red-700">Route Delay</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Route TR-05 delayed due to weather conditions
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Pending Approvals Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black">
            <h3 className="text-lg font-semibold text-black mb-5">Pending Approvals Summary</h3>
            <div className="space-y-2">
              {[
                { label: "New Supplier Registrations", count: 5 },
                { label: "Fertilizer Requests", count: 3 },
                { label: "Advance Requests", count: 2 },
                { label: "Routes Without Driver", count: 1 },
                { label: "System Notifications", count: 4 }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800 text-xs">{item.label}</span>
                  <span className="font-bold text-sm" style={{ color: ACCENT_COLOR }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black">
            <h3 className="text-lg font-semibold text-black mb-5">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: "Add New Route", icon: <Leaf size={16} color="white" /> },
                { label: "Manage Drivers", icon: <Users2 size={16} color="white" /> },
                { label: "Update Inventory", icon: <Truck size={16} color="white" /> },
                { label: "Send Announcement", icon: <Megaphone size={16} color="white" /> }
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full p-3 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors"
                  style={{
                    backgroundColor: BUTTON_COLOR,
                    border: "none",
                  }}
                >
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black">
            <h3 className="text-lg font-semibold text-black mb-5">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { time: "4:15 PM", text: "Supplier SP-045 marked 3 bags collected" },
                { time: "4:10 PM", text: "Driver D-03 started Route TR-02" },
                { time: "3:45 PM", text: "Driver assigned to new route TR-05" },
                { time: "3:30 PM", text: "Route TR-01 completed successfully" },
                { time: "3:15 PM", text: "New supplier SP-087 registered" }
              ].map((activity, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${i < 4 ? "pb-3 border-b border-gray-200" : ""}`}
                >
                  <div className="text-xs text-gray-600 min-w-[50px] pt-1">{activity.time}</div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{activity.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Custom animation for emergency blink */}
      <style>{`
      @keyframes pulseSlow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      .animate-pulse-slow {
        animation: pulseSlow 1.5s infinite;
      }
      `}</style>
    </div>
  );
}



