import { useAuth } from "../../contexts/AuthContext";
import { Search, Bell, Menu } from "lucide-react";
import NotificationBell from "./NotificationBell";
import UserAvatar from "./useravatar";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-2">
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Tea Factory Dashboard</h3>
            <p className="text-gray-600 text-sm">Welcome back, manage your tea production</p>
          </div>
        </div> */}

        <div className="flex items-center justify-end space-x-4 ml-auto">
          {/* Notifications */}
          <div className="relative">
            <NotificationBell />
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <UserAvatar name={user?.username} />
            <div className="hidden md:block">
              <p className="font-semibold text-sm text-gray-900">
                {user?.username || "John Manager"}
              </p>
              <p className="text-gray-600 text-xs capitalize">
                {user?.role?.toLowerCase() || "Supervisor"}
              </p>
            </div>
            {/* Dropdown arrow */}
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
