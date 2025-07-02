import { useState, useMemo } from "react";
import PaymentHeader from "./PaymentHeader";
import PaymentFilters from "./PaymentFilters";
import RoutesView from "./RoutesView";
import SuppliersView from "./SuppliersView";
import SupplierBillView from "./SupplierBillView";

export default function PaymentManagement() {
  // Navigation state
  const [currentView, setCurrentView] = useState("routes"); // "routes", "suppliers", "bill"
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Month/Year selection state - set to current month/year by default
  const [selectedMonth, setSelectedMonth] = useState(5); // June (0-indexed, so 5 = June)
  const [selectedYear, setSelectedYear] = useState(2025);

  // Payment processing state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentView, setPaymentView] = useState("summary"); // "summary", "bank", "cash"

  // Tea rate information
  const [teaRate] = useState({
    submittedDate: "2025-06-28",
    rates: {
      gradeA: 85.0,
      gradeB: 82.0,
      gradeC: 78.0,
    },
    status: "Approved",
    approvedBy: "Tea Board Authority",
  });

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

  // Available years based on data
  const availableYears = [2024, 2025];

  // Get available months for selected year
  const getAvailableMonths = (year) => {
    if (year === 2025) {
      return Array.from({ length: 6 }, (_, i) => i); // January to June 2025
    } else {
      return Array.from({ length: 12 }, (_, i) => i);
    }
  };

  // Sample route data
  const [routes] = useState([
    {
      id: "R001",
      routeName: "Kandy Route",
      routeNumber: "KD-001",
      totalWeight: 4241.5, // Sum of total weights: SUP001(1250.5) + SUP002(890.2) + SUP003(2100.8)
      totalAmount: 328381.3, // Sum of gross amounts using net weight × rate: 95667.5 + 70105 + 162608.8
      supplierCount: 3, // Actual number of suppliers
      suppliers: ["SUP001", "SUP002", "SUP003"],
    },
    {
      id: "R002",
      routeName: "Matale Route",
      routeNumber: "MT-002",
      totalWeight: 2437.2, // Sum of total weights: SUP004(756.3) + SUP005(1680.9)
      totalAmount: 187741.65, // Sum of gross amounts using net weight × rate: 59901.6 + 127840.05
      supplierCount: 2, // Actual number of suppliers
      suppliers: ["SUP004", "SUP005"],
    },
    {
      id: "R003",
      routeName: "Nuwara Eliya Route",
      routeNumber: "NE-003",
      totalWeight: 0, // No suppliers defined
      totalAmount: 0, // No suppliers defined
      supplierCount: 0, // No suppliers defined
      suppliers: [],
    },
  ]);

  // Sample supplier data with detailed tea leaf entries
  const [suppliers] = useState([
    {
      id: "SUP001",
      supplierName: "John Farmer",
      routeId: "R001",
      totalWeight: 1250.5,
      bagWeight: 62.5, // ~5% of total weight (typical bag weight)
      waterWeight: 37.5, // ~3% of total weight (moisture deduction)
      coarseLeafWeight: 25.0, // ~2% of total weight (quality deduction)
      netWeight: 1250.5 - 62.5 - 37.5 - 25.0, // 1125.5 kg
      ratePerKg: 85.0,
      grossAmount: (1250.5 - 62.5 - 37.5 - 25.0) * 85.0, // Calculate using net weight × rate
      advances: 15000,
      fertilizer: 3500,
      transport: Math.round((1250.5 - 62.5 - 37.5 - 25.0) * 10), // Rs. 10 per kg of net weight
      others: 800,
      totalDeductions:
        15000 + 3500 + Math.round((1250.5 - 62.5 - 37.5 - 25.0) * 10) + 800,
      finalAmount:
        (1250.5 - 62.5 - 37.5 - 25.0) * 85.0 -
        (15000 + 3500 + Math.round((1250.5 - 62.5 - 37.5 - 25.0) * 10) + 800),
      paymentMethod: "Bank",
      status: "Paid",
      paidDate: "2025-06-25",
      paymentDate: "2025-06-30", // Add payment date for filtering
      upcomingPayments: {
        loanInstallment: 12500,
        fertilizerDue: 3200,
      },
      teaLeafEntries: [
        {
          date: "2025-06-01",
          weight: 125.5,
          quality: "A",
          rate: 85.0,
          amount: 10667.5,
        },
        {
          date: "2025-06-03",
          weight: 145.2,
          quality: "A",
          rate: 85.0,
          amount: 12342.0,
        },
        {
          date: "2025-06-05",
          weight: 135.8,
          quality: "B",
          rate: 82.0,
          amount: 11135.6,
        },
        {
          date: "2025-06-07",
          weight: 155.3,
          quality: "A",
          rate: 85.0,
          amount: 13200.5,
        },
        {
          date: "2025-06-10",
          weight: 142.7,
          quality: "A",
          rate: 85.0,
          amount: 12129.5,
        },
        {
          date: "2025-06-12",
          weight: 138.9,
          quality: "B",
          rate: 82.0,
          amount: 11390.8,
        },
        {
          date: "2025-06-15",
          weight: 148.6,
          quality: "A",
          rate: 85.0,
          amount: 12631.0,
        },
        {
          date: "2025-06-18",
          weight: 158.5,
          quality: "A",
          rate: 85.0,
          amount: 13472.5,
        },
        {
          date: "2025-06-20",
          weight: 100.0,
          quality: "C",
          rate: 78.0,
          amount: 7800.0,
        },
      ],
    },
    {
      id: "SUP002",
      supplierName: "Mary Silva",
      routeId: "R001",
      totalWeight: 890.2,
      bagWeight: 44.5, // ~5% of total weight
      waterWeight: 26.7, // ~3% of total weight
      coarseLeafWeight: 17.8, // ~2% of total weight
      netWeight: 890.2 - 44.5 - 26.7 - 17.8, // 801.2 kg
      ratePerKg: 87.5,
      grossAmount: (890.2 - 44.5 - 26.7 - 17.8) * 87.5, // Calculate using net weight × rate
      advances: 8000,
      fertilizer: 2200,
      transport: Math.round((890.2 - 44.5 - 26.7 - 17.8) * 10), // Rs. 10 per kg of net weight
      others: 500,
      totalDeductions:
        8000 + 2200 + Math.round((890.2 - 44.5 - 26.7 - 17.8) * 10) + 500,
      finalAmount:
        (890.2 - 44.5 - 26.7 - 17.8) * 87.5 -
        (8000 + 2200 + Math.round((890.2 - 44.5 - 26.7 - 17.8) * 10) + 500),
      paymentMethod: "Cash",
      status: "Pending",
      paidDate: null,
      paymentDate: "2025-06-30", // Add payment date for filtering
      upcomingPayments: {
        fertilizerDue: 5800,
      },
      teaLeafEntries: [
        {
          date: "2025-06-02",
          weight: 98.5,
          quality: "A",
          rate: 87.5,
          amount: 8618.75,
        },
        {
          date: "2025-06-04",
          weight: 112.3,
          quality: "A",
          rate: 87.5,
          amount: 9826.25,
        },
        {
          date: "2025-06-06",
          weight: 105.8,
          quality: "B",
          rate: 84.0,
          amount: 8887.2,
        },
        {
          date: "2025-06-09",
          weight: 125.4,
          quality: "A",
          rate: 87.5,
          amount: 10972.5,
        },
        {
          date: "2025-06-11",
          weight: 118.7,
          quality: "A",
          rate: 87.5,
          amount: 10386.25,
        },
        {
          date: "2025-06-14",
          weight: 108.9,
          quality: "B",
          rate: 84.0,
          amount: 9147.6,
        },
        {
          date: "2025-06-17",
          weight: 115.2,
          quality: "A",
          rate: 87.5,
          amount: 10080.0,
        },
        {
          date: "2025-06-19",
          weight: 105.4,
          quality: "A",
          rate: 87.5,
          amount: 9222.5,
        },
      ],
    },
    {
      id: "SUP003",
      supplierName: "David Perera",
      routeId: "R001",
      totalWeight: 2100.8,
      bagWeight: 105.0, // ~5% of total weight
      waterWeight: 63.0, // ~3% of total weight
      coarseLeafWeight: 42.0, // ~2% of total weight
      netWeight: 2100.8 - 105.0 - 63.0 - 42.0, // 1890.8 kg
      ratePerKg: 86.0,
      grossAmount: (2100.8 - 105.0 - 63.0 - 42.0) * 86.0, // Calculate using net weight × rate
      advances: 25000,
      fertilizer: 5500,
      transport: Math.round((2100.8 - 105.0 - 63.0 - 42.0) * 10), // Rs. 10 per kg of net weight
      others: 1200,
      totalDeductions:
        25000 + 5500 + Math.round((2100.8 - 105.0 - 63.0 - 42.0) * 10) + 1200,
      finalAmount:
        (2100.8 - 105.0 - 63.0 - 42.0) * 86.0 -
        (25000 + 5500 + Math.round((2100.8 - 105.0 - 63.0 - 42.0) * 10) + 1200),
      paymentMethod: "Bank",
      status: "Pending",
      paidDate: null,
      upcomingPayments: {
        loanInstallment: 18500,
        fertilizerDue: 7200,
      },
      teaLeafEntries: [
        {
          date: "2025-06-01",
          weight: 185.2,
          quality: "A",
          rate: 86.0,
          amount: 15927.2,
        },
        {
          date: "2025-06-03",
          weight: 198.5,
          quality: "A",
          rate: 86.0,
          amount: 17071.0,
        },
        {
          date: "2025-06-05",
          weight: 175.8,
          quality: "B",
          rate: 83.0,
          amount: 14591.4,
        },
        {
          date: "2025-06-08",
          weight: 205.3,
          quality: "A",
          rate: 86.0,
          amount: 17655.8,
        },
        {
          date: "2025-06-10",
          weight: 188.7,
          quality: "A",
          rate: 86.0,
          amount: 16228.2,
        },
        {
          date: "2025-06-12",
          weight: 195.4,
          quality: "A",
          rate: 86.0,
          amount: 16804.4,
        },
        {
          date: "2025-06-15",
          weight: 182.9,
          quality: "B",
          rate: 83.0,
          amount: 15180.7,
        },
        {
          date: "2025-06-17",
          weight: 201.6,
          quality: "A",
          rate: 86.0,
          amount: 17337.6,
        },
        {
          date: "2025-06-20",
          weight: 167.4,
          quality: "A",
          rate: 86.0,
          amount: 14396.4,
        },
      ],
    },
    {
      id: "SUP004",
      supplierName: "Sarah Fernando",
      routeId: "R002",
      totalWeight: 756.3,
      bagWeight: 37.8, // ~5% of total weight
      waterWeight: 22.7, // ~3% of total weight
      coarseLeafWeight: 15.1, // ~2% of total weight
      netWeight: 756.3 - 37.8 - 22.7 - 15.1, // 680.7 kg
      ratePerKg: 88.0,
      grossAmount: (756.3 - 37.8 - 22.7 - 15.1) * 88.0, // Calculate using net weight × rate
      advances: 12000,
      fertilizer: 1800,
      transport: Math.round((756.3 - 37.8 - 22.7 - 15.1) * 10), // Rs. 10 per kg of net weight
      others: 300,
      totalDeductions:
        12000 + 1800 + Math.round((756.3 - 37.8 - 22.7 - 15.1) * 10) + 300,
      finalAmount:
        (756.3 - 37.8 - 22.7 - 15.1) * 88.0 -
        (12000 + 1800 + Math.round((756.3 - 37.8 - 22.7 - 15.1) * 10) + 300),
      paymentMethod: "Cash",
      status: "Paid",
      paidDate: "2025-06-26",
      paymentDate: "2025-06-30", // Add payment date for filtering
      teaLeafEntries: [
        {
          date: "2025-06-02",
          weight: 85.4,
          quality: "A",
          rate: 88.0,
          amount: 7515.2,
        },
        {
          date: "2025-06-04",
          weight: 92.8,
          quality: "A",
          rate: 88.0,
          amount: 8166.4,
        },
        {
          date: "2025-06-07",
          weight: 88.2,
          quality: "A",
          rate: 88.0,
          amount: 7761.6,
        },
        {
          date: "2025-06-09",
          weight: 95.6,
          quality: "A",
          rate: 88.0,
          amount: 8412.8,
        },
        {
          date: "2025-06-12",
          weight: 89.7,
          quality: "B",
          rate: 85.0,
          amount: 7624.5,
        },
        {
          date: "2025-06-14",
          weight: 91.3,
          quality: "A",
          rate: 88.0,
          amount: 8034.4,
        },
        {
          date: "2025-06-16",
          weight: 87.9,
          quality: "A",
          rate: 88.0,
          amount: 7735.2,
        },
        {
          date: "2025-06-19",
          weight: 94.2,
          quality: "A",
          rate: 88.0,
          amount: 8289.6,
        },
        {
          date: "2025-06-21",
          weight: 86.2,
          quality: "B",
          rate: 85.0,
          amount: 7327.0,
        },
      ],
    },
    {
      id: "SUP005",
      supplierName: "Michael Jayasinghe",
      routeId: "R002",
      totalWeight: 1680.9,
      bagWeight: 84.0, // ~5% of total weight
      waterWeight: 50.4, // ~3% of total weight
      coarseLeafWeight: 33.6, // ~2% of total weight
      netWeight: 1680.9 - 84.0 - 50.4 - 33.6, // 1512.9 kg
      ratePerKg: 84.5,
      grossAmount: (1680.9 - 84.0 - 50.4 - 33.6) * 84.5, // Calculate using net weight × rate
      advances: 20000,
      fertilizer: 4200,
      transport: Math.round((1680.9 - 84.0 - 50.4 - 33.6) * 10), // Rs. 10 per kg of net weight
      others: 600,
      totalDeductions:
        20000 + 4200 + Math.round((1680.9 - 84.0 - 50.4 - 33.6) * 10) + 600,
      finalAmount:
        (1680.9 - 84.0 - 50.4 - 33.6) * 84.5 -
        (20000 + 4200 + Math.round((1680.9 - 84.0 - 50.4 - 33.6) * 10) + 600),
      paymentMethod: "Bank",
      status: "Pending",
      paidDate: null,
      paymentDate: "2025-06-30", // Add payment date for filtering
      teaLeafEntries: [
        {
          date: "2025-06-01",
          weight: 152.3,
          quality: "A",
          rate: 84.5,
          amount: 12869.35,
        },
        {
          date: "2025-06-03",
          weight: 165.8,
          quality: "A",
          rate: 84.5,
          amount: 14010.1,
        },
        {
          date: "2025-06-06",
          weight: 148.7,
          quality: "B",
          rate: 81.0,
          amount: 12044.7,
        },
        {
          date: "2025-06-08",
          weight: 172.4,
          quality: "A",
          rate: 84.5,
          amount: 14567.8,
        },
        {
          date: "2025-06-11",
          weight: 159.6,
          quality: "A",
          rate: 84.5,
          amount: 13486.2,
        },
        {
          date: "2025-06-13",
          weight: 168.2,
          quality: "A",
          rate: 84.5,
          amount: 14212.9,
        },
        {
          date: "2025-06-16",
          weight: 155.9,
          quality: "B",
          rate: 81.0,
          amount: 12627.9,
        },
        {
          date: "2025-06-18",
          weight: 174.8,
          quality: "A",
          rate: 84.5,
          amount: 14770.6,
        },
        {
          date: "2025-06-21",
          weight: 163.2,
          quality: "A",
          rate: 84.5,
          amount: 13790.4,
        },
      ],
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    sortOrder: "",
    status: "All",
    paymentMethod: "All",
  });

  // Filter data based on current view, filters, and selected month/year
  const filteredData = useMemo(() => {
    // Get current data based on view
    let data = [];
    if (currentView === "routes") {
      data = routes;
    } else if (currentView === "suppliers" && selectedRoute) {
      data = suppliers.filter(
        (supplier) => supplier.routeId === selectedRoute.id
      );
    } else if (currentView === "bill" && selectedSupplier) {
      data = selectedSupplier;
    }

    // Apply date filtering based on selected month/year
    if (currentView === "suppliers") {
      data = data.filter((supplier) => {
        if (supplier.paymentDate) {
          const paymentDate = new Date(supplier.paymentDate);
          return (
            paymentDate.getMonth() === selectedMonth &&
            paymentDate.getFullYear() === selectedYear
          );
        }
        return true; // Include suppliers without payment date for now
      });
    }

    // Apply filters
    let filteredResult = [];
    if (currentView === "routes") {
      filteredResult = data.filter(
        (route) =>
          filters.search === "" ||
          route.routeName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          route.routeNumber.toLowerCase().includes(filters.search.toLowerCase())
      );
    } else if (currentView === "suppliers") {
      filteredResult = data.filter((supplier) => {
        const matchesStatus =
          filters.status === "All" || supplier.status === filters.status;
        const matchesPaymentMethod =
          filters.paymentMethod === "All" ||
          supplier.paymentMethod === filters.paymentMethod;
        const matchesSearch =
          filters.search === "" ||
          supplier.supplierName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          supplier.id.toLowerCase().includes(filters.search.toLowerCase());

        return matchesStatus && matchesPaymentMethod && matchesSearch;
      });
    } else {
      filteredResult = data;
    }

    // Apply sorting
    if (filters.sortOrder && currentView === "suppliers") {
      filteredResult = [...filteredResult].sort((a, b) => {
        if (filters.sortOrder === "high") {
          return b.finalAmount - a.finalAmount; // High to low
        } else if (filters.sortOrder === "low") {
          return a.finalAmount - b.finalAmount; // Low to high
        }
        return 0;
      });
    } else if (filters.sortOrder && currentView === "routes") {
      filteredResult = [...filteredResult].sort((a, b) => {
        if (filters.sortOrder === "high") {
          return b.totalAmount - a.totalAmount; // High to low
        } else if (filters.sortOrder === "low") {
          return a.totalAmount - b.totalAmount; // Low to high
        }
        return 0;
      });
    }

    return filteredResult;
  }, [
    currentView,
    selectedRoute,
    selectedSupplier,
    filters,
    routes,
    suppliers,
    selectedMonth,
    selectedYear,
  ]);

  // Get current data based on view (for filter summary)
  const getCurrentData = () => {
    if (currentView === "routes") {
      return routes;
    } else if (currentView === "suppliers" && selectedRoute) {
      return suppliers.filter(
        (supplier) => supplier.routeId === selectedRoute.id
      );
    } else if (currentView === "bill" && selectedSupplier) {
      return selectedSupplier;
    }
    return [];
  };

  // Calculate summary statistics based on current view
  const summary = useMemo(() => {
    if (currentView === "routes") {
      const total = filteredData.reduce(
        (acc, route) => acc + route.totalAmount,
        0
      );
      const routeCount = filteredData.length;
      const supplierCount = filteredData.reduce(
        (acc, route) => acc + route.supplierCount,
        0
      );
      const totalWeight = filteredData.reduce(
        (acc, route) => acc + route.totalWeight,
        0
      );

      return {
        total,
        routeCount,
        supplierCount,
        totalWeight,
        paid: 0,
        pending: 0,
        bankPayments: 0,
        cashPayments: 0,
      };
    } else if (currentView === "suppliers") {
      const total = filteredData.reduce(
        (acc, supplier) => acc + supplier.finalAmount,
        0
      );
      const totalWeight = filteredData.reduce(
        (acc, supplier) => acc + supplier.totalWeight,
        0
      );
      const paid = filteredData
        .filter((s) => s.status === "Paid")
        .reduce((acc, s) => acc + s.finalAmount, 0);
      const pending = filteredData
        .filter((s) => s.status === "Pending")
        .reduce((acc, s) => acc + s.finalAmount, 0);
      const bankPayments = filteredData.filter(
        (s) => s.paymentMethod === "Bank"
      ).length;
      const cashPayments = filteredData.filter(
        (s) => s.paymentMethod === "Cash"
      ).length;

      return { total, totalWeight, paid, pending, bankPayments, cashPayments };
    }
    return { total: 0, paid: 0, pending: 0, bankPayments: 0, cashPayments: 0 };
  }, [currentView, filteredData]);

  // Payment processing functions
  const openPaymentModal = () => {
    setShowPaymentModal(true);
    setPaymentView("summary");
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentTypeToggle = (type) => {
    setPaymentView(type);
  };

  // Calculate payment statistics for all routes
  const getPaymentStatistics = () => {
    const allSuppliers = suppliers.filter((supplier) => {
      if (supplier.paymentDate) {
        const paymentDate = new Date(supplier.paymentDate);
        return (
          paymentDate.getMonth() === selectedMonth &&
          paymentDate.getFullYear() === selectedYear
        );
      }
      return true;
    });

    const totalAmount = allSuppliers.reduce(
      (sum, supplier) => sum + supplier.finalAmount,
      0
    );
    const bankPayments = allSuppliers.filter((s) => s.paymentMethod === "Bank");
    const cashPayments = allSuppliers.filter((s) => s.paymentMethod === "Cash");

    const bankAmount = bankPayments.reduce(
      (sum, supplier) => sum + supplier.finalAmount,
      0
    );
    const cashAmount = cashPayments.reduce(
      (sum, supplier) => sum + supplier.finalAmount,
      0
    );

    // Group bank payments by route
    const bankPaymentsByRoute = routes
      .map((route) => {
        const routeBankPayments = bankPayments.filter(
          (s) => s.routeId === route.id
        );
        return {
          ...route,
          suppliers: routeBankPayments,
          totalAmount: routeBankPayments.reduce(
            (sum, s) => sum + s.finalAmount,
            0
          ),
          supplierCount: routeBankPayments.length,
        };
      })
      .filter((route) => route.suppliers.length > 0);

    // Group cash payments by route
    const cashPaymentsByRoute = routes
      .map((route) => {
        const routeCashPayments = cashPayments.filter(
          (s) => s.routeId === route.id
        );
        return {
          ...route,
          suppliers: routeCashPayments,
          totalAmount: routeCashPayments.reduce(
            (sum, s) => sum + s.finalAmount,
            0
          ),
          supplierCount: routeCashPayments.length,
        };
      })
      .filter((route) => route.suppliers.length > 0);

    return {
      totalAmount,
      bankAmount,
      cashAmount,
      bankPayments: bankPayments.length,
      cashPayments: cashPayments.length,
      bankPaymentsByRoute,
      cashPaymentsByRoute,
    };
  };

  // Navigation functions
  const viewRoute = (route) => {
    setSelectedRoute(route);
    setCurrentView("suppliers");
    setFilters({
      search: "",
      sortOrder: "",
      status: "All",
      paymentMethod: "All",
    }); // Reset filters
  };

  const viewSupplierBill = (supplier) => {
    setSelectedSupplier(supplier);
    setCurrentView("bill");
  };

  const handleGoBack = (targetView) => {
    if (targetView === "routes") {
      setCurrentView("routes");
      setSelectedRoute(null);
      setFilters({
        search: "",
        sortOrder: "",
        status: "All",
        paymentMethod: "All",
      });
    } else if (targetView === "suppliers") {
      setCurrentView("suppliers");
      setSelectedSupplier(null);
    }
  };

  const downloadCSV = () => {
    if (currentView !== "suppliers") return;

    const bankPayments = filteredData.filter((s) => s.paymentMethod === "Bank");

    const csvHeaders = [
      "Supplier ID",
      "Supplier Name",
      "Account Number",
      "Bank",
      "Branch",
      "Amount",
      "Reference",
    ];

    const csvData = bankPayments.map((supplier) => [
      supplier.id,
      supplier.supplierName,
      "ACC" + supplier.id.slice(-3) + "001", // Mock account number
      "Commercial Bank",
      "Main Branch",
      supplier.finalAmount.toFixed(2),
      `Payment for Tea Leaves - ${supplier.id}`,
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bank_payments_${selectedRoute?.routeNumber || "route"}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      sortOrder: "",
      status: "All",
      paymentMethod: "All",
    });
  };

  const renderSummaryCards = () => {
    if (currentView === "routes") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Total Weight Card */}
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-orange-500">
            <div className="text-orange-600 text-sm font-medium">
              Total Weight
            </div>
            <div className="text-2xl font-bold text-[#2c2c2c]">
              {summary.totalWeight?.toFixed(1) || "0.0"} kg
            </div>
            <div className="text-xs text-[#666] mt-1">
              {summary.routeCount || 0} routes • {summary.supplierCount || 0}{" "}
              suppliers
            </div>
          </div>

          {/* Total Amount Card */}
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="text-green-600 text-sm font-medium">
              Total Amount
            </div>
            <div className="text-2xl font-bold text-[#2c2c2c]">
              Rs. {summary.total?.toLocaleString() || "0"}
            </div>
            <div className="text-xs text-[#666] mt-1">
              {summary.routeCount || 0} routes • {summary.supplierCount || 0}{" "}
              suppliers
            </div>
          </div>
        </div>
      );
    } else if (currentView === "suppliers") {
      const cards = [
        {
          label: "Total Weight",
          value: `${summary.totalWeight?.toFixed(1) || "0.0"} kg`,
          colorClass: "text-orange-600 border-orange-500",
        },
        {
          label: "Total Amount",
          value: `Rs. ${summary.total?.toLocaleString() || "0"}`,
          colorClass: "text-blue-600 border-blue-500",
        },
        {
          label: "Paid",
          value: `Rs. ${summary.paid?.toLocaleString() || "0"}`,
          colorClass: "text-green-600 border-green-500",
        },
        {
          label: "Pending",
          value: `Rs. ${summary.pending?.toLocaleString() || "0"}`,
          colorClass: "text-orange-600 border-orange-500",
        },
      ];

      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-xl shadow-md border-l-4 ${
                card.colorClass.split(" ")[1]
              }`}
            >
              <div
                className={`${
                  card.colorClass.split(" ")[0]
                } text-sm font-medium`}
              >
                {card.label}
              </div>
              <div className="text-2xl font-bold text-[#2c2c2c]">
                {card.value}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderMainContent = () => {
    if (currentView === "routes") {
      return (
        <RoutesView
          filteredData={filteredData}
          summary={summary}
          getCurrentData={getCurrentData}
          onViewRoute={viewRoute}
        />
      );
    } else if (currentView === "suppliers") {
      return (
        <SuppliersView
          filteredData={filteredData}
          summary={summary}
          getCurrentData={getCurrentData}
          onViewSupplierBill={viewSupplierBill}
          onDownloadCSV={downloadCSV}
        />
      );
    } else if (currentView === "bill") {
      return (
        <SupplierBillView
          selectedSupplier={selectedSupplier}
          selectedRoute={selectedRoute}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          monthNames={monthNames}
        />
      );
    }
    return null;
  };

  // Payment Modal Component
  const PaymentModal = () => {
    if (!showPaymentModal) return null;

    const stats = getPaymentStatistics();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="bg-green-600 text-white p-6 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Payment Processing</h2>
                <p className="text-green-100 mt-1">
                  {monthNames[selectedMonth]} {selectedYear} - Tea Leaf Payments
                </p>
              </div>
              <button
                onClick={closePaymentModal}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Tea Rate Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                Submitted Tea Rate
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-600">
                    <span className="font-medium">Submission Date:</span>{" "}
                    {teaRate.submittedDate}
                  </p>
                  <p className="text-sm text-blue-600">
                    <span className="font-medium">Status:</span>{" "}
                    {teaRate.status}
                  </p>
                  <p className="text-sm text-blue-600">
                    <span className="font-medium">Approved By:</span>{" "}
                    {teaRate.approvedBy}
                  </p>
                </div>
                <div>
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

                  <div
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handlePaymentTypeToggle("bank")}
                  >
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

                  <div
                    className="bg-orange-50 border border-orange-200 rounded-lg p-4 cursor-pointer hover:bg-orange-100 transition-colors"
                    onClick={() => handlePaymentTypeToggle("cash")}
                  >
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

            {paymentView === "bank" && (
              <div>
                {/* Bank Payments Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-blue-800">
                    Bank Payments by Route
                  </h3>
                  <button
                    onClick={() => setPaymentView("summary")}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ← Back to Summary
                  </button>
                </div>

                {/* Route-wise Bank Payments */}
                <div className="space-y-4">
                  {stats.bankPaymentsByRoute.map((route) => (
                    <div
                      key={route.id}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-blue-800">
                          {route.routeName} ({route.routeNumber})
                        </h4>
                        <div className="text-blue-600">
                          <span className="font-medium">
                            Total: Rs. {route.totalAmount.toLocaleString()}
                          </span>
                          <span className="text-sm ml-2">
                            ({route.supplierCount} suppliers)
                          </span>
                        </div>
                      </div>

                      <div className="bg-white rounded border overflow-hidden">
                        <div className="bg-blue-100 grid grid-cols-4 gap-4 p-3 font-medium text-sm text-blue-800">
                          <div>Supplier Name</div>
                          <div>Supplier ID</div>
                          <div className="text-right">Amount</div>
                          <div>Status</div>
                        </div>
                        {route.suppliers.map((supplier) => (
                          <div
                            key={supplier.id}
                            className="grid grid-cols-4 gap-4 p-3 border-t text-sm"
                          >
                            <div className="font-medium">
                              {supplier.supplierName}
                            </div>
                            <div className="text-blue-600">{supplier.id}</div>
                            <div className="text-right font-medium">
                              Rs. {supplier.finalAmount.toLocaleString()}
                            </div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  supplier.status === "Paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-orange-100 text-orange-800"
                                }`}
                              >
                                {supplier.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paymentView === "cash" && (
              <div>
                {/* Cash Payments Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-orange-800">
                    Cash Payments by Route
                  </h3>
                  <button
                    onClick={() => setPaymentView("summary")}
                    className="text-orange-600 hover:text-orange-800 font-medium"
                  >
                    ← Back to Summary
                  </button>
                </div>

                {/* Route-wise Cash Payments */}
                <div className="space-y-4">
                  {stats.cashPaymentsByRoute.map((route) => (
                    <div
                      key={route.id}
                      className="bg-orange-50 border border-orange-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-orange-800">
                          {route.routeName} ({route.routeNumber})
                        </h4>
                        <div className="text-orange-600">
                          <span className="font-medium">
                            Total: Rs. {route.totalAmount.toLocaleString()}
                          </span>
                          <span className="text-sm ml-2">
                            ({route.supplierCount} suppliers)
                          </span>
                        </div>
                      </div>

                      <div className="bg-white rounded border overflow-hidden">
                        <div className="bg-orange-100 grid grid-cols-4 gap-4 p-3 font-medium text-sm text-orange-800">
                          <div>Supplier Name</div>
                          <div>Supplier ID</div>
                          <div className="text-right">Amount</div>
                          <div>Status</div>
                        </div>
                        {route.suppliers.map((supplier) => (
                          <div
                            key={supplier.id}
                            className="grid grid-cols-4 gap-4 p-3 border-t text-sm"
                          >
                            <div className="font-medium">
                              {supplier.supplierName}
                            </div>
                            <div className="text-orange-600">{supplier.id}</div>
                            <div className="text-right font-medium">
                              Rs. {supplier.finalAmount.toLocaleString()}
                            </div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  supplier.status === "Paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-orange-100 text-orange-800"
                                }`}
                              >
                                {supplier.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-content flex-1 bg-[#f8f9fa] overflow-y-auto text-black">
      <PaymentHeader
        currentView={currentView}
        selectedRoute={selectedRoute}
        selectedSupplier={selectedSupplier}
        onGoBack={handleGoBack}
        onDownloadCSV={downloadCSV}
        onProceedPayments={openPaymentModal}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        monthNames={monthNames}
        availableYears={availableYears}
        getAvailableMonths={getAvailableMonths}
      />
      <div className="dashboard-content p-6">
        {/* Summary Cards - show before filters for routes and suppliers views */}
        {currentView !== "bill" && renderSummaryCards()}

        {/* Filters - show after summary cards */}
        {currentView !== "bill" && (
          <PaymentFilters
            filters={filters}
            setFilters={setFilters}
            currentView={currentView}
            filteredData={filteredData}
            getCurrentData={getCurrentData}
            onClearFilters={clearFilters}
          />
        )}

        {/* Main Content */}
        {renderMainContent()}

        {/* Payment Modal - always render this at the end */}
        <PaymentModal />
      </div>
    </div>
  );
}
