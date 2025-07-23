import React, { useState } from 'react';
import { Search, Calendar, MapPin, User, Package, Scale, CheckCircle, Clock, Filter, Activity } from 'lucide-react';

export default function InventoryHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('all'); // 'all', 'routes', 'bags', 'weights'
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'pending'

  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.getDate();

  // Factory-wide data (total routes in factory)
  const factoryTotalRoutes = 45; // This would come from your factory database

  // Combined history data from all components
  const [historyData] = useState([
    // Route Management History
    {
      id: 'RH-001',
      type: 'route',
      action: 'Route Completed',
      routeNo: 'TN-1',
      routeName: 'Route - 1',
      driverName: 'Driver - 1',
      vehicleNo: 'DAD-2435',
      totalSuppliers: 10,
      totalBags: 25,
      totalWeight: '450 Kg',
      status: 'completed',
      timestamp: '2025-07-23 14:30',
      date: '2025-07-23',
      details: 'Route completed successfully with all bags collected'
    },
    {
      id: 'RH-002',
      type: 'route',
      action: 'Route Started',
      routeNo: 'TK-1',
      routeName: 'Route - 2',
      driverName: 'Driver - 2',
      vehicleNo: 'DAD-2436',
      totalSuppliers: 12,
      totalBags: 28,
      status: 'active',
      timestamp: '2025-07-23 09:15',
      date: '2025-07-23',
      details: 'Route started for bag collection'
    },
    {
      id: 'RH-007',
      type: 'route',
      action: 'Route Active',
      routeNo: 'TK-2',
      routeName: 'Route - 4',
      driverName: 'Driver - 4',
      vehicleNo: 'DAD-2438',
      totalSuppliers: 8,
      totalBags: 15,
      status: 'active',
      timestamp: '2025-07-23 11:00',
      date: '2025-07-23',
      details: 'Route currently in progress'
    },
    // Bag Weight History
    {
      id: 'BH-001',
      type: 'bag_weight',
      action: 'Bag Weight Recorded',
      bagNo: 'TN-B1',
      supplierNo: 'TN-S101',
      supplierName: 'Supplier - 1',
      weight: '20 Kg',
      routeNo: 'TN-2',
      status: 'completed',
      timestamp: '2025-07-23 13:45',
      date: '2025-07-23',
      details: 'Individual bag weight recorded and verified'
    },
    {
      id: 'BH-002',
      type: 'bag_weight',
      action: 'Bag Weight Recorded',
      bagNo: 'TN-B2',
      supplierNo: 'TN-S102',
      supplierName: 'Supplier - 2',
      weight: '22 Kg',
      routeNo: 'TN-2',
      status: 'completed',
      timestamp: '2025-07-23 13:50',
      date: '2025-07-23',
      details: 'Individual bag weight recorded and verified'
    },
    {
      id: 'BH-005',
      type: 'bag_weight',
      action: 'Bag Weight Recorded',
      bagNo: 'TN-B8',
      supplierNo: 'TN-S108',
      supplierName: 'Supplier - 8',
      weight: '18 Kg',
      routeNo: 'TN-3',
      status: 'completed',
      timestamp: '2025-07-23 16:20',
      date: '2025-07-23',
      details: 'Individual bag weight recorded and verified'
    },
    // Supplier Bag Management History
    {
      id: 'SH-001',
      type: 'supplier_bags',
      action: 'Supplier Bags Processed',
      supplierNo: 'TN-S104',
      supplierName: 'Supplier - 4',
      totalBags: 3,
      bagNos: ['TN-B5', 'TN-B6', 'TN-B7'],
      totalWeight: '63 Kg',
      routeNo: 'TN-2',
      status: 'completed',
      timestamp: '2025-07-23 12:20',
      date: '2025-07-23',
      details: 'All supplier bags processed and weights recorded'
    },
    // Empty Bag Weight Management History
    {
      id: 'EH-001',
      type: 'empty_weight',
      action: 'Empty Bag Weight Processed',
      supplierNo: 'TN-S104',
      supplierName: 'Supplier - 4',
      selectedBags: ['TN-B5', 'TN-B6', 'TN-B7'],
      emptyWeight: '2.5 Kg',
      netWeight: '60.5 Kg',
      status: 'completed',
      timestamp: '2025-07-23 15:10',
      date: '2025-07-23',
      details: 'Empty bag weights deducted, net weight calculated'
    },
    // Previous day entries
    {
      id: 'RH-003',
      type: 'route',
      action: 'Route Completed',
      routeNo: 'TB-1',
      routeName: 'Route - 3',
      driverName: 'Driver - 3',
      vehicleNo: 'DAD-2437',
      totalSuppliers: 8,
      totalBags: 18,
      totalWeight: '320 Kg',
      status: 'completed',
      timestamp: '2025-07-22 16:45',
      date: '2025-07-22',
      details: 'Route completed successfully'
    },
    {
      id: 'BH-003',
      type: 'bag_weight',
      action: 'Batch Weight Recorded',
      supplierNo: 'TN-S105',
      supplierName: 'Supplier - 5',
      totalBags: 5,
      totalWeight: '98 Kg',
      routeNo: 'TB-1',
      status: 'completed',
      timestamp: '2025-07-22 14:30',
      date: '2025-07-22',
      details: 'Batch weight processing completed'
    },
    // Week old entries
    {
      id: 'RH-004',
      type: 'route',
      action: 'Route Active',
      routeNo: 'TC-1',
      routeName: 'Route - 5',
      driverName: 'Driver - 5',
      vehicleNo: 'DAD-2439',
      totalSuppliers: 6,
      totalBags: 12,
      status: 'active',
      timestamp: '2025-07-20 10:30',
      date: '2025-07-20',
      details: 'Route in progress for collection'
    },
    {
      id: 'BH-004',
      type: 'bag_weight',
      action: 'Bag Weight Recorded',
      bagNo: 'TN-B9',
      supplierNo: 'TN-S109',
      supplierName: 'Supplier - 9',
      weight: '25 Kg',
      routeNo: 'TC-1',
      status: 'completed',
      timestamp: '2025-07-19 11:15',
      date: '2025-07-19',
      details: 'Individual bag weight recorded and verified'
    }
  ]);

  // Filter data based on date filter
  const getFilteredDataByDate = () => {
  return historyData.filter(item => {
    if (dateFilter === 'all') return true;
    const itemDate = new Date(item.date);
    const today = new Date();

    switch (dateFilter) {
      case 'today':
        return itemDate.toDateString() === today.toDateString();
      case 'week': {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return itemDate >= weekAgo;
      }
      case 'month': {
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return itemDate >= monthAgo;
      }
      default:
        return true;
    }
  });
};


  // Filter data based on all filters for display
  const filteredData = historyData.filter(item => {
    const matchesSearch = 
      (item.routeNo && item.routeNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.bagNo && item.bagNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.supplierName && item.supplierName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.driverName && item.driverName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.action && item.action.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Handle special card view filters
    let matchesView = true;
    if (currentView === 'factory_routes') {
      matchesView = item.type === 'route'; // Show all routes for factory routes card
    } else if (currentView === 'active_routes') {
      matchesView = item.type === 'route' && item.status === 'active'; // Show only active routes
    } else if (currentView === 'suppliers_weights') {
      matchesView = item.supplierName && (item.type === 'bag_weight' || item.type === 'supplier_bags' || item.type === 'empty_weight'); // Show weight-related activities
    } else if (currentView !== 'all') {
      matchesView = item.type === currentView; // Regular type filtering
    }
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    const dateFilteredData = getFilteredDataByDate();
    const matchesDate = dateFilteredData.includes(item);
    
    return matchesSearch && matchesView && matchesStatus && matchesDate;
  });

  // Calculate statistics based on date filter
  const dateFilteredData = getFilteredDataByDate();
  const activeRoutes = dateFilteredData.filter(item => item.type === 'route' && item.status === 'active').length;
  const uniqueSuppliers = new Set(
    dateFilteredData
      .filter(item => item.supplierName)
      .map(item => item.supplierName)
  ).size;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'route': return <MapPin className="h-4 w-4" />;
      case 'bag_weight': return <Scale className="h-4 w-4" />;
      case 'supplier_bags': return <Package className="h-4 w-4" />;
      case 'empty_weight': return <Scale className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

    const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'active': return <Activity className="h-4 w-4 text-emerald-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDateFilterLabel = () => {
    switch (dateFilter) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      default: return 'All Time';
    }
  };

  const getViewDisplayName = () => {
    switch (currentView) {
      case 'factory_routes': return 'All Factory Routes';
      case 'active_routes': return 'Active Routes Only';
      case 'suppliers_weights': return 'Supplier Weight Activities';
      case 'route': return 'Route Management';
      case 'bag_weight': return 'Bag Weight Records';
      case 'supplier_bags': return 'Supplier Bag Processing';
      case 'empty_weight': return 'Empty Weight Processing';
      default: return 'All Activities';
    }
  };

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-8xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="bg-white shadow-sm p-4 mb-6 border-emerald-200 border transition-all duration-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management History</h1>
            <div className="flex items-center gap-3 text-emerald-800">
              <Calendar className="h-5 w-5" />
              <span className="text-lg font-semibold">{year}</span>
              <span className="text-md font-medium">{month}</span>
              <span className="text-lg font-semibold">{date}</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div 
            onClick={() => setCurrentView(currentView === 'factory_routes' ? 'all' : 'factory_routes')}
            className={`bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:scale-105 ${
              currentView === 'factory_routes' ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${currentView === 'factory_routes' ? 'text-emerald-800' : 'text-emerald-700'}`}>
                  Total Routes in Factory
                </p>
                <p className={`text-2xl font-bold ${currentView === 'factory_routes' ? 'text-emerald-900' : 'text-emerald-800'}`}>
                  {factoryTotalRoutes}
                </p>
                <p className={`text-xs ${currentView === 'factory_routes' ? 'text-emerald-700' : 'text-emerald-600'}`}>
                  Factory-wide Routes
                </p>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                currentView === 'factory_routes' ? 'bg-emerald-200' : 'bg-emerald-100'
              }`}>
                <MapPin className={`h-5 w-5 ${currentView === 'factory_routes' ? 'text-emerald-800' : 'text-emerald-600'}`} />
              </div>
            </div>
          </div>

          <div 
            onClick={() => setCurrentView(currentView === 'active_routes' ? 'all' : 'active_routes')}
            className={`bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:scale-105 ${
              currentView === 'active_routes' ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${currentView === 'active_routes' ? 'text-emerald-800' : 'text-emerald-700'}`}>
                  Active Routes
                </p>
                <p className={`text-2xl font-bold ${currentView === 'active_routes' ? 'text-emerald-900' : 'text-emerald-800'}`}>
                  {activeRoutes}
                </p>
                <p className={`text-xs ${currentView === 'active_routes' ? 'text-emerald-700' : 'text-emerald-600'}`}>
                  {getDateFilterLabel()}
                </p>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                currentView === 'active_routes' ? 'bg-emerald-200' : 'bg-emerald-100'
              }`}>
                <Activity className={`h-5 w-5 ${currentView === 'active_routes' ? 'text-emerald-800' : 'text-emerald-600'}`} />
              </div>
            </div>
          </div>

          <div 
            onClick={() => setCurrentView(currentView === 'suppliers_weights' ? 'all' : 'suppliers_weights')}
            className={`bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:scale-105 ${
              currentView === 'suppliers_weights' ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${currentView === 'suppliers_weights' ? 'text-emerald-800' : 'text-emerald-700'}`}>
                  Suppliers with Weights
                </p>
                <p className={`text-2xl font-bold ${currentView === 'suppliers_weights' ? 'text-emerald-900' : 'text-emerald-800'}`}>
                  {uniqueSuppliers}
                </p>
                <p className={`text-xs ${currentView === 'suppliers_weights' ? 'text-emerald-700' : 'text-emerald-600'}`}>
                  {getDateFilterLabel()}
                </p>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                currentView === 'suppliers_weights' ? 'bg-emerald-200' : 'bg-emerald-100'
              }`}>
                <User className={`h-5 w-5 ${currentView === 'suppliers_weights' ? 'text-emerald-800' : 'text-emerald-600'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border-emerald-200 border transition-all duration-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* View Filter */}
            <div>
              <select
                value={currentView}
                onChange={(e) => setCurrentView(e.target.value)}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              >
                <option value="all">All Activities</option>
                <option value="route">Routes</option>
                <option value="bag_weight">Bag Weights</option>
                <option value="supplier_bags">Supplier Bags</option>
                <option value="empty_weight">Empty Weights</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCurrentView('all');
                  setDateFilter('all');
                  setStatusFilter('all');
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border-emerald-200 border transition-all duration-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">History Records</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {filteredData.length} {filteredData.length === 1 ? 'Record' : 'Records'} Found
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Showing: {getViewDisplayName()} • {getDateFilterLabel()}
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-lg shadow-sm border border-emerald-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route/Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight/Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.action}</div>
                          <div className="text-xs text-gray-500">{item.details}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.bagNo && <div><span className="font-medium">Bag:</span> {item.bagNo}</div>}
                        {item.driverName && <div><span className="font-medium">Driver:</span> {item.driverName}</div>}
                        {item.vehicleNo && <div><span className="font-medium">Vehicle:</span> {item.vehicleNo}</div>}
                        {item.bagNos && <div><span className="font-medium">Bags:</span> {item.bagNos.join(', ')}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.routeNo && <div className="text-emerald-700 font-medium">{item.routeNo}</div>}
                        {item.supplierName && <div>{item.supplierName}</div>}
                        {item.supplierNo && <div className="text-xs text-gray-500">{item.supplierNo}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {item.weight && <div className="text-emerald-700 font-medium">{item.weight}</div>}
                        {item.totalWeight && <div className="text-emerald-700 font-medium">{item.totalWeight}</div>}
                        {item.netWeight && <div className="text-emerald-700 font-medium">{item.netWeight}</div>}
                        {item.emptyWeight && <div className="text-red-600 text-xs">Empty: {item.emptyWeight}</div>}
                        {item.totalBags && <div className="text-xs text-gray-500">{item.totalBags} bags</div>}
                        {item.totalSuppliers && <div className="text-xs text-gray-500">{item.totalSuppliers} suppliers</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusBadge(item.status)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-medium text-gray-900">{item.timestamp.split(' ')[1]}</div>
                      <div className="text-xs">{item.date}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No History Records Found</h3>
              <p>No records match your current search and filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}