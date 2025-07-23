import React, { useState, useEffect } from 'react';
import {
  Calendar, MapPin, User, Scale, CheckCircle, Clock,
  TrendingUp, AlertTriangle, Truck, Weight,
  BarChart3, RefreshCw, Plus, Eye, Edit, Download,
  ChevronRight, ChevronDown, Home, Users, X
} from 'lucide-react';

// SupplierHeader with custom colors
function SupplierHeader() {
  return (
    <div className="bg-white shadow-md border-b" style={{ borderColor: "#cfece6" }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold mb-1" style={{ color: "#165e52" }}>
          Supplier Management
        </h1>
      </div>
    </div>
  );
}

// SupplierSummaryCards with instructions for card and border color
function SupplierSummaryCards({ metrics, currentView, setCurrentView }) {
  const getBorderColor = (type) => {
    switch (type) {
      case "approved":
        return "#000000";
      case "pending":
        return "#f59e0b";
      case "rejected":
        return "#ef4444";
      default:
        return "#d1d5db";
    }
  };

  const getRingClass = (type) => {
    if (type === "approved") return "";
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

// Primary button style override
const emeraldButtonStyle = {
  backgroundColor: "#01251F",
  color: "#fff",
  border: "none",
  transition: "background 0.2s",
};

// Main Inventory Manager Dashboard
export default function InventoryManagerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [refreshTime, setRefreshTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.getDate();

  // Dummy data for demonstration
  const [operationalData] = useState({
    totalRoutes: 45,
    activeRoutes: 12,
    completedToday: 8,
    pendingRoutes: 3,
    totalSuppliers: 156,
    activeSuppliers: 34,
    totalBagsCollected: 245,
    totalWeightToday: '4,850 Kg',
    averageBagWeight: '19.8 Kg',
    alertsCount: 3,
    efficiency: 94.2
  });

  const [activeRoutesData] = useState([
    {
      id: 'TN-1',
      routeName: 'Route - 1',
      driverName: 'Driver - 1',
      vehicleNo: 'DAD-2435',
      status: 'active',
      progress: 75,
      suppliersTotal: 10,
      suppliersCompleted: 7,
      bagsCollected: 18,
      currentWeight: '320 Kg',
      estimatedCompletion: '15:30',
      lastUpdate: '14:25',
      alerts: []
    },
    {
      id: 'TK-1',
      routeName: 'Route - 2',
      driverName: 'Driver - 2',
      vehicleNo: 'DAD-2436',
      status: 'active',
      progress: 45,
      suppliersTotal: 12,
      suppliersCompleted: 5,
      bagsCollected: 12,
      currentWeight: '235 Kg',
      estimatedCompletion: '16:45',
      lastUpdate: '14:20',
      alerts: ['Delay at Supplier S-108']
    },
    {
      id: 'TK-2',
      routeName: 'Route - 4',
      driverName: 'Driver - 4',
      vehicleNo: 'DAD-2438',
      status: 'delayed',
      progress: 30,
      suppliersTotal: 8,
      suppliersCompleted: 2,
      bagsCollected: 5,
      currentWeight: '95 Kg',
      estimatedCompletion: '17:15',
      lastUpdate: '13:45',
      alerts: ['Vehicle maintenance required', 'Behind schedule']
    }
  ]);

  const [recentActivities] = useState([
    {
      id: 'ACT-001',
      type: 'route_complete',
      message: 'Route TN-3 completed successfully',
      details: '15 bags, 285 Kg collected from 8 suppliers',
      timestamp: '14:15',
      status: 'success'
    },
    {
      id: 'ACT-002',
      type: 'weight_recorded',
      message: 'Bag weight recorded for Supplier S-104',
      details: 'TN-B7: 22 Kg recorded and verified',
      timestamp: '14:10',
      status: 'info'
    },
    {
      id: 'ACT-003',
      type: 'alert',
      message: 'Route TK-2 experiencing delays',
      details: 'Vehicle maintenance required, estimated delay: 45 mins',
      timestamp: '13:45',
      status: 'warning'
    },
    {
      id: 'ACT-004',
      type: 'supplier_update',
      message: 'Supplier S-110 ready for collection',
      details: '3 bags ready, estimated weight: 58 Kg',
      timestamp: '13:30',
      status: 'info'
    }
  ]);

  const [performanceData] = useState({
    dailyTargets: {
      routes: { target: 15, completed: 8, percentage: 53 },
      weight: { target: 6000, completed: 4850, percentage: 81 },
      suppliers: { target: 45, completed: 34, percentage: 76 }
    },
    weeklyTrends: [
      { day: 'Mon', routes: 12, weight: 4200 },
      { day: 'Tue', routes: 14, weight: 4800 },
      { day: 'Wed', routes: 11, weight: 4850 },
      { day: 'Thu', routes: 13, weight: 5200 },
      { day: 'Fri', routes: 15, weight: 5500 },
      { day: 'Sat', routes: 10, weight: 3800 },
      { day: 'Sun', routes: 8, weight: 3200 }
    ]
  });

  // Helper functions for colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-emerald-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Tab button that uses the deep green style
  const TabButton = ({ id, label, icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium
        transition-all duration-200
        border border-gray-200
        ${active
          ? 'shadow-md'
          : 'hover:bg-[#d0e9e2] hover:text-[#01251F]'}
      `}
      style={active
        ? { backgroundColor: "#01251F", color: "#fff" }
        : { backgroundColor: "#fff", color: "#222" }
      }
    >
      {React.createElement(icon, { className: "h-4 w-4" })}
      {label}
    </button>
  );

  // MetricCard with border and colors
  const MetricCard = ({ title, value, subtitle, trend, icon, color = 'emerald' }) => {
    let borderColor = "#000000";
    let textColor = "#000000";
    let valueColor = "#000000";
    let subtitleColor = "#515151ff";
    let bgColor = "#f3f4f6";
    let iconColor = "#000000";

    if (color === 'green') {
      textColor = "#000000";
      valueColor = "#000000";
      bgColor = "#f3f4f6";
      iconColor = "#000000";
    }

    return (
      <div
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: textColor }}>{title}</p>
            <p className="text-2xl font-bold" style={{ color: valueColor }}>{value}</p>
            {subtitle && <p className="text-xs" style={{ color: subtitleColor }}>{subtitle}</p>}
          </div>
          <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
            {React.createElement(icon, { className: "h-6 w-6", color: iconColor })}
          </div>
        </div>
        {trend && (
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4" color="#23a05f" style={{ marginRight: "0.25rem" }} />
            <span className="text-xs font-medium" style={{ color: "#23a05f" }}>{trend}</span>
          </div>
        )}
      </div>
    );
  };

  // For Supplier Summary example
  const [supplierView, setSupplierView] = useState('approved');
  const supplierMetrics = { approved: 102, pending: 8, rejected: 3 };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Supplier Header */}
      <SupplierHeader />

      {/* Navigation Tabs */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            <TabButton id="overview" label="Overview" icon={BarChart3} active={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton id="routes" label="Active Routes" icon={MapPin} active={activeTab === 'routes'} onClick={setActiveTab} />
            <TabButton id="suppliers" label="Suppliers" icon={User} active={activeTab === 'suppliers'} onClick={setActiveTab} />
            <TabButton id="weights" label="Weight Management" icon={Scale} active={activeTab === 'weights'} onClick={setActiveTab} />
            <TabButton id="history" label="History" icon={Clock} active={activeTab === 'history'} onClick={setActiveTab} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Active Routes"
                value={operationalData.activeRoutes}
                subtitle={`${operationalData.completedToday} completed today`}
                icon={MapPin}
                trend="+8.3% from yesterday"
              />
              <MetricCard
                title="Total Weight Collected"
                value={operationalData.totalWeightToday}
                subtitle={`${operationalData.totalBagsCollected} bags processed`}
                icon={Weight}
                trend="+12.4% from yesterday"
              />
              <MetricCard
                title="Active Suppliers"
                value={operationalData.activeSuppliers}
                subtitle={`of ${operationalData.totalSuppliers} total`}
                icon={User}
                trend="+5.2% efficiency"
              />
              <MetricCard
                title="System Efficiency"
                value={`${operationalData.efficiency}%`}
                subtitle="Operational performance"
                icon={TrendingUp}
                trend="Above target"
                color="green"
              />
            </div>

            {/* Daily Progress */}
            <div className="bg-white rounded-lg shadow-md p-6" style={{ border: "1px solid #cfece6" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#000000" }}>Daily Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(performanceData.dailyTargets).map(([key, data]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: "#222" }}>{key}</span>
                      <span className="text-sm text-gray-500">{data.completed}/{data.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(data.percentage, 100)}%`,
                          background: data.percentage >= 80 ? '#278756ff' : data.percentage >= 60 ? '#32bda3' : data.percentage >= 40 ? '#57ce7fff' : '#ef4444'
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.percentage}% of daily target</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-md p-6" style={{ border: "1px solid #cfece6" }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: "#000000" }}>Recent Activities</h3>
                <button className="text-sm font-medium" style={{ color: "#01251F" }}>
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div
  className="w-2 h-2 rounded-full mt-2"
  style={{
    backgroundColor:
      activity.status === 'success' || activity.status === 'warning'
        ? '#165e52'
        : activity.status === 'error'
        ? '#ef4444' // Tailwind's red-500
        : '#165e52'
  }}
></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Routes Tab */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6" style={{ border: "1px solid #cfece6" }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: "#165e52" }}>Active Routes Monitoring</h3>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-lg flex items-center gap-2"
                    style={emeraldButtonStyle}
                  >
                    <Plus className="h-4 w-4" />
                    Add Route
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {activeRoutesData.map((route) => (
                  <div key={route.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setExpandedRoute(expandedRoute === route.id ? null : route.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedRoute === route.id ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </button>
                        <div>
                          <h4 className="font-semibold text-gray-900">{route.routeName} ({route.id})</h4>
                          <p className="text-sm text-gray-600">{route.driverName} • {route.vehicleNo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {route.alerts.length > 0 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs">{route.alerts.length}</span>
                          </div>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
                          {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-emerald-600">{route.progress}%</p>
                        <p className="text-xs text-gray-600">Progress</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{route.suppliersCompleted}/{route.suppliersTotal}</p>
                        <p className="text-xs text-gray-600">Suppliers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{route.bagsCollected}</p>
                        <p className="text-xs text-gray-600">Bags Collected</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-emerald-700">{route.currentWeight}</p>
                        <p className="text-xs text-gray-600">Total Weight</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(route.progress)}`}
                        style={{ width: `${route.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>ETA: {route.estimatedCompletion}</span>
                      <span>Last Update: {route.lastUpdate}</span>
                    </div>

                    {route.alerts.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {route.alerts.map((alert, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                            <AlertTriangle className="h-4 w-4" />
                            {alert}
                          </div>
                        ))}
                      </div>
                    )}

                    {expandedRoute === route.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200">
                            <Eye className="h-4 w-4" />
                            View Details
                          </button>
                          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">
                            <Edit className="h-4 w-4" />
                            Edit Route
                          </button>
                          <button className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200">
                            <Download className="h-4 w-4" />
                            Export Data
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Suppliers Tab */}
        {activeTab === 'suppliers' && (
          <div className="space-y-6 py-2">
            <SupplierSummaryCards
              metrics={supplierMetrics}
              currentView={supplierView}
              setCurrentView={setSupplierView}
            />
            <div className="bg-white rounded-lg shadow-md p-6" style={{ border: "1px solid #cfece6" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#165e52" }}>Supplier Management</h3>
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Supplier management interface coming soon...</p>
              </div>
            </div>
          </div>
        )}

        {/* Weight Management Tab */}
        {activeTab === 'weights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6" style={{ border: "1px solid #cfece6" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#165e52" }}>Weight Management System</h3>
              <div className="text-center py-8 text-gray-500">
                <Scale className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Weight management interface coming soon...</p>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6" style={{ border: "1px solid #cfece6" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#165e52" }}>Inventory History</h3>
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>History management system will be integrated here...</p>
                <p className="text-sm mt-2">This will include the full history component from your provided code.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
