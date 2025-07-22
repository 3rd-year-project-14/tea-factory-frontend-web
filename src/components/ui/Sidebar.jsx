// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import {
//   Home,
//   Leaf,
//   Package,
//   Settings,
//   Users,
//   Truck,
//   Award,
//   BarChart3,
//   DollarSign,
//   Calendar,
//   Route,
//   BadgeAlert,
//   ListCheck,
//   UserCheck,
//   FileBarChart,
//   Bell,
// } from "lucide-react";


// const sidebarLinks = {
//   SUPPLIER: [
//     { name: "Dashboard", path: "/supplier/dashboard", icon: Home },
//     { name: "Tea Production", path: "/supplier/production", icon: Leaf },
//     { name: "Inventory", path: "/supplier/inventory", icon: Package },
//     { name: "Processing", path: "/supplier/processing", icon: Settings },
//   ],


//   DRIVER: [
//     { name: "Dashboard", path: "/driver/dashboard", icon: Home },
//     { name: "Trips", path: "/driver/trips", icon: Truck },
//     { name: "Emergency", path: "/driver/emergency", icon: Award },
//   ],


//   TRANSPORT_MANAGER: [
//     { name: "Dashboard", path: "/transportManager/dashboard", icon: Home },
//     { name: "Vehicle", path: "/transportManager/vehicle", icon: Truck },
//     { name: "Route", path: "/transportManager/routeList", icon: Route },
//     {
//       name: "Route Planner",
//       path: "/transportManager/routePlan",
//       icon: ListCheck,
//     },
//     {
//       name: "Emergency",
//       path: "/transportManager/emergency",
//       icon: BadgeAlert,
//     },
//   ],


//   INVENTORY_MANAGER: [
//     { name: "Dashboard", path: "/inventoryManager/Dashboard", icon: Home },
//     { name: "Leaf Weight", path: "/inventoryManager/leaf_weight", icon: Truck },
//     {name: "Bag Weight",path: "/inventoryManager/empty_bags_weight",icon: Package,},
//     { name: "History", path: "/inventoryManager/history", icon: Award },
//     { name: "Report", path: "/inventoryManager/report", icon: Users },
//     { name: "CRUD", path: "/inventoryManager/crud", icon: Users },
//   ],


//   FERTILIZER_MANAGER: [
//     { name: "Dashboard", path: "/fertilizerManager/Dashboard", icon: Home },
//     { name: "Stock", path: "/fertilizerManager/stock", icon: Truck },
//     { name: "Request", path: "/fertilizerManager/request", icon: Package },
//     { name: "History", path: "/fertilizerManager/history", icon: Award },
//     { name: "Report", path: "/fertilizerManager/report", icon: Users },
//   ],


//   FACTORY_MANAGER: [
//     { name: "Dashboard", path: "/factoryManager/dashboard", icon: Home },
//     { name: "Suppliers", path: "/factoryManager/suppliers", icon: Users },
//     { name: "Routes", path: "/factoryManager/routes", icon: Route },
//     { name: "Inventory", path: "/factoryManager/inventory", icon: Package },
//     { name: "Drivers", path: "/factoryManager/drivers", icon: Users },
//   ],


//   PAYMENT_MANAGER: [
//     { name: "Dashboard", path: "/paymentManager/dashboard", icon: Home },
//     { name: "Advance", path: "/paymentManager/advance", icon: DollarSign },
//     { name: "Loans", path: "/paymentManager/loans", icon: BarChart3 },
//     { name: "Payments", path: "/paymentManager/payments", icon: DollarSign },
//     { name: "Tea Rate", path: "/paymentManager/teaRate", icon: Leaf },
//   ],


//   OWNER: [
//     { name: "Dashboard", path: "/owner/Dashboard", icon: Home },
//     { name: "Annoucement", path: "/owner/annoucement", icon: Bell },
//     { name: "Payments", path: "/owner/payments", icon: DollarSign },
//     { name: "manager works", path: "/owner/managers", icon: UserCheck },
//     { name: "Tea Rate", path: "/owner/teaRate", icon: Leaf },
//     { name: "Reports", path: "/owner/reports", icon: FileBarChart },
//   ],
// };


// export default function Sidebar() {
//   const { user } = useAuth();
//   const location = useLocation();
//   const role = user?.role;


//   return (
//     <div className="w-62 h-screen bg-emerald-800 text-white flex flex-col">
//       {/* Header */}
//       <div className="p-6 border-b border-green-500">
//         <div className="flex items-center space-x-3">
//           <div className="bg-white p-2 rounded-lg">
//             <Leaf className="w-6 h-6 text-green-600" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold">TeaFactory</h3>
//             <p className="text-green-200 text-sm">Management System</p>
//           </div>
//         </div>
//       </div>


//       {/* Menu Items */}
//       <nav className="flex-1 mt-6 px-4">
//         {sidebarLinks[role]?.map((link) => {
//           const Icon = link.icon;
//           const isActive = location.pathname === link.path;


