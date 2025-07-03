import { User, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileDropdown = ({ user, onClose }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      action: () => {
        // Navigate to profile page
        console.log('Navigate to profile');
        onClose();
      }
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => {
        // Navigate to settings page
        console.log('Navigate to settings');
        onClose();
      }
    },
    {
      icon: Shield,
      label: 'Privacy',
      action: () => {
        // Navigate to privacy page
        console.log('Navigate to privacy');
        onClose();
      }
    }
  ];

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
      {/* User Info Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {user?.username?.charAt(0).toUpperCase() || 'J'}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {user?.username || 'John Manager'}
            </p>
            <p className="text-gray-600 text-sm capitalize">
              {user?.role?.toLowerCase() || 'Supervisor'}
            </p>
            <p className="text-gray-500 text-xs">
              {user?.email || 'john.manager@teafactory.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <item.icon className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;