import React, { useState } from 'react';


export default function Supplier() {
  const [selectedBags, setSelectedBags] = useState(['TN-B5', 'TN-B6']);
  const [selectedBagsWeight, setSelectedBagsWeight] = useState('');
  const [leafType, setLeafType] = useState('wet');


  const [teaBags] = useState([
    { bagNo: 'TN-B5', driverWeight: '24 Kg' },
    { bagNo: 'TN-B6', driverWeight: '25 Kg' },
    { bagNo: 'TN-B7', driverWeight: '25 Kg' },
  ]);


  const handleBagSelection = (bagNo) => {
    setSelectedBags((prev) =>
      prev.includes(bagNo) ? prev.filter((bag) => bag !== bagNo) : [...prev, bagNo]
    );
  };


  const handleEnter = () => {
    console.log('Processing bags:', {
      selectedBags,
      selectedBagsWeight,
      leafType
    });
  };


  const selectedBagsTotal = teaBags
    .filter((bag) => selectedBags.includes(bag.bagNo))
    .reduce((sum, bag) => sum + parseFloat(bag.driverWeight.replace(' Kg', '')), 0);


  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-5">


        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 " >
          <h1 className="text-2xl font-bold" style={{ color: '#165E52' }}>Bag Weight Management</h1>
        </div>


        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Total Bags',
              value: teaBags.length,
              subtitle: 'Available Bags',
              emoji: '📦',
            },
            {
              label: 'Selected Bags',
              value: selectedBags.length,
              subtitle: 'Currently Selected',
              emoji: '✅',
            },
            {
              label: 'Selected Weight',
              value: `${selectedBagsTotal} Kg`,
              subtitle: 'Total Selected',
              emoji: '⚖️',
            },
          ].map((card, i) => (
            <div key={i} className="bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg"
              style={{ borderColor: '#000000' }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium" style={{ color: '#000000' }}>{card.label}</p>
                  <p className="text-2xl font-bold" style={{ color: '#000000' }}>{card.value}</p>
                  <p className="text-xs" style={{ color: '#000000' }}>{card.subtitle}</p>
                </div>
                <div className="h-10 w-10 bg-[#f3f4f6] rounded-full flex items-center justify-center text-lg">
                  <span className="text-[#000000]">{card.emoji}</span>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Supplier Info */}
        <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: '#cfece6' }}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: '#165E52' }}>Supplier No</label>
              <div className="text-lg font-semibold text-[#01251F]">TN-S104</div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block" style={{ color: '#165E52' }}>Supplier Name</label>
              <div className="text-lg font-semibold text-gray-900">Supplier - 4</div>
            </div>
          </div>
        </div>


        {/* Bags Section Header */}
        <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#cfece6' }}>
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-lg font-semibold" style={{ color: '#165E52' }}>Bags Containing Tea Leaves</h2>
            <span className="bg-[#eafaf6] text-[#165E52] text-xs font-medium px-3 py-1 rounded-full">
              {teaBags.length} Bags Available
            </span>
          </div>
        </div>


        {/* Bags Table */}
        <div className="bg-white rounded-lg border overflow-hidden max-w-2xl" style={{ borderColor: '#cfece6' }}>
          <div className="bg-[#01251F] text-white">
            <div className="grid grid-cols-2 gap-4 p-3 font-medium text-center">
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-[#165E52] border-gray-300 focus:ring-[#165E52]"
                  checked={selectedBags.length === teaBags.length}
                  onChange={(e) =>
                    setSelectedBags(e.target.checked ? teaBags.map(b => b.bagNo) : [])
                  }
                />
                Bag No
              </div>
              <div>Driver Weight</div>
            </div>
          </div>


          <div className="divide-y divide-gray-100">
            {teaBags.map((bag, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 text-[#165E52] border-gray-300 focus:ring-[#165E52]"
                    checked={selectedBags.includes(bag.bagNo)}
                    onChange={() => handleBagSelection(bag.bagNo)}
                  />
                  <span className="font-medium text-gray-900">{bag.bagNo}</span>
                </div>
                <div className="text-center font-medium text-[#165E52]">{bag.driverWeight}</div>
              </div>
            ))}
          </div>
        </div>


        {/* In Factory Section */}
        <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#cfece6' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#165E52' }}>In Factory</h2>
         
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#165E52' }}>Selected Bags</label>
              <div className="bg-[#f6fdfb] p-3 rounded-lg border" style={{ borderColor: '#cfece6', color: '#01251F' }}>
                {selectedBags.length > 0 ? selectedBags.join(', ') : 'No bags selected'}
              </div>
            </div>


            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#165E52' }}>Selected Weight</label>
              <input
                value={selectedBagsWeight}
                onChange={(e) => setSelectedBagsWeight(e.target.value)}
                placeholder="Enter weight"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#165E52] border-gray-300"
              />
            </div>


            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#165E52' }}>Leaf Type</label>
              <div className="flex gap-4">
                {['wet', 'dry'].map((type) => (
                  <label key={type} className="flex items-center text-sm text-gray-800">
                    <input
                      type="radio"
                      name="leafType"
                      value={type}
                      checked={leafType === type}
                      onChange={(e) => setLeafType(e.target.value)}
                      className="h-4 w-4 text-[#165E52] border-gray-300 focus:ring-[#165E52]"
                    />
                    <span className="ml-2 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>


            <div>
              <button
                onClick={handleEnter}
                disabled={selectedBags.length === 0}
                className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform ${
                    selectedBags.length === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#01251F] hover:bg-[#0f3b33] hover:scale-105'
                }`}
              >
                Enter
              </button>
            </div>
          </div>
        </div>


        {/* Measured Bags */}
        <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#cfece6' }}>
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-lg font-semibold" style={{ color: '#165E52' }}>Measured Tea Leaf Bags</h2>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full">No Data</span>
          </div>
        </div>


        <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: '#cfece6' }}>
          <div className="bg-[#01251F] text-white">
            <div className="grid grid-cols-4 gap-4 p-3 text-center font-medium">
              <div>Bag No</div>
              <div>Weight</div>
              <div>Type</div>
              <div>Status</div>
            </div>
          </div>
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-sm">No measured tea leaf bags data available</p>
            <p className="text-xs text-gray-400">Data will appear once bags are processed</p>
          </div>
        </div>
      </div>
    </div>
  );
} 