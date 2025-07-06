import { useState as useReactState, useState } from 'react';
import ViewAdvanceFactoryWise from './viewAdvanceFactoryWise';
import ViewLoanFactoryWise from './viewLoanFactoryWise';
import ViewPaymentFactoryWise from './viewPaymentFactoryWise';

// Inline factory data for search/select
const factoryData = [
  { factory: 'Factory A', teaPayment: 500000, loan: 120000, advance: 70000 },
  { factory: 'Factory B', teaPayment: 350000, loan: 90000, advance: 50000 },
  { factory: 'Factory C', teaPayment: 250000, loan: 80000, advance: 40000 },
  { factory: 'Factory D', teaPayment: 150000, loan: 60000, advance: 20000 },
];

function Payment() {
  // Example data, replace with real data fetching as needed
  const [totalTeaPayment] = useState(1250000);
  const [totalLoanAmount] = useState(350000);
  const [totalAdvances] = useState(180000);
  const [popup, setPopup] = useReactState(null); // 'tea' | 'loan' | 'advance' | 'factoryDetails' | null
  const [factorySearch, setFactorySearch] = useState('');
  const [selectedFactory, setSelectedFactory] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payments Overview</h1>
              <p className="text-gray-600 mt-1">Owner Dashboard - Payment Summary</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Total Payment for Tea Leaves */}
        <button
          className="bg-white rounded-lg shadow-md border-l-4 border-green-500 p-8 flex flex-col justify-between text-left hover:shadow-lg transition-shadow focus:outline-none"
          onClick={() => setPopup('tea')}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-green-500 bg-green-50 text-green-700 font-semibold text-base shadow-sm">
                Tea Leaves Payment
              </span>
            </div>
            <div className="mb-2">
              <span className="block text-2xl font-bold text-gray-800">LKR {totalTeaPayment.toLocaleString()}</span>
            </div>
            <div className="text-gray-500 text-sm">Total cost paid for tea leaves</div>
          </div>
        </button>

        {/* Total Given Loan Amount */}
        <button
          className="bg-white rounded-lg shadow-md border-l-4 border-blue-500 p-8 flex flex-col justify-between text-left hover:shadow-lg transition-shadow focus:outline-none"
          onClick={() => setPopup('loan')}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-blue-500 bg-blue-50 text-blue-700 font-semibold text-base shadow-sm">
                Loan Amount Given
              </span>
            </div>
            <div className="mb-2">
              <span className="block text-2xl font-bold text-gray-800">LKR {totalLoanAmount.toLocaleString()}</span>
            </div>
            <div className="text-gray-500 text-sm">Total loan amount given to suppliers</div>
          </div>
        </button>

        {/* Total Given Advances */}
        <button
          className="bg-white rounded-lg shadow-md border-l-4 border-yellow-500 p-8 flex flex-col justify-between text-left hover:shadow-lg transition-shadow focus:outline-none"
          onClick={() => setPopup('advance')}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-yellow-500 bg-yellow-50 text-yellow-700 font-semibold text-base shadow-sm">
                Advances Given
              </span>
            </div>
            <div className="mb-2">
              <span className="block text-2xl font-bold text-gray-800">LKR {totalAdvances.toLocaleString()}</span>
            </div>
            <div className="text-gray-500 text-sm">Total advances given to suppliers</div>
          </div>
        </button>
      </div>

      {/* Factory Details Card at the last position - full width, inline search/select */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-md border-l-4 border-blue-400 p-8 flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-blue-400 bg-blue-50 text-blue-700 font-semibold text-base shadow-sm">
                Factory Details Lookup
              </span>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-base mb-2">You can view all payment, loan, and advance details for a specific factory. Use the search box below to find a factory and see its summary.</p>
            </div>
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="Search factory name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-gray-900 placeholder-gray-400 mb-2"
                value={factorySearch}
                onChange={e => {
                  setFactorySearch(e.target.value);
                  setSelectedFactory(null);
                }}
              />
              {/* Show filtered factory list as user types */}
              {factorySearch && factoryData.filter(f => f.factory.toLowerCase().includes(factorySearch.toLowerCase())).length === 0 && (
                <div className="bg-white rounded shadow border border-gray-200 p-3 text-gray-500 text-center mt-2">No factories found.</div>
              )}
              {factorySearch && factoryData.filter(f => f.factory.toLowerCase().includes(factorySearch.toLowerCase())).length > 0 && (
                <div className="bg-white rounded shadow border border-gray-200 divide-y divide-gray-100 max-h-40 overflow-y-auto">
                  {factoryData.filter(f => f.factory.toLowerCase().includes(factorySearch.toLowerCase())).map(f => (
                    <div
                      key={f.factory}
                      className="p-3 cursor-pointer hover:bg-blue-50 rounded transition"
                      onClick={() => setSelectedFactory(f)}
                    >
                      <span className="font-medium text-blue-700">{f.factory}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Factory details summary popup/modal */}
            {selectedFactory && (
              <div className="fixed inset-0 backdrop-blur-[2px] bg-white/60 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto relative">
                  <button
                    onClick={() => setSelectedFactory(null)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-blue-700 mb-4">{selectedFactory.factory}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">Tea Leaves Payment:</span>
                        <span className="text-green-700 font-bold">LKR {selectedFactory.teaPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">Loan Amount:</span>
                        <span className="text-blue-700 font-bold">LKR {selectedFactory.loan.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">Advances Given:</span>
                        <span className="text-yellow-700 font-bold">LKR {selectedFactory.advance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      {/* Popup Overlay */}
      {popup && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-white/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setPopup(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="p-6">
              {popup === 'tea' && <ViewPaymentFactoryWise />}
              {popup === 'loan' && <ViewLoanFactoryWise />}
              {popup === 'advance' && <ViewAdvanceFactoryWise />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
