import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { 
  Home, Leaf, Package, Settings, Users, Truck, Award, BarChart3, 
  DollarSign, Calendar 
} from 'lucide-react';

const sidebarLinks = {
  SUPPLIER: [
    { name: "Dashboard", path: "/supplier/dashboard", icon: Home },
    { name: "Tea Production", path: "/supplier/production", icon: Leaf },
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
    { name: "Trips", path: "/transportManager/trips", icon: Truck },
    { name: "Emergency", path: "/transportManager/emergency", icon: Award },
  ],
};

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role;

  return (
    <div className="w-62 h-screen bg-green-600 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-green-500">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">TeaFactory</h3>
            <p className="text-green-200 text-sm">Management System</p>
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
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                isActive
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-green-100 hover:bg-green-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <div className="bg-green-500 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="font-semibold text-sm">{user?.username || 'User'}</p>
              <p className="text-green-200 text-xs capitalize">{role?.toLowerCase() || 'Role'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}