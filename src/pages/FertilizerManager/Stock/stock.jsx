import React, { useState, useMemo } from 'react';
import { Search, Package, AlertTriangle, TrendingUp, Filter, Plus, Edit3, Eye } from 'lucide-react';

const FertilizerManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Sample fertilizer data
  const [fertilizers] = useState([
    {
      id: 1,
      name: 'NPK 20-20-20',
      category: 'Complete Fertilizer',
      currentStock: 450,
      minStock: 200,
      maxStock: 1000,
      unit: 'kg',
      pricePerUnit: 2.50,
      supplier: 'GreenGrow Supplies',
      lastRestocked: '2024-06-15',
      expiryDate: '2025-12-31',
      location: 'Warehouse A-1'
    },
    {
      id: 2,
      name: 'Urea 46-0-0',
      category: 'Nitrogen Fertilizer',
      currentStock: 120,
      minStock: 150,
      maxStock: 800,
      unit: 'kg',
      pricePerUnit: 1.80,
      supplier: 'FarmTech Ltd',
      lastRestocked: '2024-06-20',
      expiryDate: '2025-08-15',
      location: 'Warehouse B-2'
    },
    {
      id: 3,
      name: 'Phosphate Rock',
      category: 'Phosphorus Fertilizer',
      currentStock: 680,
      minStock: 300,
      maxStock: 1200,
      unit: 'kg',
      pricePerUnit: 3.20,
      supplier: 'Natural Nutrients',
      lastRestocked: '2024-06-10',
      expiryDate: '2026-03-20',
      location: 'Warehouse A-3'
    },
    {
      id: 4,
      name: 'Potassium Sulfate',
      category: 'Potassium Fertilizer',
      currentStock: 75,
      minStock: 100,
      maxStock: 600,
      unit: 'kg',
      pricePerUnit: 4.10,
      supplier: 'AgriChem Solutions',
      lastRestocked: '2024-05-28',
      expiryDate: '2025-11-10',
      location: 'Warehouse C-1'
    },
    {
      id: 5,
      name: 'Organic Compost',
      category: 'Organic Fertilizer',
      currentStock: 320,
      minStock: 200,
      maxStock: 500,
      unit: 'kg',
      pricePerUnit: 1.20,
      supplier: 'EcoFarm Organics',
      lastRestocked: '2024-06-25',
      expiryDate: '2024-12-01',
      location: 'Warehouse D-1'
    },
    {
      id: 6,
      name: 'Calcium Nitrate',
      category: 'Calcium Fertilizer',
      currentStock: 290,
      minStock: 150,
      maxStock: 700,
      unit: 'kg',
      pricePerUnit: 2.90,
      supplier: 'MinChem Industries',
      lastRestocked: '2024-06-18',
      expiryDate: '2025-09-30',
      location: 'Warehouse B-1'
    }
  ]);

  const getStockStatus = (current, min, max) => {
    if (current <= min) return 'low';
    if (current >= max * 0.8) return 'high';
    return 'normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'low': return 'text-red-600 bg-red-50';
      case 'high': return 'text-green-600 bg-green-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'low': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <TrendingUp className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredAndSortedFertilizers = useMemo(() => {
    let filtered = fertilizers.filter(fertilizer => {
      const matchesSearch = fertilizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fertilizer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fertilizer.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterStatus === 'all') return matchesSearch;
      
      const status = getStockStatus(fertilizer.currentStock, fertilizer.minStock, fertilizer.maxStock);
      return matchesSearch && status === filterStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
  case 'stock':
    return b.currentStock - a.currentStock;
  case 'status': {
    const statusA = getStockStatus(a.currentStock, a.minStock, a.maxStock);
    const statusB = getStockStatus(b.currentStock, b.minStock, b.maxStock);
    return statusA.localeCompare(statusB);
  }
  default:
    return a.name.localeCompare(b.name);
}

    });
  }, [fertilizers, searchTerm, filterStatus, sortBy]);

  const totalValue = fertilizers.reduce((sum, fert) => sum + (fert.currentStock * fert.pricePerUnit), 0);
  const lowStockItems = fertilizers.filter(fert => getStockStatus(fert.currentStock, fert.minStock, fert.maxStock) === 'low').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-3 
              hover:shadow-lg hover:scale-[1.03] hover:border-green-300
              transition duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-xs font-medium">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{fertilizers.length}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-xl">
                <Package className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>


          

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 
            hover:shadow-lg hover:scale-[1.03] hover:border-green-300
            transition duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-xs font-medium">Low Stock Alert</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
            </div>
            <div className="bg-red-100 p-2 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 
            hover:shadow-lg hover:scale-[1.03] hover:border-green-300
            transition duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-medium">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 
            hover:shadow-lg hover:scale-[1.03] hover:border-green-300
            transition duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-xs font-medium">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{new Set(fertilizers.map(f => f.category)).size}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-xl">
              <Filter className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>


        {/* Search and Filter Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search fertilizers, categories, or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add New Stock</span>
            </button>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Stock Levels</option>
                <option value="low">Low Stock</option>
                <option value="normal">Normal Stock</option>
                <option value="high">High Stock</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="stock">Sort by Stock Level</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fertilizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedFertilizers.map((fertilizer) => {
            const status = getStockStatus(fertilizer.currentStock, fertilizer.minStock, fertilizer.maxStock);
            const stockPercentage = (fertilizer.currentStock / fertilizer.maxStock) * 100;
            
            return (
              <div key={fertilizer.id} className="bg-white rounded-2xl shadow-sm border border-green-100 hover:shadow-lg transition-all duration-200 overflow-hidden group">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{fertilizer.name}</h3>
                      <p className="text-green-600 font-medium text-sm">{fertilizer.category}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                      <span className="capitalize">{status}</span>
                    </div>
                  </div>

                  {/* Stock Information */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Current Stock</span>
                        <span className="text-2xl font-bold text-gray-900">{fertilizer.currentStock} {fertilizer.unit}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            status === 'low' ? 'bg-red-500' : 
                            status === 'high' ? 'bg-green-500' : 
                            'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Min: {fertilizer.minStock} {fertilizer.unit}</span>
                        <span>Max: {fertilizer.maxStock} {fertilizer.unit}</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price/Unit</p>
                        <p className="text-lg font-semibold text-gray-900">${fertilizer.pricePerUnit}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Value</p>
                        <p className="text-lg font-semibold text-gray-900">${(fertilizer.currentStock * fertilizer.pricePerUnit).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
                        <p className="text-sm font-medium text-gray-700">{fertilizer.location}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Supplier</p>
                        <p className="text-sm font-medium text-gray-700">{fertilizer.supplier}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <button className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-xl hover:bg-green-100 transition-colors font-medium flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-xl hover:bg-blue-100 transition-colors font-medium flex items-center justify-center space-x-2">
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAndSortedFertilizers.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No fertilizers found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerManager;