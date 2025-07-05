import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const factoryLoans = [
  { factory: 'Factory A', amount: 120000 },
  { factory: 'Factory B', amount: 90000 },
  { factory: 'Factory C', amount: 80000 },
  { factory: 'Factory D', amount: 60000 },
];

export default function ViewLoanFactoryWise() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.state?.title || 'Factory-wise Loan Amount';
  const label = location.state?.label || 'Loan Amount (LKR)';
  const data = location.state?.data || factoryLoans;

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
