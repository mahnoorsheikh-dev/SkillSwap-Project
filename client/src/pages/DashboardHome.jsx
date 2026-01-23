import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Search, MessageCircle } from "lucide-react";

export default function DashboardHome() {
  const [userName, setUserName] = useState("there");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedId = localStorage.getItem("userId");

    if (storedName) setUserName(storedName);
    if (storedId) setUserId(storedId);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F9FE] px-6 py-10">

      <div className="p-16 rounded-2xl shadow-sm text-white bg-gradient-to-r from-[#1D3557] to-[#457B9D]">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          Hi ! {userName} 
        </h1>
        <p className="text-white/90 mt-3 text-lg">
          You have become a member of <span className="font-semibold">Skill Swap</span>! 
          We hope you gain valuable experience here and make meaningful connections.
        </p>
        <p className="text-white/80 mt-2 italic">
          "The beautiful thing about learning is that no one can take it away from you." – B.B. King
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Search className="text-[#1D3557]" />
            <h2 className="text-xl font-semibold text-[#1D3557]">Find Connections</h2>
          </div>
          <p className="text-gray-600">
            Discover people who match your skills and interests.
          </p>
          <Link
            to="/FindConnection"
            className="mt-4 inline-block text-[#1D3557] font-semibold hover:underline"
          >
            Explore →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="text-[#1D3557]" />
            <h2 className="text-xl font-semibold text-[#1D3557]">Your Chats</h2>
          </div>
          <p className="text-gray-600">
            Continue conversations with the people you’ve connected with.
          </p>
          <Link
            to="/chats"
            className="mt-4 inline-block text-[#1D3557] font-semibold hover:underline"
          >
            Open Chats →
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-10">
        <div className="flex items-center gap-3 mb-3">
          <User className="text-[#1D3557]" />
          <h2 className="text-xl font-semibold text-[#1D3557]">Your Profile</h2>
        </div>
        <p className="text-gray-600">
          Keep your profile updated so others can discover you easily.
        </p>

        <div className="flex gap-4 mt-4">
          <Link
            to={userId ? `/profile/${userId}` : "#"}
            className="px-5 py-2 bg-[#1D3557] text-white rounded-lg shadow-sm"
          >
            View Profile
          </Link>
          <Link
            to={userId ? `/profile/${userId}` : "#"}
            className="px-5 py-2 border border-[#1D3557] text-[#1D3557] rounded-lg"
          >
            Edit Profile
          </Link>
        </div>
      </div>

    </div>
  );
}
