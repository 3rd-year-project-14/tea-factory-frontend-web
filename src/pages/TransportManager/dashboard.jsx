import React, { useState } from 'react';

export default function LeafWeight() {
  const [suppliers] = useState([
    {
      id: 'TN-B7',
      name: 'Supplier - 4',
      weight: '14 Kg',
      condition: 'Wet',
      newWeight: '12 Kg'
    }
  ]);

  const [bags] = useState([
    {
      bagNo: 'TN-B5',
      pastWeight: '24 Kg',
      condition: 'Good',
      newWeight: '24 Kg'
    },
    {
      bagNo: 'TN-B6',
      pastWeight: '25 Kg',
      condition: 'Good',
      newWeight: '25 Kg'
    },
    {
      bagNo: 'TN-B7',
      pastWeight: '14 Kg',
      condition: 'Wet',
      newWeight: '12 Kg'
    }
  ]);

  const totalWeight = bags.reduce((sum, bag) => {
    return sum + parseInt(bag.newWeight.replace(' Kg', ''));
  }, 0);

  const getConditionBadge = (condition) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    
    switch (condition.toLowerCase()) {
      case 'good':
        return `${baseClasses} bg-green-500 text-white`;
      case 'wet':
        return `${baseClasses} bg-blue-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">No of Suppliers</div>
            <div className="text-2xl font-bold text-gray-900">12</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">No of Bags</div>
            <div className="text-2xl font-bold text-gray-900">12</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Weight</div>
            <div className="text-2xl font-bold text-gray-900">12</div>
          </div>
        </div>

        {/* Supplier Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-600 mb-4">
              <div className="col-span-2">Supplier No</div>
              <div className="col-span-3">Supplier Name</div>
              <div className="col-span-2">Weight</div>
              <div className="col-span-2">Condition</div>
              <div className="col-span-2">New Weight</div>
              <div className="col-span-1"></div>
            </div>
            
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="grid grid-cols-12 gap-4 items-center py-3 bg-gray-100 rounded-lg">
                <div className="col-span-2 font-medium text-gray-900">{supplier.id}</div>
                <div className="col-span-3 text-gray-900">{supplier.name}</div>
                <div className="col-span-2 text-gray-900">{supplier.weight}</div>
                <div className="col-span-2">
                  <span className={getConditionBadge(supplier.condition)}>
                    {supplier.condition}
                  </span>
                </div>
                <div className="col-span-2 text-gray-900">{supplier.newWeight}</div>
                <div className="col-span-1">
                  <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Enter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bags Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-green-600 text-white">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium">
              <div>Bag No</div>
              <div>Past Weight</div>
              <div>Condition</div>
              <div>New Weight</div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {bags.map((bag, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="font-medium text-gray-900">{bag.bagNo}</div>
                <div className="text-gray-900">{bag.pastWeight}</div>
                <div>
                  <span className={getConditionBadge(bag.condition)}>
                    {bag.condition}
                  </span>
                </div>
                <div className="text-gray-900">{bag.newWeight}</div>
              </div>
            ))}
          </div>
          
          {/* Total Weight Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-4">
            <div className="flex justify-end items-center space-x-4">
              <span className="font-medium text-gray-900">Total Weight</span>
              <span className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold">
                {totalWeight} Kg
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}