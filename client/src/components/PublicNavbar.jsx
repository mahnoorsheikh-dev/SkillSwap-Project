import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="bg-[#1D3557] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">SkillSwap</h1>

      <div className="flex items-center gap-10">
        <Link to="/" className="hover:text-[#A8DADC]">Home</Link>
        <Link to="/auth" className="hover:text-[#A8DADC]">Login / Signup</Link>
      </div>
    </nav>
  );
}
