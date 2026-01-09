import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaCoins } from "react-icons/fa";
import Footer from "../Footer";
import Navbar from "../Navbar";

const UserProfileCard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function handleUserDetails() {
      const user_id = localStorage.getItem("user_id");
      const res = await api.get(
        `${import.meta.env.VITE_BASE_URL}/user/Get-Profile?user_id=${user_id}`
      );
      const data = res.data;
      console.log({ data });
      setUser(data);
    }
    handleUserDetails();
  }, []);

  return (
    <div className="">
      <Navbar />
    <div className="w-full h-full bg-gradient-to-b from-green-100 to-white py-12 pb-26 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200 p-6 relative">
        {/* Avatar */}
        <div className="flex justify-center -mt-20 mb-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.user_name || "User Name HERE"}
          </h2>
          <p className="text-sm text-gray-500">{user.email || "email@email.com"}</p>
        </div>

        {/* Details */}
        <div className="space-y-6 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>User Role</span>
            <span className="bg-amber-200 text-amber-700 rounded-full px-3 py-0.5 text-xs font-medium">
              {user.role || "USER"}
            </span>
          </div>
          <hr />

          <div className="flex justify-between">
            <span>Account Created</span>
            <span className="font-medium text-gray-800">
              {user.joined_at || "Date Here"}
            </span>
          </div>
          <hr />

          <div className="flex justify-between">
            <span>Total Points Collected</span>
            <span className="font-medium text-gray-800">
              <FaCoins className="text-amber-300 inline mr-1" />
              {user.total_points || "0"}
            </span>
          </div>
          <hr />

          <div className="flex justify-between">
            <span>Points On Current Wallet</span>
            <span className="font-medium text-gray-800">
              <FaCoins className="text-amber-300 inline mr-1" />
              {user.current_points || "0"}
            </span>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <button className="text-red-500 font-bold text-lg italic hover:underline">
            Log Out
          </button>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default UserProfileCard;
