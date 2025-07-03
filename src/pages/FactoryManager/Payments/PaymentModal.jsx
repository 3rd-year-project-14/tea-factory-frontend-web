import { teaRate } from "./paymentData";

export default function PaymentModal({
  showPaymentModal,
  closePaymentModal,
  paymentView,
  showConfirmation,
  showConfirmDialog,
  showDownloadDialog,
  handleConfirmPayments,
  handleConfirmYes,
  handleConfirmNo,
  handleDownloadCSV,
  handleDownloadConfirmYes,
  handleDownloadConfirmNo,
  selectedMonth,
  selectedYear,
  monthNames,
  stats,
}) {
  if (!showPaymentModal) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-green-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-center items-center">
            <div>
              <h2 className="text-2xl font-bold">Payment Processing</h2>
              <p className="text-green-100 mt-1">
                {monthNames[selectedMonth]} {selectedYear} - Tea Leaf Payments
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Tea Rate Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 text-center">
                  Submitted Tea Rate
                </h3>
                <div className="text-center">
                  <div className="mb-2">
                    <p className="text-sm text-blue-600">
                      <span className="font-medium">Submission Date:</span>{" "}
                      {teaRate.submittedDate}
                    </p>
                  </div>
                  <div className="flex justify-center gap-6">
                    <p className="text-sm text-blue-600">
                      <span className="font-medium">Grade A:</span> Rs.{" "}
                      {teaRate.rates.gradeA}/kg
                    </p>
                    <p className="text-sm text-blue-600">
                      <span className="font-medium">Grade B:</span> Rs.{" "}
                      {teaRate.rates.gradeB}/kg
                    </p>
                    <p className="text-sm text-blue-600">
                      <span className="font-medium">Grade C:</span> Rs.{" "}
                      {teaRate.rates.gradeC}/kg
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                {/* Show download button only in summary view */}
                {paymentView === "summary" && (
                  <button
                    onClick={handleDownloadCSV}
                    disabled={!showConfirmation}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      showConfirmation
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download CSV
                  </button>
                )}
              </div>
            </div>
          </div>

          {paymentView === "summary" && (
            <div>
              {/* Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Total Payments
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    Rs. {stats.totalAmount.toLocaleString()}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Bank Payments
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    Rs. {stats.bankAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">
                    {stats.bankPayments} suppliers
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">
                    Cash Payments
                  </h3>
                  <p className="text-2xl font-bold text-orange-600">
                    Rs. {stats.cashAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-orange-600">
                    {stats.cashPayments} suppliers
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Button and Confirmation Message - Only show in summary view */}
          {paymentView === "summary" && (
            <div className="mt-8">
              {!showConfirmation && (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleConfirmPayments}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Confirm All Payments
                  </button>
                  <button
                    onClick={closePaymentModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {showConfirmation && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Payments Confirmed Successfully!
                  </h3>
                  <p className="text-green-700 mb-4">
                    All payments for {monthNames[selectedMonth]} {selectedYear}{" "}
                    have been processed and confirmed.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog Modal - Overlay on top of payment modal */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 rounded-full p-3">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Are you sure?
              </h3>
              <p className="text-gray-600 mb-6">
                This will confirm all payments for {monthNames[selectedMonth]}{" "}
                {selectedYear}. This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmYes}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Yes, Confirm
                </button>
                <button
                  onClick={handleConfirmNo}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Confirmation Dialog Modal */}
      {showDownloadDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Download CSV File?
              </h3>
              <p className="text-gray-600 mb-6">
                This will download the payment details as a CSV file for{" "}
                {monthNames[selectedMonth]} {selectedYear}.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDownloadConfirmYes}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Yes, Download
                </button>
                <button
                  onClick={handleDownloadConfirmNo}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
