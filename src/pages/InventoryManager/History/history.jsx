import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LeafWeight() {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('Feb');
  const [day, setDay] = useState('10');
  const [routeName, setRouteName] = useState('Thimbirigasyaya - Nugegoda');

  const [historyData] = useState([
    { supplierNo: 'TN-S101', supplierName: 'Supplier - 1', noOfBags: 1, weight: '20 Kg' },
    { supplierNo: 'TN-S102', supplierName: 'Supplier - 2', noOfBags: 1, weight: '20 Kg' },
    { supplierNo: 'TN-S103', supplierName: 'Supplier - 3', noOfBags: 1, weight: '20 Kg' },
    { supplierNo: 'TN-S104', supplierName: 'Supplier - 4', noOfBags: 3, weight: '74 Kg' }
  ]);

  const years = ['2023', '2024', '2025'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const routes = [
    'Thimbirigasyaya - Nugegoda',
    'Colombo - Kandy',
    'Galle - Matara',
    'Kurunegala - Anuradhapura'
  ];

  const handleEnter = () => {
    console.log('Fetching data for:', { year, month, day, routeName });
  };

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">History</h1>

        {/* Filters Card */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Year Dropdown */}
            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Year</label>
            </div>

            {/* Month Dropdown */}
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Month</label>
            </div>

            {/* Day Dropdown */}
            <div className="relative">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Day</label>
            </div>

            {/* Route Dropdown */}
            <div className="relative min-w-[14rem]">
              <select
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {routes.map(route => (
                  <option key={route} value={route}>{route}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">Route Name</label>
            </div>

            {/* Enter button */}
            <button
              onClick={handleEnter}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 text-sm rounded transition-colors duration-200 ml-4"
            >
              Enter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Table Header */}
          <div className="bg-green-600 text-white">
            <div className="grid grid-cols-4 gap-4 p-3 font-medium text-center">
              <div>Supplier No</div>
              <div>Supplier Name</div>
              <div>No of Bags</div>
              <div>Weight</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {historyData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50"
              >
                <div className="font-medium text-gray-900 text-center">{item.supplierNo}</div>
                <div className="text-gray-600 text-center">{item.supplierName}</div>
                <div className="text-gray-900 font-medium text-center ">{item.noOfBags}</div>
                <div className="text-gray-900 font-medium text-center">{item.weight}</div>
              </div>
            ))}

            {historyData.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No data found for the selected criteria.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
