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

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.bagNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplierNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg shadow-sm border p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">No of Suppliers</span>
              <span className="text-xl font-bold text-gray-900"></span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">No of Bags</span>
              <span className="text-xl font-bold text-gray-900">12</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">Total Weight</span>
              <span className="text-xl font-bold text-gray-900">12</span>
            </div>
          </div>
        </div>

        {/* Route Information Form */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Route No
              </label>
              <input 
                type="text" 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Route Name
              </label>
              <input 
                type="text" 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Driver Name
              </label>
              <input 
                type="text" 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-black"
              />
              <Search className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Suppliers Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-green-600 text-white">
            <div className="grid grid-cols-6 gap-4 p-3 font-medium text-sm text-center">
              <div>Bag No</div>
              <div>Supplier No</div>
              <div>Supplier Name</div>
              <div>Weight</div>

            </div>
          </div>
          
          
          <div className="divide-y divide-gray-200">
            {filteredSuppliers.map((supplier, index) => (
              <div key={index}
               onClick={() => navigate(`/inventoryManager/bags_weight_supplier`)}
               className="grid grid-cols-6 gap-4 p-3 items-center hover:bg-gray-50 cursor-pointer">
                <div className="font-medium text-gray-900 text-center">{supplier.bagNo}</div>
                <div className="text-gray-600 text-center">{supplier.supplierNo}</div>
                <div className="text-gray-600 text-center">{supplier.supplierName}</div>
                <div className="text-gray-900 font-medium text-center">{supplier.weight}</div>
                <div></div>
                <div className="flex gap-2">                
               </div>
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