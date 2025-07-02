import React from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Bell, 
  TrendingUp,
  Leaf,
  Truck,
  Calculator,
  MapPin,
  Settings,
  Calendar,
  DollarSign
} from 'lucide-react';

const Dashboard = () => {
  const suppliers = [
    { name: 'Supplier - A', weight: '485 kg' },
    { name: 'Supplier - B', weight: '412 kg' },
    { name: 'Supplier - C', weight: '387 kg' },
    { name: 'Supplier - D', weight: '342 kg' },
    { name: 'Supplier - E', weight: '298 kg' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="w-full overflow-auto">
        {/* Header */}
        <div className="bg-white p-6 shadow-sm">
          <div className="bg-gray-200 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Comprehensive reporting system for all your tea factories</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            {/* Total Tea Collected */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">2,834</h2>
                <p className="text-gray-600 mb-4">Total Tea Collected Today (kg)</p>
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% from yesterday
                </div>
              </div>
            </div>

            {/* Drivers on Duty */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">31</h2>
                <p className="text-gray-600 mb-4">Drivers on Duty</p>
                <div className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  Same as yesterday
                </div>
              </div>
            </div>

            {/* Total Payable Amount */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">1,500,234</h2>
                <p className="text-gray-600 mb-4">Today's Total Payable Amount</p>
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.3% from yesterday
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Monthly Supply Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Supply Chart</h3>
              <div className="bg-green-50 rounded-lg p-6 h-64 flex items-center justify-center border-2 border-dashed border-green-200">
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    points="20,160 60,120 100,140 140,100 180,110 220,90 260,120"
                  />
                  <circle cx="20" cy="160" r="4" fill="#10b981" />
                  <circle cx="60" cy="120" r="4" fill="#10b981" />
                  <circle cx="100" cy="140" r="4" fill="#10b981" />
                  <circle cx="140" cy="100" r="4" fill="#10b981" />
                  <circle cx="180" cy="110" r="4" fill="#10b981" />
                  <circle cx="220" cy="90" r="4" fill="#10b981" />
                  <circle cx="260" cy="120" r="4" fill="#10b981" />
                </svg>
              </div>
            </div>

            {/* Top 5 Suppliers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Suppliers (by weight)</h3>
              <div className="space-y-4">
                {suppliers.map((supplier, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">{supplier.name}</span>
                    <span className="text-green-600 font-bold">{supplier.weight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Fertilizer Requests</h4>
                    <p className="text-sm text-gray-600">Manage fertilizer distribution requests</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Vehicle Management</h4>
                    <p className="text-sm text-gray-600">Track and manage transport vehicles</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Price Calculator</h4>
                    <p className="text-sm text-gray-600">Calculate tea prices and payments</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Route Planning</h4>
                    <p className="text-sm text-gray-600">Optimize collection routes</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Schedule Manager</h4>
                    <p className="text-sm text-gray-600">Manage collection schedules</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Payment System</h4>
                    <p className="text-sm text-gray-600">Process supplier payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;