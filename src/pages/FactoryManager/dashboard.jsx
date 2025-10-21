import React, { useEffect, useState } from "react";
import {
  Users2, Truck, Leaf,
  AlertCircle, Clock, TriangleAlert, MoveRight, Megaphone
} from "lucide-react";
import TeaSupplyChart from "../../components/charts/TeaSupplyChart";
import { useAuth } from "../../contexts/AuthContext";
import { getSupplierCounts, getSupplierRequestsByStatus } from "../../api/supplier";
import { fetchTeaRateRecords } from "../../api/factoryManager";


const ACCENT_COLOR = "#165e52";
const BUTTON_COLOR = "#172526";


export default function FactoryManagerDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    supplierRequests: 0,
    activeSuppliers: 0,
    driversTotal: 48,
    fertilizerStock: "85%",
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const factoryId = user?.factoryId;
      if (!factoryId) return;
      try {
        const counts = await getSupplierCounts(factoryId);
        if (counts?.status === 404 && counts?.message) {
          setDashboardData((prev) => ({
            ...prev,
            activeSuppliers: 0,
            supplierRequests: 0,
          }));
        } else {
          // Prefer counts returned by the counts API
          let pendingCount = counts?.pendingRequestCount ?? 0;
          // Fallback: if pendingRequestCount not provided, call requests-by-status
          if (pendingCount === 0) {
            try {
              const pending = await getSupplierRequestsByStatus(factoryId, "pending");
              pendingCount = Array.isArray(pending) ? pending.length : (pending?.total || 0);
            } catch (e) {
              pendingCount = 0;
            }
          }

          setDashboardData((prev) => ({
            ...prev,
            activeSuppliers: counts?.activeSupplierCount ?? counts?.approved ?? counts?.total ?? 0,
            supplierRequests: pendingCount,
          }));
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.debug('Failed to load supplier counts', err);
      }
    };
    fetchCounts();
  }, [user]);

  // Tea rate chart data
  const [teaRateChartData, setTeaRateChartData] = useState(null);
  useEffect(() => {
    const fetchTeaRates = async () => {
      const factoryUserId = user?.id || user?.userId || user?.uid || null;
      if (!factoryUserId) return;
      try {
            const resp = await fetchTeaRateRecords(user?.uid);
            const records = resp?.data || resp || [];

            // Map to time-series of rate per kg. Use finalRatePerKg if available, else fallback to monthlyRate or rate
            const sorted = records
              .slice()
              .sort((a, b) => new Date(a.createdAt || a.date || a.month) - new Date(b.createdAt || b.date || b.month));

            const labels = sorted.map((r) => {
              const d = new Date(r.createdAt || r.date || r.month || null);
              if (!isNaN(d)) return d.toLocaleDateString();
              // fallback to month label if present
              return r.monthLabel || r.month || "-";
            });

            const dataPoints = sorted.map((r) => {
              const rate = r.finalRatePerKg ?? r.monthlyRate ?? r.rate ?? null;
              return rate != null ? Number(rate) : null;
            });

            setTeaRateChartData({
              labels,
              datasets: [
                {
                  label: "Tea Rate",
                  data: dataPoints,
                  borderColor: "#10B981",
                  backgroundColor: "rgba(16,185,129,0.2)",
                  tension: 0.3,
                },
              ],
            });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.debug("Failed to load tea rate records", err);
      }
    };
    fetchTeaRates();
  }, [user]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md ">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold  mb-1" style={{ color: ACCENT_COLOR }}>Dashboard Home</h1>
            <a href="/factoryManager/payment/proceed" className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white" style={{ backgroundColor: BUTTON_COLOR }}>Proceed Payment</a>
            <a href="/factoryManager/payment/main" className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white" style={{ backgroundColor: BUTTON_COLOR }}>Payments</a>
          </div>
          {/* filters removed intentionally - show static dashboard */}
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            {
              label: `Supplier Requests`,
              value: dashboardData.supplierRequests,
              icon: <Leaf size={28} color="black" />,
            },
            {
              label: `Active Suppliers `,
              value: dashboardData.activeSuppliers,
             
              icon: <Users2 size={28} color="black" />,
            },
            {
              label: "Total Drivers",
              value: dashboardData.driversTotal,
             
              icon: <Truck size={28} color="black" />,
            }
          ].map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-black transition duration-200 hover:shadow-lg hover:border-[#cfece6]">
              <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">{card.label}</p>
                    {card.subtitle && <p className="text-xs text-gray-500">{card.subtitle}</p>}
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
            
            <div className="flex-1 min-h-[350px] flex items-center justify-center">
              <div className="w-full h-full">
                <TeaSupplyChart data={teaRateChartData} period={"daily"} height={320} primaryColor={ACCENT_COLOR} />
              </div>
            </div>
          </div>


          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black">
            <h3 className="text-lg font-semibold text-black mb-5">Quick Actions</h3>
            {/* Make buttons constrained inside the panel; allow scroll if overflow */}
            <div className="h-[220px] overflow-auto">
              <div className="flex flex-col gap-2">
                  {[
                    { label: "Add New Route", icon: <Leaf size={14} color="white" /> },
                    { label: "Manage Drivers", icon: <Users2 size={14} color="white" /> },
                    { label: "Update Inventory", icon: <Truck size={14} color="white" /> }
                  ].map((action, i) => (
                    <button
                      key={i}
                      className="w-full flex-1 p-2 rounded-md text-white text-sm font-medium flex items-center gap-2 justify-start transition-colors"
                      style={{
                        backgroundColor: BUTTON_COLOR,
                        border: "none",
                      }}
                    >
                      <span className="inline-flex items-center justify-center w-5">{action.icon}</span>
                      <span className="flex-1 text-left">{action.label}</span>
                    </button>
                  ))}
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



