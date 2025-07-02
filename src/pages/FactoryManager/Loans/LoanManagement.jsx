import React, { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, Eye } from "lucide-react";
import LoanDetails from "./LoanDetails.jsx";

// Sample loan data based on approved advances
const initialLoans = [
  {
    id: "LN-2025-001",
    supplierId: "SP-2025-003",
    supplierName: "Sunil Jayawardena",
    totalLoan: 30000,
    duration: 3, // months
    monthlyInstallment: 10000,
    remainingBalance: 20000,
    paidInstallments: 1,
    totalInstallments: 3,
    paymentStatus: "1/3 Paid",
    startDate: "2025-06-10",
    nextPaymentDate: "2025-07-10",
    status: "active",
    route: "Route A",
    repaymentLog: [
      {
        id: 1,
        date: "2025-06-10",
        amount: 10000,
        method: "Cash",
        status: "paid",
        notes: "First installment paid on time",
      },
    ],
  },
  {
    id: "LN-2025-002",
    supplierId: "SP-2025-004",
    supplierName: "Ravi Gunasekara",
    totalLoan: 25000,
    duration: 5,
    monthlyInstallment: 5000,
    remainingBalance: 15000,
    paidInstallments: 2,
    totalInstallments: 5,
    paymentStatus: "2/5 Paid",
    startDate: "2025-05-18",
    nextPaymentDate: "2025-07-18",
    status: "active",
    route: "Route B",
    repaymentLog: [
      {
        id: 1,
        date: "2025-05-18",
        amount: 5000,
        method: "Bank Transfer",
        status: "paid",
        notes: "First installment",
      },
      {
        id: 2,
        date: "2025-06-18",
        amount: 5000,
        method: "Bank Transfer",
        status: "paid",
        notes: "Second installment paid",
      },
    ],
  },
  {
    id: "LN-2025-003",
    supplierId: "SP-2025-006",
    supplierName: "Ajith Bandara",
    totalLoan: 35000,
    duration: 6,
    monthlyInstallment: 5833,
    remainingBalance: 0,
    paidInstallments: 6,
    totalInstallments: 6,
    paymentStatus: "6/6 Paid",
    startDate: "2025-04-15",
    nextPaymentDate: null,
    status: "completed",
    route: "Route C",
    repaymentLog: [
      {
        id: 1,
        date: "2025-04-15",
        amount: 5833,
        method: "Cash",
        status: "paid",
        notes: "First installment",
      },
      {
        id: 2,
        date: "2025-05-15",
        amount: 5833,
        method: "Cash",
        status: "paid",
        notes: "Second installment",
      },
      {
        id: 3,
        date: "2025-06-15",
        amount: 5834,
        method: "Cash",
        status: "paid",
        notes: "Final installment with adjustment",
      },
    ],
  },
  {
    id: "LN-2025-004",
    supplierId: "SP-2025-007",
    supplierName: "Chaminda Rathnayake",
    totalLoan: 45000,
    duration: 4,
    monthlyInstallment: 11250,
    remainingBalance: 33750,
    paidInstallments: 1,
    totalInstallments: 4,
    paymentStatus: "1/4 Paid",
    startDate: "2025-06-01",
    nextPaymentDate: "2025-07-01",
    status: "active",
    route: "Route D",
    repaymentLog: [
      {
        id: 1,
        date: "2025-06-01",
        amount: 11250,
        method: "Bank Transfer",
        status: "paid",
        notes: "Initial payment",
      },
    ],
  },
  {
    id: "LN-2025-005",
    supplierId: "SP-2025-008",
    supplierName: "Malini Wickramasinghe",
    totalLoan: 15000,
    duration: 3,
    monthlyInstallment: 5000,
    remainingBalance: 10000,
    paidInstallments: 1,
    totalInstallments: 3,
    paymentStatus: "1/3 Paid",
    startDate: "2025-06-15",
    nextPaymentDate: "2025-07-15",
    status: "overdue",
    repaymentLog: [
      {
        id: 1,
        date: "2025-06-15",
        amount: 5000,
        method: "Cash",
        status: "paid",
        notes: "First installment",
      },
    ],
  },
  {
    id: "LN-2025-006",
    supplierId: "SP-2025-009",
    supplierName: "Kumara Perera",
    totalLoan: 20000,
    duration: 4,
    monthlyInstallment: 5000,
    remainingBalance: 20000, // Full amount still owed
    paidInstallments: 0,
    totalInstallments: 4,
    paymentStatus: "0/4 Paid",
    requestDate: "2025-06-25", // Pending loan application
    status: "pending",
    route: "Route A",
    repaymentLog: [],
  },
  {
    id: "LN-2025-007",
    supplierId: "SP-2025-010",
    supplierName: "Nimal Fernando",
    totalLoan: 40000,
    duration: 5,
    monthlyInstallment: 8000,
    remainingBalance: 40000,
    paidInstallments: 0,
    totalInstallments: 5,
    paymentStatus: "0/5 Paid",
    requestDate: "2025-06-30", // Pending loan application
    status: "pending",
    route: "Route E",
    repaymentLog: [],
  },
  {
    id: "LN-2025-008",
    supplierId: "SP-2025-011",
    supplierName: "Saman Jayasekara",
    totalLoan: 18000,
    duration: 3,
    monthlyInstallment: 6000,
    remainingBalance: 18000,
    paidInstallments: 0,
    totalInstallments: 3,
    paymentStatus: "0/3 Paid",
    requestDate: "2025-05-15", // Older pending request
    status: "pending",
    route: "Route B",
    repaymentLog: [],
  },
  {
    id: "LN-2024-012",
    supplierId: "SP-2024-015",
    supplierName: "Priyantha Silva",
    totalLoan: 25000,
    duration: 4,
    monthlyInstallment: 6250,
    remainingBalance: 18750, // Still owes most of the loan
    paidInstallments: 1,
    totalInstallments: 4,
    paymentStatus: "1/4 Paid",
    startDate: "2024-12-01",
    nextPaymentDate: "2025-01-01", // Missed multiple payments
    status: "defaulted",
    route: "Route C",
    repaymentLog: [
      {
        id: 1,
        date: "2024-12-01",
        amount: 6250,
        method: "Cash",
        status: "paid",
        notes: "First installment only",
      },
    ],
  },
  {
    id: "LN-2024-013",
    supplierId: "SP-2024-016",
    supplierName: "Wasantha Bandara",
    totalLoan: 30000,
    duration: 6,
    monthlyInstallment: 5000,
    remainingBalance: 25000, // Only paid first installment
    paidInstallments: 1,
    totalInstallments: 6,
    paymentStatus: "1/6 Paid",
    startDate: "2024-11-15",
    nextPaymentDate: "2024-12-15", // Long overdue
    status: "defaulted",
    route: "Route D",
    repaymentLog: [
      {
        id: 1,
        date: "2024-11-15",
        amount: 5000,
        method: "Bank Transfer",
        status: "paid",
        notes: "First installment only, then defaulted",
      },
    ],
  },
];

