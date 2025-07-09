import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "./UserAvatar";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <UserAvatar name={user?.username} size="xl" className="mb-4" />
        <h1 className="text-2xl font-bold text-emerald-800 mb-2">{user?.username || "User"}</h1>
        <p className="text-gray-600 mb-4 capitalize">{user?.role || "Role"}</p>
        <div className="w-full border-t border-gray-200 my-4" />
        <div className="w-full space-y-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Email:</span>
            <span>{user?.email || "-"}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Role:</span>
            <span className="capitalize">{user?.role || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
