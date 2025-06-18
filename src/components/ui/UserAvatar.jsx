// import { useAuth } from "../../contexts/AuthContext";

// export default function UserAvatar({ name }) {
//   const { logout } = useAuth();

//   return (
//     <div className="relative group cursor-pointer">
//       <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center uppercase font-bold">
//         {name?.charAt(0)}
//       </div>
//       <div className="hidden group-hover:block absolute right-0 bg-white shadow-md mt-2 rounded text-sm p-2">
//         <button onClick={logout} className="hover:underline text-red-600">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
export default function UserAvatar({ name }) {
  const getInitials = (name) => {
    if (!name) return 'JM'; // Default fallback
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    }
    return name.charAt(0).toUpperCase() + (name.charAt(1) || '').toUpperCase();
  };

  return (
    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
      <span className="text-white font-semibold text-sm">
        {getInitials(name)}
      </span>
    </div>
  );
}