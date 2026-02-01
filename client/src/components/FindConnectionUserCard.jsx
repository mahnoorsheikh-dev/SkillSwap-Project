import React from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function FindConnectionUserCard({ user }) {
  const handleConnect = async () => {
    const loggedInUser = localStorage.getItem("userId");

    if (loggedInUser === user._id) {
      alert("You cannot connect with yourself!");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/chats`, {
        user1: loggedInUser,
        user2: user._id,
      });

      alert("Chat Created!");
    } catch (error) {
      console.log(error);
      alert("Failed to create chat!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
      <img
        src={user.avatar ? `${API_URL}${user.avatar}` : "https://via.placeholder.com/150"}
        alt={user.name}
        className="w-20 h-20 rounded-full mb-4 object-cover"
      />

      <h2 className="text-xl font-semibold text-[#1D3557]">{user.name}</h2>

      <button
        onClick={handleConnect}
        className="mt-4 bg-[#457B9D] text-white px-5 py-2 rounded-xl hover:bg-[#1D3557] transition"
      >
        Connect
      </button>
    </div>
  );
}
