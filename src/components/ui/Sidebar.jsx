import {
  Award,
  BadgeAlert,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Home,
  ListCheck,
  Package,
  Route,
  Settings,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LOGO_SRC = "/assets/logo2.png";

const sidebarLinks = {
  SUPPLIER: [
    { name: "Dashboard", path: "/supplier/dashboard", icon: Home },
    { name: "Tea Production", path: "/supplier/production", icon: Package },
    { name: "Inventory", path: "/supplier/inventory", icon: Package },
    { name: "Processing", path: "/supplier/processing", icon: Settings },
  ],
  DRIVER: [
    { name: "Dashboard", path: "/driver/dashboard", icon: Home },
    { name: "Trips", path: "/driver/trips", icon: Truck },
    { name: "Emergency", path: "/driver/emergency", icon: Award },
  ],
  TRANSPORT_MANAGER: [
    { name: "Dashboard", path: "/transportManager/dashboard", icon: Home },
    { name: "Drivers", path: "/transportManager/drivers", icon: Users },
    { name: "Vehicle", path: "/transportManager/vehicle", icon: Truck },
    { name: "Route", path: "/transportManager/routeList", icon: Route },
    {
      name: "Announcements",
      path: "/transportManager/announcements",
      icon: Bell,
    },
    {
      name: "Route Planner",
      path: "/transportManager/routePlan",
      icon: ListCheck,
    },
    {
      name: "Emergency",
      path: "/transportManager/emergency",
      icon: BadgeAlert,
    },
  ],
  INVENTORY_MANAGER: [
    { name: "Dashboard", path: "/inventoryManager/Dashboard", icon: Home },
    { name: "Leaf Weight", path: "/inventoryManager/leaf_weight", icon: Truck },
    {
      name: "Bag Weight",
      path: "/inventoryManager/empty_bags_weight",
      icon: Package,
    },
    {
      name: "Announcements",
      path: "/inventoryManager/announcements",
      icon: Bell,
    },
    { name: "History", path: "/inventoryManager/history", icon: Award },
  ],
  FERTILIZER_MANAGER: [
    { name: "Dashboard", path: "/fertilizerManager/Dashboard", icon: Home },
    { name: "Stock", path: "/fertilizerManager/stocks", icon: Truck },
    { name: "Request", path: "/fertilizerManager/request", icon: Package },
    {
      name: "Announcements",
      path: "/fertilizerManager/announcements",
      icon: Bell,
    },
    { name: "Report", path: "/fertilizerManager/report", icon: Users },
  ],
  FACTORY_MANAGER: [
    { name: "Dashboard", path: "/factoryManager/dashboard", icon: Home },
    { name: "Fertilizers", path: "/factoryManager/fertilizers", icon: Package },
    { name: "Suppliers", path: "/factoryManager/suppliers", icon: Users },
    {
      name: "Announcements",
      path: "/factoryManager/announcements",
      icon: Bell,
    },
    { name: "Inventory", path: "/factoryManager/inventory", icon: Package },
    {
      name: "Payments",
      icon: DollarSign,
      children: [
        {
          name: "Payments",
          path: "/factoryManager/payment/payments",
          icon: DollarSign,
        },
        {
          name: "Tea Rate",
          path: "/factoryManager/payment/teaRate",
          icon: Package,
        },
        {
          name: "Advance",
          path: "/factoryManager/payment/advance",
          icon: DollarSign,
        },
        {
          name: "Loans",
          path: "/factoryManager/payment/loans",
          icon: BarChart3,
        },
      ],
    },
  ],
  OWNER: [
    { name: "Dashboard", path: "/owner/Dashboard", icon: Home },
    { name: "Annoucement", path: "/owner/annoucement", icon: Bell },
    { name: "Loan Rates", path: "/owner/loan-rates", icon: BarChart3 },
    { name: "Payments", path: "/owner/payments", icon: DollarSign },
    { name: "manager works", path: "/owner/managers", icon: UserCheck },
    { name: "Tea Rate", path: "/owner/teaRate", icon: Package },
    {
      name: "Fertilizer Company",
      path: "/owner/fertilizer-company",
      icon: Package,
    },
    { name: "Reports", path: "/owner/reports", icon: BarChart3 },
  ],
};

export default function Sidebar({ collapsed = false, onToggle }) {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role;
  const [paymentsOpen, setPaymentsOpen] = React.useState(false);

  const linksToShow = sidebarLinks[role];

  return (
    <div
      className={`h-screen bg-tea-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-white rounded-xl flex items-center justify-center w-10 h-10 shrink-0 shadow-soft">
            <img
              src={LOGO_SRC}
              alt="PureLeaf Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
          {!collapsed && (
            <div className="whitespace-nowrap">
              <h3 className="text-lg font-heading font-bold leading-tight">
                PureLeaf
              </h3>
              <p className="text-xs text-tea-100/60">Tea Factory System</p>
            </div>
          )}
        </div>
      </div>

      {onToggle && (
        <button
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className={`mx-4 mt-3 flex items-center gap-2 rounded-xl py-2 text-tea-100/60 hover:bg-white/10 hover:text-white transition-colors duration-200 ${
            collapsed ? "justify-center" : "justify-center px-3"
          }`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs font-medium">Collapse</span>}
        </button>
      )}

      {/* Menu Items */}
      <nav className="flex-1 mt-4 px-3 overflow-y-auto custom-scrollbar space-y-1">
        {linksToShow?.map((link) => {
          if (role === "FACTORY_MANAGER" && link.name === "Payments") {
            return (
              <div key={link.name}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    paymentsOpen
                      ? "bg-gradient-to-r from-tea-600 to-tea-500 text-white shadow-soft"
                      : "text-tea-100/70 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setPaymentsOpen((open) => !open)}
                >
                  <link.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <>
                      <span>{link.name}</span>
                      <ChevronDown
                        size={16}
                        className={`ml-auto transition-transform duration-200 ${
                          paymentsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                {paymentsOpen && !collapsed && (
                  <div className="ml-5 mt-1 border-l border-white/10 pl-2 space-y-1">
                    {link.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isActive = location.pathname === child.path;
                      return (
                        <Link
                          key={child.name}
                          to={child.path}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-tea-100/60 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <ChildIcon className="w-4 h-4 shrink-0" />
                          <span>{child.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.name}
              to={link.path}
              title={collapsed ? link.name : undefined}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-tea-600 to-tea-500 text-white shadow-soft"
                  : "text-tea-100/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
