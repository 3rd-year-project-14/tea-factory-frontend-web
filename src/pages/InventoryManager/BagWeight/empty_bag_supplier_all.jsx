import React, { useState } from 'react';

export default function Supplier() {
  const [teaBags] = useState([
    { bagNo: 'TN-B5' },
    { bagNo: 'TN-B6' },
    { bagNo: 'TN-B7' },
  ]);

  const [selectedBags, setSelectedBags] = useState(teaBags.map(bag => bag.bagNo));
  const [selectedBagsWeight, setSelectedBagsWeight] = useState('');

  const handleBagSelection = (bagNo) => {
    setSelectedBags(prev =>
      prev.includes(bagNo)
        ? prev.filter(bag => bag !== bagNo)
        : [...prev, bagNo]
    );
  };

  const handleEnter = () => {
    console.log('Processing bags:', {
      selectedBags,
      selectedBagsWeight
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-5 pb-5 px-4">
      <div className="max-w-8xl mx-auto space-y-4">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 ">
          <h1 className="text-2xl font-bold" style={{ color: '#165E52' }}>Empty Bag Weight Management</h1>
        </div>

        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white px-4 py-3 rounded-lg shadow-md border-black-200 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black-700">Total Bags</p>
                <p className="text-2xl font-bold text-black-800">{teaBags.length}</p>
                <p className="text-xs text-black-600">Available Bags</p>
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">📦</div>
              </div>
            </div>
          </div>

         <div className="bg-white px-4 py-3 rounded-lg shadow-md border-black-200 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black-700">Selected Bags</p>
                <p className="text-2xl font-bold text-black-800">{selectedBags.length}</p>
                <p className="text-xs text-black-600">Currently Selected</p>
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">✅</div>
              </div>
            </div>
          </div>

          <div className="bg-white px-4 py-3 rounded-lg shadow-md border-black-200 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black-700">Selected Weight</p>
                <p className="text-2xl font-bold text-black-800">0 Kg</p>
                <p className="text-xs text-black-600">Total Selected</p>
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">⚖️</div>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 ">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier No</label>
              <div className="text-lg font-semibold text-emerald-800">TN-S104</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name</label>
              <div className="text-lg font-semibold text-gray-900">Supplier - 4</div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 ">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Bags Containing Tea Leaves</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {teaBags.length} Bags Available
              </span>
            </div>
          </div>
        </div>

        {/* Bags Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden ">
          <div className="bg-[#01251F] text-white">
            <div className="p-3 font-medium text-center">Bag No</div>
          </div>
          <div className="divide-y divide-gray-200">
            {teaBags.map((bag, index) => (
              <div
                key={index}
                className="p-4 text-center hover:bg-gray-50 cursor-pointer"
                onClick={() => handleBagSelection(bag.bagNo)}
              >
                <span className={`font-medium ${selectedBags.includes(bag.bagNo)
                  ? 'text-emerald-700 bg-emerald-50 px-2 py-1 rounded'
                  : 'text-gray-900'
                  }`}>
                  {bag.bagNo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* In Factory Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border-emerald-200 border transition-all duration-200 pb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">In Factory</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Bags</label>
              <div className="text-sm text-gray-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200 min-h-10 flex items-center">
                {selectedBags.length > 0 ? selectedBags.join(' ') : 'No bags selected'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Bags Weight</label>
              <input
                type="text"
                value={selectedBagsWeight}
                onChange={(e) => setSelectedBagsWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter weight"
              />
            </div>

            <div>
              <button
                onClick={handleEnter}
                disabled={selectedBags.length === 0}
                className="bg-[#01251F] hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 w-full transform hover:scale-105"
              >
                Enter
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}