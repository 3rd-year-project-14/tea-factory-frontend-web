import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function DriverRoute() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const [suppliers] = useState([
    { bagNo: 'TN-B1', supplierNo: 'TN-S101', supplierName: 'Supplier - 1', weight: '20 Kg' },
    { bagNo: 'TN-B2', supplierNo: 'TN-S102', supplierName: 'Supplier - 2', weight: '22 Kg' },
    { bagNo: 'TN-B4', supplierNo: 'TN-S103', supplierName: 'Supplier - 3', weight: '14 Kg' },
    { bagNo: 'TN-B5', supplierNo: 'TN-S104', supplierName: 'Supplier - 4', weight: '24 Kg' },
    { bagNo: 'TN-B6', supplierNo: 'TN-S104', supplierName: 'Supplier - 4', weight: '25 Kg' },
    { bagNo: 'TN-B7', supplierNo: 'TN-S104', supplierName: 'Supplier - 4', weight: '14 Kg' }
  ]);

  // Calculate statistics
  const totalSuppliers = [...new Set(suppliers.map(s => s.supplierNo))].length;
  const totalBags = suppliers.length;
  const totalWeight = suppliers.reduce((sum, supplier) => {
    return sum + parseFloat(supplier.weight.replace(' Kg', ''));
  }, 0);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.bagNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplierNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-8xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="bg-white shadow-sm p-4 mb-6 border-emerald-200 border transition-all duration-200">
          <h1 className="text-2xl font-bold text-gray-900">Suppler Bags</h1>
        </div>

        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white px-4 py-3 rounded-lg shadow-md border border-black-200 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black-700">No of Suppliers</p>
                <p className="text-2xl font-bold text-black-800">{totalSuppliers}</p>
                <p className="text-xs text-black-600">Unique Suppliers</p>
              </div>
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">👥</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white px-4 py-3 rounded-lg shadow-md border border-black-200 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black-700">No of Bags</p>
                <p className="text-2xl font-bold text-black-800">{totalBags}</p>
                <p className="text-xs text-black-600">Total Bags</p>
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">📦</div>
              </div>
            </div>
          </div>
          
           <div className="bg-white px-4 py-3 rounded-lg shadow-md border border-black-200 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black-700">Total Weight</p>
                <p className="text-2xl font-bold text-black-800">{totalWeight} Kg</p>
                <p className="text-xs text-black-600">Combined Weight</p>
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">⚖️</div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Information Form */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route No
              </label>
              <div className="text-lg font-semibold text-emerald-800">TN-2</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route Name
              </label>
              <div className="text-lg font-semibold text-gray-900">Nugegoda</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Driver Name
              </label>
              <div className="text-lg font-semibold text-gray-900">Pasindu</div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 ">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Supplier Bags</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {filteredSuppliers.length} Bags
              </span>
            </div>
          </div>
        </div>

        {/* Suppliers Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden border-emerald-200 duration-200">
          <div className="bg-[#01251F] text-white">
            <div className="grid grid-cols-4 gap-4 p-3 font-medium text-center">
              <div>Bag No</div>
              <div>Supplier No</div>
              <div>Supplier Name</div>
              <div>Weight</div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredSuppliers.map((supplier, index) => (
              <div 
                key={index}
                onClick={() => navigate(`/inventoryManager/empty_bags_weight_supplier_all`)}
                className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50 cursor-pointer"
              >
                <div className="font-medium text-gray-900 text-center">{supplier.bagNo}</div>
                <div className="text-gray-600 text-center">{supplier.supplierNo}</div>
                <div className="text-gray-600 text-center">{supplier.supplierName}</div>
                <div className="text-emerald-700 font-medium text-center">{supplier.weight}</div>
              </div>
            ))}
            
            {filteredSuppliers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No suppliers found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}