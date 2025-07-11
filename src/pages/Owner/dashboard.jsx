import {
  Bell,
  Calculator,
  Calendar,
  DollarSign,
  Leaf,
  MapPin,
  TrendingUp,
  Truck,
  Users
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive reporting system for all your tea factories</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tea Collected</p>
                <p className="text-3xl font-bold text-green-600">2,834</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drivers on Duty</p>
                <p className="text-3xl font-bold text-yellow-600">31</p>
              </div>
              <Users className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Payable Amount</p>
                <p className="text-3xl font-bold text-blue-600">1,500,234</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rate Change</p>
                <p className="text-3xl font-bold text-purple-600">+5.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Supply Chart */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
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
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
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
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
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
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
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
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
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
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
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
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
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
  );
};

export default Dashboard;