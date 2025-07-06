import { useState as useReactState, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewAdvanceFactoryWise from './viewAdvanceFactoryWise';
import ViewLoanFactoryWise from './viewLoanFactoryWise';
import ViewPaymentFactoryWise from './viewPaymentFactoryWise';

function Payment() {
  const navigate = useNavigate();
  // Example data, replace with real data fetching as needed
  const [totalTeaPayment] = useState(1250000);
  const [totalLoanAmount] = useState(350000);
  const [totalAdvances] = useState(180000);
  const [popup, setPopup] = useReactState(null); // 'tea' | 'loan' | 'advance' | null

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
