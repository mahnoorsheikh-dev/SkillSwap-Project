import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setUserId(localStorage.getItem("userId"));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
    setIsOpen(false);
    navigate("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".account-dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#1D3557] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate(userId ? "/dashboard" : "/")}
      >
        SkillSwap
      </h1>

      <div className="flex items-center gap-16">
        <Link to={userId ? "/dashboard" : "/"} className="hover:text-[#A8DADC]">
          Home
        </Link>

        <Link to="/FindConnection" className="hover:text-[#A8DADC]">
          Find Connection
        </Link>
        <Link to="/chats" className="hover:text-[#A8DADC]">
          Chats
        </Link>

        {!userId ? (
          <Link to="/auth" className="hover:text-[#A8DADC]">
            Login / Signup
          </Link>
        ) : (
          <div className="relative account-dropdown">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-[#A8DADC] focus:outline-none"
            >
              Account
            </button>

            {isOpen && (
              <div className="absolute flex flex-col right-0 bg-white text-[#1D3557] mt-2 rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50">
                <Link
                  to={`/profile/${userId}`}
                  className="px-4 py-2 hover:bg-[#A8DADC] hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left px-4 py-2 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
