import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  FileText,
  Check,
  X,
} from "lucide-react";
import AdvanceChart from "../../components/charts/AdvanceChart";

export default function LoanDetails({ loan, onBack, onApprove, onReject }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(loan.monthlyInstallment);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentNotes, setPaymentNotes] = useState("");

  // Modal states for pending loans
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Approval modal state - editable fields
  const [approvedAmount, setApprovedAmount] = useState(loan.totalLoan);
  const [approvedDuration, setApprovedDuration] = useState(loan.duration);
  const [calculatedInstallment, setCalculatedInstallment] = useState(
    loan.monthlyInstallment
  );
  const [approvalNotes, setApprovalNotes] = useState("");

  // Calculate monthly installment using diminishing balance method with 1.25% monthly interest
  const calculateMonthlyInstallment = (principal, duration) => {
    const monthlyInterestRate = 0.0125; // 1.25% per month

    // EMI formula: P * [r(1+r)^n] / [(1+r)^n - 1]
    // Where P = Principal, r = monthly interest rate, n = number of months
    const r = monthlyInterestRate;
    const n = duration;

    if (r === 0) return Math.ceil(principal / n); // If no interest

    const numerator = principal * r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;

    return Math.ceil(numerator / denominator);
  };

  // Reset approval form to original values when modal opens
  const resetApprovalForm = () => {
    setApprovedAmount(loan.totalLoan);
    setApprovedDuration(loan.duration);
    setCalculatedInstallment(loan.monthlyInstallment);
    setApprovalNotes("");
  };

  // Update calculated installment when amount or duration changes
  useEffect(() => {
    setCalculatedInstallment(
      calculateMonthlyInstallment(approvedAmount, approvedDuration)
    );
  }, [approvedAmount, approvedDuration]);

  if (!loan) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const calculateProgress = () => {
    return (loan.paidInstallments / loan.totalInstallments) * 100;
  };

  const handleRecordPayment = () => {
    console.log("Recording payment:", {
      loanId: loan.id,
      amount: paymentAmount,
      method: paymentMethod,
      notes: paymentNotes,
    });
    setShowPaymentModal(false);
    setPaymentAmount(loan.monthlyInstallment);
    setPaymentMethod("cash");
    setPaymentNotes("");
  };

  // Handlers for pending loan approval/rejection
  const handleApproveLoan = () => {
    const totalRepayment = calculatedInstallment * approvedDuration;
    const totalInterest = Math.max(0, totalRepayment - approvedAmount);

    if (onApprove) {
      onApprove(loan.id, {
        approvedAmount: approvedAmount,
        duration: approvedDuration,
        monthlyInstallment: calculatedInstallment,
        interestRate: 1.25, // 1.25% per month
        totalRepayment: totalRepayment,
        totalInterest: totalInterest,
        calculationMethod: "diminishing_balance",
        approvalNotes: approvalNotes,
      });
    }
    setShowApprovalModal(false);
    onBack();
  };

  const handleRejectLoan = () => {
    if (onReject) {
      onReject(loan.id, rejectionReason);
    }
    setShowRejectionModal(false);
    setRejectionReason("");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loan Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-[#e2e8f0]">
              <h2 className="text-xl font-semibold text-[#0f172a]">
                Approve Loan Application from {loan.supplierName}
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-6 text-[#0f172a] text-base">
                <div className="space-y-4 mb-4">
                  {/* Loan Amount and Duration in one row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Loan Amount Input - Left */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approved Loan Amount (Rs)
                      </label>
                      <input
                        type="number"
                        value={approvedAmount}
                        onChange={(e) =>
                          setApprovedAmount(Number(e.target.value))
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter approved amount"
                        min="1000"
                        max="500000"
                        step="1000"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Requested: Rs. {loan.totalLoan.toLocaleString()}
                      </p>
                    </div>

                    {/* Duration Selection - Right */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Duration
                      </label>
                      <select
                        value={approvedDuration}
                        onChange={(e) =>
                          setApprovedDuration(Number(e.target.value))
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>1 Month</option>
                        <option value={2}>2 Months</option>
                        <option value={3}>3 Months</option>
                        <option value={4}>4 Months</option>
                        <option value={5}>5 Months</option>
                        <option value={6}>6 Months</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Requested: {loan.duration} months
                      </p>
                    </div>
                  </div>

                  {/* Approval Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Approval Notes (Optional)
                    </label>
                    <textarea
                      value={approvalNotes}
                      onChange={(e) => setApprovalNotes(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Add any notes about this approval decision..."
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Final Loan Terms
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>
                        • Total Amount: Rs. {approvedAmount.toLocaleString()}
                      </p>
                      <p>• Duration: {approvedDuration} months</p>
                      <p>• Interest Rate: 1.25% per month</p>
                    </div>

                    {/* Right Column */}
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>
                        • Monthly Installment: Rs.{" "}
                        {calculatedInstallment.toLocaleString()}
                      </p>
                      <p>
                        • Total Repayment: Rs.{" "}
                        {(
                          calculatedInstallment * approvedDuration
                        ).toLocaleString()}
                      </p>
                      <p>
                        • Total Interest: Rs.{" "}
                        {Math.max(
                          0,
                          calculatedInstallment * approvedDuration -
                            approvedAmount
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-[#e2e8f0]">
              <button
                className="px-5 py-2 rounded-lg bg-[#f1f5f9] text-[#0f172a] font-semibold hover:bg-[#e2e8f0]"
                onClick={() => setShowApprovalModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-[#10b981] text-white font-semibold hover:bg-[#059669]"
                onClick={handleApproveLoan}
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loan Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-red-200 bg-red-50">
              <h2 className="text-xl font-semibold text-red-800">
                Reject Loan Application from {loan.supplierName}
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-4 text-[#64748b]">
                Are you sure you want to reject this loan application?
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Notes (Optional)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add any notes about this rejection decision..."
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-[#e2e8f0]">
              <button
                className="px-5 py-2 rounded-lg bg-[#f1f5f9] text-[#0f172a] font-semibold hover:bg-[#e2e8f0]"
                onClick={() => setShowRejectionModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-[#ef4444] text-white font-semibold hover:bg-[#dc2626]"
                onClick={handleRejectLoan}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Recording Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-[#e2e8f0]">
              <h2 className="text-xl font-semibold text-[#0f172a]">
                Record Payment
              </h2>
              <button
                className="text-2xl text-[#64748b] hover:text-[#0f172a]"
                onClick={() => setShowPaymentModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount (Rs)
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter payment amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="cash">Cash</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="check">Check</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={paymentNotes}
                    onChange={(e) => setPaymentNotes(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Add any notes about this payment..."
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-[#e2e8f0]">
              <button
                className="px-5 py-2 rounded-lg bg-[#f1f5f9] text-[#0f172a] font-semibold hover:bg-[#e2e8f0]"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-[#10b981] text-white font-semibold hover:bg-[#059669]"
                onClick={handleRecordPayment}
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Header with Quick Stats */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {loan.supplierName}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-500">
                    ID: {loan.supplierId}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  {loan.status === "pending" && (
                    <>
                      <span className="text-sm text-gray-500">
                        Submitted:{" "}
                        {new Date(loan.requestDate).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                    </>
                  )}
                  {loan.status !== "pending" && (
                    <>
                      <span className="text-sm text-gray-500">
                        Started: {new Date(loan.startDate).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                    </>
                  )}
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      loan.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : loan.status === "active"
                        ? "bg-green-100 text-green-800"
                        : loan.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : loan.status === "overdue"
                        ? "bg-red-100 text-red-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {loan.status === "pending"
                      ? "Pending Review"
                      : loan.status === "active"
                      ? "Active"
                      : loan.status === "completed"
                      ? "Completed"
                      : loan.status === "overdue"
                      ? "Overdue"
                      : "Defaulted"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3">
              {loan.status === "pending" && (
                <>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                    onClick={() => {
                      resetApprovalForm();
                      setShowApprovalModal(true);
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                    onClick={() => setShowRejectionModal(true)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </>
              )}
              {loan.status === "active" && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Record Payment
                </button>
              )}
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#f1f5f9] text-[#000] border-none hover:bg-[#e2e8f0] ml-2"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-6">
          {loan.status === "pending" ? (
            <div>
              {/* Pending Loan Request Details - Same as Advance */}
              <div className="bg-white shadow overflow-hidden mb-6 rounded border border-[#94a3b8]">
                <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
                  <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                    Loan Request Details
                  </h2>
                </div>
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Eligibility */}
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                        ELIGIBILITY
                      </span>
                      <span className="text-xl font-bold text-[#10b981]">
                        PASS
                      </span>
                    </div>

                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                          REQUESTED AMOUNT
                        </span>
                        <span className="text-base font-bold text-[#0f172a]">
                          Rs. {loan.totalLoan.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                          DURATION
                        </span>
                        <span className="text-base font-bold text-[#0f172a]">
                          {loan.duration} months
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                          MONTHLY INSTALLMENT
                        </span>
                        <span className="text-base font-bold text-[#0f172a]">
                          Rs. {loan.monthlyInstallment.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                          REQUEST DATE
                        </span>
                        <span className="text-base font-bold text-[#0f172a]">
                          {new Date(loan.requestDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                          EXISTING LOANS
                        </span>
                        <span className="text-base font-bold text-[#0f172a]">
                          Rs. 0
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">
                          SUPPLIER ID
                        </span>
                        <span className="text-base font-bold text-[#0f172a]">
                          {loan.supplierId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart and Timeline below Loan Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tea Supply Chart */}
                <div className="bg-white shadow overflow-hidden rounded border border-[#94a3b8]">
                  <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
                    <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                      Tea Supply Analytics
                    </h2>
                  </div>
                  <div className="px-6 pb-6">
                    <AdvanceChart />
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-white shadow overflow-hidden rounded border border-[#94a3b8]">
                  <div className="p-6 pb-0 border-b border-[#cbd5e1] mb-6">
                    <h2 className="text-lg font-bold text-[#0f172a] mb-2">
                      Activity Timeline
                    </h2>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Loan Request Submitted
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(loan.requestDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}{" "}
                            at 2:30 PM
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Eligibility Assessment
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(loan.requestDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}{" "}
                            at 2:45 PM
                          </p>
                        </div>
                      </div>

                      {loan.status === "pending" && (
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Under Review
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Pending approval decision
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Active/Completed/Overdue/Defaulted Loan Details - Original Layout */
            <div>
              {/* Loan Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Total Loan
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        Rs. {loan.totalLoan.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Paid Amount
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        Rs.{" "}
                        {(
                          loan.totalLoan - loan.remainingBalance
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Remaining
                      </p>
                      <p className="text-2xl font-bold text-orange-600">
                        Rs. {loan.remainingBalance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Next Payment
                      </p>
                      <p className="text-lg font-bold text-purple-600">
                        {loan.nextPaymentDate || "Completed"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Payment Progress
                    </h3>
                    <span className="text-sm font-medium text-gray-600">
                      {loan.paymentStatus}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>
                      Rs.{" "}
                      {(
                        loan.totalLoan - loan.remainingBalance
                      ).toLocaleString()}{" "}
                      paid
                    </span>
                    <span>Rs. {loan.totalLoan.toLocaleString()} total</span>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Loan Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Duration
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {loan.duration} months
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Monthly Installment
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      Rs. {loan.monthlyInstallment.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Supplier ID
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {loan.supplierId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Repayment Log */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Repayment Log
                    </h3>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <FileText className="w-4 h-4 mr-2" />
                      Export Log
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loan.repaymentLog.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(payment.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              Rs. {payment.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 capitalize">
                              {payment.method}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(payment.status)}
                              <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                                {payment.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {payment.notes || "-"}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {loan.repaymentLog.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">
                        No payments recorded yet
                      </p>
                      <p className="text-sm">
                        Payment history will appear here once recorded
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