//           return (
//             <Link
//               key={link.name}
//               to={link.path}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
//                 isActive
//                   ? "bg-emerald-700 text-white shadow-lg"
//                   : "text-green-100 hover:bg-emerald-900 hover:text-white"
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               <span className="font-medium">{link.name}</span>
//             </Link>
//           );
//         })}
//       </nav>


//       {/* User Profile */}
//       {/* <div className="p-4">
//         <div className="bg-emerald-900 rounded-lg p-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center">
//               <span className="text-white font-semibold text-sm">
//                 {user?.username?.charAt(0).toUpperCase() || "U"}
//               </span>
//             </div>
//             <div>
//               <p className="font-semibold text-sm">
//                 {user?.username || "User"}
//               </p>
//               <p className="text-green-200 text-xs capitalize">
//                 {role?.toLowerCase() || "Role"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Home,
  Package,
  Settings,
  Users,
  Truck,
  Award,
  BarChart3,
  DollarSign,
  Route,
  BadgeAlert,
  ListCheck,
  UserCheck,
  FileBarChart,
  Bell,
} from "lucide-react";


// Custom Accent Green
const ACCENT_COLOR = "#165e52";


// For your project logo, adjust the src path to match your assets location.
// Example: "/assets/logo.png"
const LOGO_SRC = "/assets/logo.png";


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
    { name: "Route Planner", path: "/transportManager/routePlan", icon: ListCheck },
    { name: "Emergency", path: "/transportManager/emergency", icon: BadgeAlert },
  ],
  INVENTORY_MANAGER: [
    { name: "Dashboard", path: "/inventoryManager/Dashboard", icon: Home },
    { name: "Leaf Weight", path: "/inventoryManager/leaf_weight", icon: Truck },

    {
      name: "Bag Weight",
      path: "/inventoryManager/empty_bags_weight",
      icon: Package,
    },

    { name: "History", path: "/inventoryManager/history", icon: Award },
    { name: "Report", path: "/inventoryManager/report", icon: Users },
    { name: "CRUD", path: "/inventoryManager/crud", icon: Users },
  ],
  FERTILIZER_MANAGER: [
    { name: "Dashboard", path: "/fertilizerManager/Dashboard", icon: Home },
    { name: "Stock", path: "/fertilizerManager/stock", icon: Truck },
    { name: "Request", path: "/fertilizerManager/request", icon: Package },
    { name: "History", path: "/fertilizerManager/history", icon: Award },
    { name: "Report", path: "/fertilizerManager/report", icon: Users },
  ],
  FACTORY_MANAGER: [
    { name: "Dashboard", path: "/factoryManager/dashboard", icon: Home },
    { name: "Suppliers", path: "/factoryManager/suppliers", icon: Users },
    { name: "Routes", path: "/factoryManager/routes", icon: Route },
    { name: "Inventory", path: "/factoryManager/inventory", icon: Package },
    { name: "Drivers", path: "/factoryManager/drivers", icon: Users },
  ],
  PAYMENT_MANAGER: [
    { name: "Dashboard", path: "/paymentManager/dashboard", icon: Home },
    { name: "Advance", path: "/paymentManager/advance", icon: DollarSign },
    { name: "Loans", path: "/paymentManager/loans", icon: BarChart3 },
    { name: "Payments", path: "/paymentManager/payments", icon: DollarSign },
    { name: "Tea Rate", path: "/paymentManager/teaRate", icon: Package },
  ],
  OWNER: [
    { name: "Dashboard", path: "/owner/Dashboard", icon: Home },
    { name: "Annoucement", path: "/owner/annoucement", icon: Bell },
    { name: "Payments", path: "/owner/payments", icon: DollarSign },
    { name: "manager works", path: "/owner/managers", icon: UserCheck },
    { name: "Tea Rate", path: "/owner/teaRate", icon: Package },
    { name: "Reports", path: "/owner/reports", icon: FileBarChart },
  ],
};


export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role;


  return (
    <div className="w-62 h-screen text-white flex flex-col" style={{ backgroundColor: ACCENT_COLOR }}>
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: "#104137" }}>
        <div className="flex items-center space-x-3">
          {/* Use your logo image instead of Leaf icon */}
         <div className="bg-white rounded-lg flex items-center justify-center w-12 h-12">
  <img
    src={LOGO_SRC}
    alt="PureLeaf Logo"
    className="w-9 h-9 object-contain"
  />
</div>


          <div>
            <h3 className="text-xl font-bold">PureLeaf</h3>
            <p className="text-sm" style={{ color: "#cde7de" }}>
              Tea Factory  System
            </p>
          </div>
        </div>
      </div>


      {/* Menu Items */}
      <nav className="flex-1 mt-6 px-4">
        {sidebarLinks[role]?.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;


          return (
            <Link
              key={link.name}
              to={link.path}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 font-medium transition-all duration-200 ${
                isActive
                  ? "shadow-lg text-white"
                  : "text-white/70 hover:bg-[#104137] hover:text-white"
              }`}
              style={{
                backgroundColor: isActive ? "#104137" : "transparent",
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}



