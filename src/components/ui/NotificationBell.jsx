// import { useState } from "react";
// import NotificationBox from "./NotificationBox";

// export default function NotificationBell() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="relative">
//       <button onClick={() => setOpen(!open)} className="relative">
//         🔔
//         <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
//       </button>
//       {open && <NotificationBox />}
//     </div>
//   );
// }


// ============================================
// import { Bell } from 'lucide-react';
// import { useState } from 'react';

// export default function NotificationBell() {
//   const [notificationCount] = useState(3); // Dynamic later

//   return (
//     <div className="relative">
//       <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
//         {/* ✅ Colorful Bell */}
//         <Bell className="w-5 h-5 text-yellow-400" />

//         {/* 🔴 Notification Badge */}
//         {notificationCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
//             {notificationCount > 9 ? '9+' : notificationCount}
//           </span>
//         )}
//       </button>
//     </div>
//   );
// }

import { Bell } from 'lucide-react';

const NotificationBell = ({ onClick, hasNotifications = true, notificationCount = 3 }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
    >
      <Bell className="w-5 h-5" />
      {hasNotifications && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
