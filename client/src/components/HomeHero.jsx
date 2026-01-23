import { useNavigate } from "react-router-dom";

export default function HomeHero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth"); 
  };

  return (
    <div className="bg-gradient-to-r from-[#1D3557] to-[#457B9D] shadow-lg rounded-2xl p-10 text-center min-h-[500px] flex flex-col justify-center mb-0">
      <h2 className="text-5xl font-bold pb-4 text-white">
        Welcome to SkillSwap
      </h2>
      <h5 className="text-white mt-2 text-center max-w-2xl mx-auto pb-2">
        SkillSwap is a platform where people connect to teach what they know and learn what they don't—for free.
        Whether it's coding, design, music, or language exchange, you can find someone to swap skills with, build connections, and grow together.
      </h5>
      <button
        onClick={handleGetStarted}
        className="mt-6 bg-[#f1faee] hover:bg-[#e9ecef] text-[#1D3557] font-bold py-3 px-8 rounded-2xl text-lg transition-colors mx-auto"
      >
        Get Started
      </button>
    </div>
  );
}
