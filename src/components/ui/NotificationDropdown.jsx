import { CheckCircle, AlertCircle, Info, Clock, Bell } from 'lucide-react';

const NotificationDropdown = ({ onClose }) => {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Production Target Met',
      message: 'Daily tea production target of 500kg achieved',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Inventory Alert',
      message: 'Tea leaf inventory below 50kg threshold',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'Equipment maintenance scheduled for tomorrow',
      time: '3 hours ago',
      unread: false
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const markAsRead = (id) => {
    // Handle mark as read functionality
    console.log(`Mark notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // Handle mark all as read functionality
    console.log('Mark all notifications as read');
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            onClick={markAllAsRead}
            className="text-sm text-green-700 hover:text-green-800"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-full overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="py-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 hover:bg-green-50 cursor-pointer border-l-4 ${
                  notification.unread
                    ? 'bg-green-50 border-l-green-600'
                    : 'border-l-transparent'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">
                    {notification.title}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center mt-2">
                    <Clock className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                    {notification.unread && (
                      <span className="ml-2 w-2 h-2 bg-green-600 rounded-full"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={onClose}
          className="w-full text-center text-green-600 hover:text-green-800 text-sm font-medium"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;