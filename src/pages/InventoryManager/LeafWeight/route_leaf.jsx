import React, { useState } from 'react';
import { Search} from 'lucide-react';
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

  const totalSuppliers = [...new Set(suppliers.map(s => s.supplierNo))].length;
  const totalBags = suppliers.length;
  const totalWeight = suppliers.reduce((sum, s) => sum + parseFloat(s.weight.replace(' Kg', '')), 0);

  const filteredSuppliers = suppliers.filter(s =>
    s.bagNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.supplierNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header */}
        <div className="bg-white p-4 shadow-sm " >
          <h1 className="text-2xl font-bold" style={{ color: "#165E52" }}>Route Details</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'No of Suppliers', value: totalSuppliers, subtitle: 'Unique Suppliers', icon: '👥' },
            { label: 'No of Bags', value: totalBags, subtitle: 'Total Bags', icon: '📦' },
            { label: 'Total Weight', value: `${totalWeight} Kg`, subtitle: 'Combined Weight', icon: '⚖️' },
          ].map((card, idx) => (
            <div key={idx} className="bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg"
              style={{ borderColor: '#000000' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: '#000000' }}>{card.label}</p>
                  <p className="text-2xl font-bold text-[#000000]">{card.value}</p>
                  <p className="text-xs" style={{ color: '#000000' }}>{card.subtitle}</p>
                </div>
                <div className="h-10 w-10 bg-[#f3f4f6] rounded-full flex items-center justify-center text-lg">
                  <span className="text-[#165E52]">{card.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Route Info + Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: "#cfece6" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: "#165E52" }}>Route No</label>
              <div className="text-lg font-bold text-[#01251F]">TN-2</div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: "#165E52" }}>Route Name</label>
              <div className="text-lg font-bold text-gray-800">Nugegoda</div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: "#165E52" }}>Driver Name</label>
              <div className="text-lg font-bold text-gray-800">Pasindu</div>
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-full px-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50
                 focus:outline-none focus:ring-2 focus:ring-[#165E52] focus:border-transparent"
              />
              <Search className="absolute text-gray-400 h-4 w-4 right-3 top-3" />
            </div>
          </div>
        </div>

        {/* Supplier Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: "#cfece6" }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold" style={{ color: "#165E52" }}>Supplier Bags</h2>
              <span className="bg-[#eafaf6] text-[#165E52] px-3 py-1 rounded-full text-xs font-medium">
                {filteredSuppliers.length} Bags
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "#cfece6" }}>
          <div className="bg-[#01251F] text-white">
            <div className="grid grid-cols-4 gap-4 p-3 text-sm font-semibold text-center">
              <div>Bag No</div>
              <div>Supplier No</div>
              <div>Supplier Name</div>
              <div>Weight</div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredSuppliers.map((supplier, index) => (
              <div
                key={index}
                onClick={() => navigate(`/inventoryManager/weight_bags_weight`)}
                className="grid grid-cols-4 gap-4 p-4 text-center hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="font-medium text-[#01251F]">{supplier.bagNo}</div>
                <div className="text-gray-700">{supplier.supplierNo}</div>
                <div className="text-gray-700">{supplier.supplierName}</div>
                <div className="font-medium text-[#165E52]">{supplier.weight}</div>
              </div>
            ))}

            {filteredSuppliers.length === 0 && (
              <div className="p-8 text-center text-gray-500">No suppliers found matching your search.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