export default function LoanManagement() {
  const [loans] = useState(initialLoans);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState("active");
  const [filters, setFilters] = useState({
    search: "",
    amountRange: "",
    duration: "",
    year: "",
    route: "",
  });

  // Date selection state - default to current month/year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth()); // 0-based (5 = June)
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Month names for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate available years (current year and previous years)
  const availableYears = Array.from(
    { length: 10 },
    (_, i) => currentDate.getFullYear() - i
  );

  // Generate available months based on selected year
  const getAvailableMonths = (year) => {
    if (year === currentDate.getFullYear()) {
      // For current year, only show months up to current month
      return Array.from({ length: currentDate.getMonth() + 1 }, (_, i) => i);
    } else {
      // For previous years, show all months
      return Array.from({ length: 12 }, (_, i) => i);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearchTerm(value);
    }
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      amountRange: "",
      duration: "",
      year: "",
      route: "",
    });
    setSearchTerm("");
  };

  // Filter data based on current view
  const filterByView = (loans, view) => {
    switch (view) {
      case "pending":
        return loans.filter((loan) => loan.status === "pending");
      case "active":
        return loans.filter((loan) => loan.status === "active");
      case "completed":
        return loans.filter((loan) => loan.status === "completed");
      case "overdue":
        return loans.filter((loan) => loan.status === "overdue");
      case "defaulted":
        return loans.filter((loan) => loan.status === "defaulted");
      default:
        return loans;
    }
  };

  // Filter loans by selected month and year - show loans that have payments due in that month
  const loansBySelectedDate = useMemo(() => {
    return loans.filter((loan) => {
      const loanStartDate = new Date(loan.startDate);

      // For completed loans, check if they had payments during the selected month
      if (loan.status === "completed") {
        // Check if any payment was made during the selected month
        const hasPaymentInMonth = loan.repaymentLog.some((payment) => {
          const paymentDate = new Date(payment.date);
          return (
            paymentDate.getMonth() === selectedMonth &&
            paymentDate.getFullYear() === selectedYear
          );
        });
        return hasPaymentInMonth;
      }

      // For pending loans, check if they were requested during the selected month
      if (loan.status === "pending") {
        const requestDate = new Date(loan.requestDate);
        return (
          requestDate.getMonth() === selectedMonth &&
          requestDate.getFullYear() === selectedYear
        );
      }

      // For active, overdue, and defaulted loans, check if they have a payment due in the selected month
      if (
        loan.status === "active" ||
        loan.status === "overdue" ||
        loan.status === "defaulted"
      ) {
        // Calculate how many months have passed since loan start
        const monthsSinceStart =
          (selectedYear - loanStartDate.getFullYear()) * 12 +
          (selectedMonth - loanStartDate.getMonth());

        // Check if this loan should have a payment in the selected month
        // (loan started before or at the selected month and hasn't exceeded duration)
        return monthsSinceStart >= 0 && monthsSinceStart < loan.duration;
      }

      return false;
    });
  }, [loans, selectedMonth, selectedYear]);

  // Filter and search logic
  const filteredLoans = useMemo(() => {
    let viewFilteredLoans = filterByView(loansBySelectedDate, currentView);

    return viewFilteredLoans.filter((loan) => {
      const matchesSearch =
        loan.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Amount range filter
      let matchesAmount = true;
      if (filters.amountRange) {
        switch (filters.amountRange) {
          case "under10k":
            matchesAmount = loan.totalLoan < 10000;
            break;
          case "10k-50k":
            matchesAmount = loan.totalLoan >= 10000 && loan.totalLoan <= 50000;
            break;
          case "above50k":
            matchesAmount = loan.totalLoan > 50000;
            break;
          default:
            matchesAmount = true;
        }
      }

      // Duration filter
      let matchesDuration = true;
      if (filters.duration) {
        switch (filters.duration) {
          case "short":
            matchesDuration = loan.duration <= 3;
            break;
          case "medium":
            matchesDuration = loan.duration > 3 && loan.duration <= 6;
            break;
          case "long":
            matchesDuration = loan.duration > 6;
            break;
          default:
            matchesDuration = true;
        }
      }

      // Year filter - filter by the year of loan activity (payments due), only for completed loans
      let matchesYear = true;
      if (filters.year) {
        const filterYear = parseInt(filters.year);

        // For completed loans, check if any payment was made in the filter year
        if (loan.status === "completed") {
          const hasPaymentInYear = loan.repaymentLog.some((payment) => {
            const paymentDate = new Date(payment.date);
            return paymentDate.getFullYear() === filterYear;
          });
          matchesYear = hasPaymentInYear;
        }
        // For active and overdue loans, ignore year filter (always match)
        // since these are current loans and year filtering doesn't apply
      }

      // Route filter
      let matchesRoute = true;
      if (filters.route) {
        matchesRoute = loan.route === filters.route;
      }

      return (
        matchesSearch &&
        matchesAmount &&
        matchesDuration &&
        matchesYear &&
        matchesRoute
      );
    });
  }, [loansBySelectedDate, searchTerm, currentView, filters]);

  // Calculate summary statistics
  const loanStats = useMemo(() => {
    const totalLoans = loansBySelectedDate.length;
    const pendingLoans = loansBySelectedDate.filter(
      (loan) => loan.status === "pending"
    ).length;
    const activeLoans = loansBySelectedDate.filter(
      (loan) => loan.status === "active"
    ).length;
    const completedLoans = loansBySelectedDate.filter(
      (loan) => loan.status === "completed"
    ).length;
    const overdueLoans = loansBySelectedDate.filter(
      (loan) => loan.status === "overdue"
    ).length;
    const defaultedLoans = loansBySelectedDate.filter(
      (loan) => loan.status === "defaulted"
    ).length;
    const totalLoanAmount = loansBySelectedDate.reduce(
      (sum, loan) => sum + loan.totalLoan,
      0
    );
    const totalOutstanding = loansBySelectedDate.reduce(
      (sum, loan) => sum + loan.remainingBalance,
      0
    );
    const pendingLoanAmount = loansBySelectedDate
      .filter((loan) => loan.status === "pending")
      .reduce((sum, loan) => sum + loan.totalLoan, 0);
    const activeLoanAmount = loansBySelectedDate
      .filter((loan) => loan.status === "active")
      .reduce((sum, loan) => sum + loan.totalLoan, 0);
    const completedLoanAmount = loansBySelectedDate
      .filter((loan) => loan.status === "completed")
      .reduce((sum, loan) => sum + loan.totalLoan, 0);
    const overdueLoanAmount = loansBySelectedDate
      .filter((loan) => loan.status === "overdue")
      .reduce((sum, loan) => sum + loan.totalLoan, 0);
    const defaultedLoanAmount = loansBySelectedDate
      .filter((loan) => loan.status === "defaulted")
      .reduce((sum, loan) => sum + loan.totalLoan, 0);

    return {
      totalLoans,
      pendingLoans,
      activeLoans,
      completedLoans,
      overdueLoans,
      defaultedLoans,
      totalLoanAmount,
      totalOutstanding,
      pendingLoanAmount,
      activeLoanAmount,
      completedLoanAmount,
      overdueLoanAmount,
      defaultedLoanAmount,
    };
  }, [loansBySelectedDate]);

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedLoan(null);
  };

  // Handle loan approval
  const handleApproveLoan = (loanId, approvalData) => {
    console.log("Approving loan:", {
      loanId,
      originalAmount: selectedLoan?.totalLoan,
      approvedAmount: approvalData.approvedAmount,
      originalDuration: selectedLoan?.duration,
      approvedDuration: approvalData.duration,
      monthlyInstallment: approvalData.monthlyInstallment,
      interestRate: `${approvalData.interestRate}% per month`,
      totalRepayment: approvalData.totalRepayment,
      totalInterest: approvalData.totalInterest,
      calculationMethod: approvalData.calculationMethod,
      approvalNotes: approvalData.approvalNotes,
    });
    // In a real app, this would make an API call to approve the loan with the new terms
    // The approved loan would be moved from pending to active status
    // For now, we'll just log it and go back to the list
  };

  // Handle loan rejection
  const handleRejectLoan = (loanId, reason) => {
    console.log("Rejecting loan:", loanId, "Reason:", reason);
    // In a real app, this would make an API call to reject the loan
    // For now, we'll just log it and go back to the list
  };

  if (showDetails && selectedLoan) {
    return (
      <LoanDetails
        loan={selectedLoan}
        onBack={handleBackToList}
        onApprove={handleApproveLoan}
        onReject={handleRejectLoan}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                Loan Management
              </p>
              <div className="text-xl font-bold text-blue-600 px-4 py-2 rounded-lg">
                {monthNames[selectedMonth]} {selectedYear}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Month:
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                >
                  {getAvailableMonths(selectedYear).map((monthIndex) => (
                    <option key={monthIndex} value={monthIndex}>
                      {monthNames[monthIndex]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Year:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const newYear = parseInt(e.target.value);
                    setSelectedYear(newYear);
                    // If selected year changes and current month is not available, reset to last available month
                    const availableMonths = getAvailableMonths(newYear);
                    if (!availableMonths.includes(selectedMonth)) {
                      setSelectedMonth(
                        availableMonths[availableMonths.length - 1]
                      );
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <button
            onClick={() => setCurrentView("active")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "active" ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Loans
                </p>
                <p className="text-2xl font-bold text-green-600">
                  Rs. {loanStats.activeLoanAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {loanStats.activeLoans} active
                </p>
              </div>
              <div className="h-8 w-8 text-green-600 text-2xl">💰</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("pending")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "pending" ? "ring-2 ring-yellow-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Requests
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  Rs. {loanStats.pendingLoanAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {loanStats.pendingLoans} pending
                </p>
              </div>
              <div className="h-8 w-8 text-yellow-600 text-2xl">⏳</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("completed")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "completed" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed Loans
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  Rs. {loanStats.completedLoanAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {loanStats.completedLoans} completed
                </p>
              </div>
              <div className="h-8 w-8 text-blue-600 text-2xl">✅</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("overdue")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "overdue" ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Overdue Loans
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  Rs. {loanStats.overdueLoanAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {loanStats.overdueLoans} overdue
                </p>
              </div>
              <div className="h-8 w-8 text-orange-600 text-2xl">⚠️</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("defaulted")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "defaulted" ? "ring-2 ring-red-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Defaulted Loans
                </p>
                <p className="text-2xl font-bold text-red-600">
                  Rs. {loanStats.defaultedLoanAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {loanStats.defaultedLoans} defaulted
                </p>
              </div>
              <div className="h-8 w-8 text-red-600 text-2xl">❌</div>
            </div>
          </button>
        </div>

        {/* Enhanced Controls */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-4">
            {/* Search and Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by supplier name or loan ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={searchTerm}
                    onChange={handleFilterChange}
                    name="search"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>

            {/* Enhanced Filters */}
            {showFilters && (
              <div
                className={`grid grid-cols-1 gap-4 p-4 bg-gray-50 rounded-lg ${
                  currentView === "completed"
                    ? "sm:grid-cols-5"
                    : "sm:grid-cols-4"
                }`}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount Range
                  </label>
                  <select
                    name="amountRange"
                    value={filters.amountRange}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">All Amounts</option>
                    <option value="under10k">Under Rs. 10,000</option>
                    <option value="10k-50k">Rs. 10,000 - 50,000</option>
                    <option value="above50k">Above Rs. 50,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={filters.duration}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">All Durations</option>
                    <option value="short">Short Term (≤3 months)</option>
                    <option value="medium">Medium Term (4-6 months)</option>
                    <option value="long">Long Term (&gt;6 months)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route
                  </label>
                  <select
                    name="route"
                    value={filters.route}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">All Routes</option>
                    <option value="Route A">Route A</option>
                    <option value="Route B">Route B</option>
                    <option value="Route C">Route C</option>
                    <option value="Route D">Route D</option>
                    <option value="Route E">Route E</option>
                  </select>
                </div>
                {/* Only show year filter for completed loans */}
                {currentView === "completed" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Year
                    </label>
                    <select
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">All Years</option>
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-30 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-green-600 text-white">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm">
              <div className="text-left">
                {currentView === "pending" ? "Supplier ID" : "Loan ID"}
              </div>
              <div className="text-left">Supplier Name</div>
              <div className="text-left">Total Loan (Rs)</div>
              <div className="text-left">Monthly Installment</div>
              <div className="text-center">View Details</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredLoans.map((loan) => (
              <div
                key={loan.id}
                className="grid grid-cols-5 gap-4 p-3 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="font-semibold text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full inline-block w-fit">
                  {loan.status === "pending" ? loan.supplierId : loan.id}
                </div>
                <div className="font-medium text-gray-900 text-sm">
                  {loan.supplierName}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  Rs. {loan.totalLoan.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  Rs. {loan.monthlyInstallment.toLocaleString()}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleViewDetails(loan)}
                    className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-full transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredLoans.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-lg font-medium">No loans found</p>
                <p className="text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing {filteredLoans.length} of{" "}
            {
              loansBySelectedDate.filter((loan) => {
                if (currentView === "pending") return loan.status === "pending";
                if (currentView === "active") return loan.status === "active";
                if (currentView === "completed")
                  return loan.status === "completed";
                if (currentView === "overdue") return loan.status === "overdue";
                if (currentView === "defaulted")
                  return loan.status === "defaulted";
                return false;
              }).length
            }{" "}
            results
          </div>
        </div>
      </div>
    </div>
  );
}
