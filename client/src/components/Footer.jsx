import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <footer className="bg-[#1D3557] text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold mb-4">SkillSwap</h2>
          <p className="text-gray-300 text-sm">
            A platform where people connect, share, and learn new skills together.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/" className="hover:text-[#a8dadc]">Home</Link></li>
            <li>
              {userId ? (
                <Link to={`/profile/${userId}`} className="hover:text-[#a8dadc]">Profile</Link>
              ) : (
                <Link to="/auth" className="hover:text-[#a8dadc]">Profile</Link>
              )}
            </li>
            <li><Link to="/FindConnection" className="hover:text-[#a8dadc]">Find Connection</Link></li>
            <li><Link to="/chats" className="hover:text-[#a8dadc]">Chats</Link></li>
            {!userId && (
              <li><Link to="/auth" className="hover:text-[#a8dadc]">Login / Signup</Link></li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#a8dadc]"><Facebook /></a>
            <a href="#" className="hover:text-[#a8dadc]"><Twitter /></a>
            <a href="#" className="hover:text-[#a8dadc]"><Linkedin /></a>
            <a href="#" className="hover:text-[#a8dadc]"><Github /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
}
