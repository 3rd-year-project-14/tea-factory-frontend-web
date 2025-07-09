import React, { useState, useEffect } from 'react';

const History = () => {
  // Sample data - in real application, this would come from an API
  const [historyData] = useState([
    {
      id: 1,
      date: '2024-07-04',
      type: 'supplier',
      requester: 'Green Valley Supplies',
      fertilizer: 'NPK 15-15-15',
      quantity: '500 kg',
      status: 'pending',
      notes: 'Urgent request for summer season'
    },
    {
      id: 2,
      date: '2024-07-03',
      type: 'manager',
      requester: 'John Smith',
      fertilizer: 'Urea 46-0-0',
      quantity: '1000 kg',
      status: 'approved',
      notes: 'For field section A'
    },
    {
      id: 3,
      date: '2024-07-02',
      type: 'supplier',
      requester: 'AgriCorp Ltd',
      fertilizer: 'Potash 0-0-60',
      quantity: '750 kg',
      status: 'delivered',
      notes: 'Delivery completed on time'
    },
    {
      id: 4,
      date: '2024-07-01',
      type: 'manager',
      requester: 'Sarah Johnson',
      fertilizer: 'Phosphate 0-46-0',
      quantity: '300 kg',
      status: 'rejected',
      notes: 'Budget constraints'
    },
    {
      id: 5,
      date: '2024-06-30',
      type: 'supplier',
      requester: 'FarmTech Solutions',
      fertilizer: 'Calcium Nitrate',
      quantity: '400 kg',
      status: 'approved',
      notes: 'Special order for greenhouse'
    },
    {
      id: 6,
      date: '2024-06-29',
      type: 'manager',
      requester: 'Mike Davis',
      fertilizer: 'NPK 20-20-20',
      quantity: '800 kg',
      status: 'delivered',
      notes: 'For organic section'
    },
    {
      id: 7,
      date: '2024-06-28',
      type: 'supplier',
      requester: 'EcoFarm Supplies',
      fertilizer: 'Compost Blend',
      quantity: '2000 kg',
      status: 'pending',
      notes: 'Seasonal requirement'
    },
    {
      id: 8,
      date: '2024-06-27',
      type: 'manager',
      requester: 'Lisa Chen',
      fertilizer: 'Liquid Fertilizer',
      quantity: '200 L',
      status: 'approved',
      notes: 'For hydroponic system'
    }
  ]);

  const [stockData] = useState([
    {
      id: 1,
      name: 'NPK 15-15-15',
      current: 1250,
      minimum: 500,
      maximum: 2000,
      unit: 'kg',
      supplier: 'Green Valley Supplies'
    },
    {
      id: 2,
      name: 'Urea 46-0-0',
      current: 3200,
      minimum: 1000,
      maximum: 4000,
      unit: 'kg',
      supplier: 'AgriCorp Ltd'
    },
    {
      id: 3,
      name: 'Potash 0-0-60',
      current: 450,
      minimum: 600,
      maximum: 1500,
      unit: 'kg',
      supplier: 'FarmTech Solutions'
    },
    {
      id: 4,
      name: 'Phosphate 0-46-0',
      current: 800,
      minimum: 400,
      maximum: 1200,
      unit: 'kg',
      supplier: 'EcoFarm Supplies'
    },
    {
      id: 5,
      name: 'Calcium Nitrate',
      current: 200,
      minimum: 300,
      maximum: 800,
      unit: 'kg',
      supplier: 'Green Valley Supplies'
    },
    {
      id: 6,
      name: 'NPK 20-20-20',
      current: 1800,
      minimum: 800,
      maximum: 2500,
      unit: 'kg',
      supplier: 'AgriCorp Ltd'
    }
  ]);

  // Filter states
  const [filters, setFilters] = useState({
    requestType: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    searchTerm: ''
  });

  const [filteredData, setFilteredData] = useState(historyData);

  // Apply filters
  useEffect(() => {
    let filtered = historyData.filter(item => {
      const matchesType = !filters.requestType || item.type === filters.requestType;
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesDateFrom = !filters.dateFrom || item.date >= filters.dateFrom;
      const matchesDateTo = !filters.dateTo || item.date <= filters.dateTo;
      const matchesSearch = !filters.searchTerm || 
        item.fertilizer.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.requester.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesType && matchesStatus && matchesDateFrom && matchesDateTo && matchesSearch;
    });

    setFilteredData(filtered);
  }, [filters, historyData]);

  // Calculate statistics
  const stats = {
    totalRequests: filteredData.length,
    pendingRequests: filteredData.filter(item => item.status === 'pending').length,
    totalStock: stockData.reduce((sum, item) => sum + item.current, 0),
    lowStockItems: stockData.filter(item => item.current < item.minimum).length
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      requestType: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      searchTerm: ''
    });
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge classes
  const getStatusBadgeClass = (status) => {
    const baseClass = 'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider';
    switch (status) {
      case 'pending':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'approved':
        return `${baseClass} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClass} bg-red-100 text-red-800`;
      case 'delivered':
        return `${baseClass} bg-green-200 text-green-900`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  };

  // Get stock percentage
  const getStockPercentage = (current, maximum) => {
    return Math.min((current / maximum) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"> */}
        
       

        {/* Dashboard Stats */}
        <div className="bg-gray-50 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-green-500">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalRequests}</div>
              <div className="text-sm text-green-700 uppercase tracking-wide font-semibold">Total Requests</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-green-500">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.pendingRequests}</div>
              <div className="text-sm text-green-700 uppercase tracking-wide font-semibold">Pending Requests</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-green-500">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalStock.toLocaleString()}</div>
              <div className="text-sm text-green-700 uppercase tracking-wide font-semibold">Total Stock (kg)</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-green-500">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.lowStockItems}</div>
              <div className="text-sm text-green-700 uppercase tracking-wide font-semibold">Low Stock Items</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-8 bg-white border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2">Request Type</label>
              <select
                value={filters.requestType}
                onChange={(e) => handleFilterChange('requestType', e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              >
                <option value="">All Types</option>
                <option value="supplier">Supplier Request</option>
                <option value="manager">Manager Request</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2">Date To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-green-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                placeholder="Search fertilizer or requester..."
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {/* Apply filters is handled by useEffect */}}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transform hover:-translate-y-1 transition-all duration-200 font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-600 transform hover:-translate-y-1 transition-all duration-200 font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Request History Table */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-green-600 mb-6 pb-2 border-b-2 border-green-500 inline-block">
            📋 Request History
          </h2>
          
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-sm">Date</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-sm">Type</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-sm">Requester</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-sm">Fertilizer</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-sm">Quantity</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-sm">Status</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-sm">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-green-600">
                      No records found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-green-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm text-green-600">{formatDate(item.date)}</td>
                      <td className="px-6 py-4">
                        {item.type === 'supplier' ? '🏪 Supplier' : '👤 Manager'}
                      </td>
                      <td className="px-6 py-4 text-sm">{item.requester}</td>
                      <td className="px-6 py-4 text-sm">{item.fertilizer}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">{item.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadgeClass(item.status)}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.notes}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Stock Levels */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-green-600 mb-6 pb-2 border-b-2 border-green-500 inline-block">
            📦 Current Stock Levels
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockData.map((item) => {
              const stockPercentage = getStockPercentage(item.current, item.maximum);
              const isLowStock = item.current < item.minimum;
              
              return (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-green-500">
                  <div className="text-xl font-bold text-green-600 mb-4">{item.name}</div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600 font-medium">Current Stock:</span>
                      <span className="text-sm font-semibold text-green-700">{item.current.toLocaleString()} {item.unit}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600 font-medium">Minimum Level:</span>
                      <span className="text-sm font-semibold text-green-700">{item.minimum.toLocaleString()} {item.unit}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600 font-medium">Supplier:</span>
                      <span className="text-sm font-semibold text-green-700">{item.supplier}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-green-600 font-medium">Status:</span>
                      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                        isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {isLowStock ? '⚠️ Low Stock' : '✅ Normal'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stockPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      {/* </div> */}
    </div>
  );
};

export default History;