import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const factoryData = [
  {
    factory: 'Factory A',
    teaPayment: 500000,
    loan: 120000,
    advance: 70000,
  },
  {
    factory: 'Factory B',
    teaPayment: 350000,
    loan: 90000,
    advance: 50000,
  },
  {
    factory: 'Factory C',
    teaPayment: 250000,
    loan: 80000,
    advance: 40000,
  },
  {
    factory: 'Factory D',
    teaPayment: 150000,
    loan: 60000,
    advance: 20000,
  },
];

export default function FactoryDetails({ onClose }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = search
    ? factoryData.filter(f => f.factory.toLowerCase().includes(search.toLowerCase()))
    : factoryData;

  // Calculate totals for summary
  const totalTea = filtered.reduce((sum, f) => sum + f.teaPayment, 0);
  const totalLoan = filtered.reduce((sum, f) => sum + f.loan, 0);
  const totalAdvance = filtered.reduce((sum, f) => sum + f.advance, 0);

  return (
    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-auto p-8">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-blue-500 bg-blue-50 text-blue-700 font-semibold text-base shadow-sm">
              Factory Payment Details
            </span>
          </h2>
          <p className="text-gray-500 mt-1 text-base">Visual breakdown of tea payment, loan, and advance by factory.</p>
        </div>
        <button
          onClick={onClose ? onClose : () => window.history.back()}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium"
        >Back</button>
      </div>
      <div className="mb-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-700">Total Tea Payment:</span>
            <span className="text-2xl font-bold text-green-700">LKR {totalTea.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-700">Total Loans:</span>
            <span className="text-2xl font-bold text-blue-700">LKR {totalLoan.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-700">Total Advances:</span>
            <span className="text-2xl font-bold text-yellow-700">LKR {totalAdvance.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filtered} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="factory" tick={{ fontSize: 14, fill: '#2563eb' }} />
            <YAxis tick={{ fontSize: 14 }} />
            <Tooltip formatter={v => `LKR ${v.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="teaPayment" fill="#22c55e" name="Tea Payment" radius={[8,8,0,0]} />
            <Bar dataKey="loan" fill="#2563eb" name="Loan" radius={[8,8,0,0]} />
            <Bar dataKey="advance" fill="#eab308" name="Advance" radius={[8,8,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tea Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(fp => (
              <tr key={fp.factory}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">{fp.factory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-700 font-bold">LKR {fp.teaPayment.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-700 font-bold">LKR {fp.loan.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-yellow-700 font-bold">LKR {fp.advance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
