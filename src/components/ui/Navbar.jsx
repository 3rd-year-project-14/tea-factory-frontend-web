import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Bell, Menu } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false); // Close profile when opening notifications
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false); // Close notifications when opening profile
  };

  const closeDropdowns = () => {
    setShowNotifications(false);
    setShowProfile(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-2 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-end space-x-4 ml-auto">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {showNotifications && (
              <NotificationDropdown onClose={closeDropdowns} />
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <UserAvatar name={user?.username} />
              <div className="hidden md:block text-left">
                <p className="font-semibold text-sm text-gray-900">
                  {user?.username || 'John Manager'}
                </p>
                <p className="text-gray-600 text-xs capitalize">
                  {user?.role?.toLowerCase() || 'Supervisor'}
                </p>
              </div>
              {/* Dropdown arrow */}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  showProfile ? 'rotate-180' : ''
                }`}
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
            </button>

            {showProfile && (
              <ProfileDropdown user={user} onClose={closeDropdowns} />
            )}
          </div>
        </div>
      </div>

      {/* Backdrop to close dropdowns when clicking outside */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-10"
          onClick={closeDropdowns}
        />
      )}
    </nav>
  );
};

export default Navbar;