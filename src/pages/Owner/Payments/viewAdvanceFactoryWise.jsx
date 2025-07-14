import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const factoryAdvances = [
  { factory: 'Factory A', amount: 70000 },
  { factory: 'Factory B', amount: 50000 },
  { factory: 'Factory C', amount: 40000 },
  { factory: 'Factory D', amount: 20000 },
];

export default function ViewAdvanceFactoryWise() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.state?.title || 'Factory-wise Advances Given';
  const label = location.state?.label || 'Advances (LKR)';
  const data = location.state?.data || factoryAdvances;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium"
            >Back</button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(fp => (
                <tr key={fp.factory}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">{fp.factory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold">LKR {fp.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
