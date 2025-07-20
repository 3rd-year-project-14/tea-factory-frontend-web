import React, { useState } from 'react';

export default function Supplier() {
  const [selectedBags, setSelectedBags] = useState(['TN-B5', 'TN-B6']);
  const [selectedBagsWeight, setSelectedBagsWeight] = useState('');

  const [teaBags] = useState([
    { bagNo: 'TN-B5', driverWeight: '24 Kg', condition: 'Good', newWeight: '24 Kg' },
    { bagNo: 'TN-B6', driverWeight: '25 Kg', condition: 'Good', newWeight: '25 Kg' },
    { bagNo: 'TN-B7', driverWeight: '25 Kg', condition: 'Good', newWeight: '25 Kg' },
  ]);

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
      selectedBagsWeight,
      
    });
  };

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Supplier Info Card */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Supplier No</span>
              <div className="font-medium text-gray-900">TN-S104</div>
            </div>
            <div>
              <span className="text-gray-600">Supplier Name</span>
              <div className="font-medium text-gray-900">Supplier - 4</div>
            </div>
          </div>
        </div>

        {/* Bags Containing Tea Leaves */}
        <h2 className="text-lg font-semibold text-gray-900 p-4 ">Bags Containing Tea Leaves</h2>
        {/* <div className="bg-white rounded-lg shadow-sm border overflow-hidden"> */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden max-w-md">

          
          
          {/* Table Header */}
          <div className="bg-green-600 text-white">
            <div className="grid grid-cols-5 gap-4 p-3 font-medium text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={selectedBags.length === teaBags.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBags(teaBags.map(bag => bag.bagNo));
                    } else {
                      setSelectedBags([]);
                    }
                  }}
                />
                Bag No
              </div>
             
            </div>
          </div>
          
          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {teaBags.map((bag, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 p-3 items-center hover:bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={selectedBags.includes(bag.bagNo)}
                    onChange={() => handleBagSelection(bag.bagNo)}
                  />
                  <span className="font-medium text-gray-900 text-sm">{bag.bagNo}</span>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        {/* In Factory Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">In Factory</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Selected Bags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Bags</label>
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded border min-h-10">
                {selectedBags.join(' ')}
              </div>
            </div>

            {/* Selected Bags Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Bags Weight</label>
              <input
                type="text"
                value={selectedBagsWeight}
                onChange={(e) => setSelectedBagsWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Enter weight"
              />
            </div>

            {/* Leaf Type Radio Buttons */}
            

            {/* Enter Button */}
            <div>
              <button
                onClick={handleEnter}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 text-sm rounded transition-colors duration-200 w-full"
              >
                Enter
              </button>
            </div>
          </div>
        </div>

        {/* Measured Tea Leaf Bags Section */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Measured Tea Leaf Bags</h2>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          
          <div className="text-gray-500 text-sm text-center py-8">
            No measured tea leaf bags data available
          </div>
        </div>
      </div>
    </div>
  );
}