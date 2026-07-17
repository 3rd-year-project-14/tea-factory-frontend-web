import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Bell, Menu, Search } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

const Navbar = ({ onMenuClick }) => {
  const date = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };
  const todayDate = date();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };

  const closeDropdowns = () => {
    setShowNotifications(false);
    setShowProfile(false);
  };

  return (
    <nav className="bg-card dark:bg-card-dark border-b border-tea-100 dark:border-card-border-dark px-6 py-3 shadow-soft relative font-sans">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg text-ink/60 dark:text-muted-dark hover:bg-tea-50 dark:hover:bg-white/5 transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          )}
          <div className="flex flex-col items-start">
            <span className="text-2xl font-heading font-bold text-ink dark:text-ink-dark tracking-tight">
              {user?.factoryName || "Factory Name"}
            </span>
            <span className="text-xs text-ink/50 dark:text-muted-dark font-normal">
              {todayDate}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-sm relative">
          <Search
            size={16}
            className="absolute left-3 text-ink/40 dark:text-muted-dark"
          />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-surface dark:bg-white/5 border border-tea-100 dark:border-card-border-dark text-ink dark:text-ink-dark placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-tea-500/40"
          />
        </div>

        <div className="flex items-center space-x-3 ml-auto">
          <ThemeToggle />

          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2 text-ink/70 dark:text-muted-dark hover:text-tea-700 dark:hover:text-tea-200 hover:bg-tea-50 dark:hover:bg-white/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-tea-500/20"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            {showNotifications && (
              <NotificationDropdown onClose={closeDropdowns} />
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tea-50 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-tea-500/20"
            >
              <UserAvatar name={user?.username} />
              <div className="hidden md:block text-left">
                <p className="font-semibold text-sm text-ink dark:text-ink-dark leading-tight">
                  {user?.name || ""}
                </p>
                <p className="text-ink/50 dark:text-muted-dark text-xs capitalize font-medium">
                  {user?.role?.toLowerCase() || "Supervisor"}
                </p>
              </div>
              <svg
                className={`w-4 h-4 text-ink/40 dark:text-muted-dark ml-1 transition-transform ${
                  showProfile ? "rotate-180" : ""
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

      {(showNotifications || showProfile) && (
        <div className="fixed inset-0 z-10" onClick={closeDropdowns} />
      )}
    </nav>
  );
};

export default Navbar;
