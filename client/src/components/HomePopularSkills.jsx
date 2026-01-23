import { Code, Palette, Music, Languages, Briefcase, Camera, BookOpen, Cpu } from "lucide-react";

export default function HomePopularSkills() {
  const skills = [
    { name: "Programming", icon: <Code className="w-10 h-10 text-[#1D3557]" /> },
    { name: "Design", icon: <Palette className="w-10 h-10 text-[#1D3557]" /> },
    { name: "Music", icon: <Music className="w-10 h-10 text-[#1D3557]" /> },
    { name: "Languages", icon: <Languages className="w-10 h-10 text-[#1D3557]" /> },
    { name: "Business", icon: <Briefcase className="w-10 h-10 text-[#1D3557]" /> },
    { name: "Photography", icon: <Camera className="w-10 h-10 text-[#1D3557]" /> },
    { name: "Writing", icon: <BookOpen className="w-10 h-10 text-[#1D3557]" /> },
    { name: "Tech & AI", icon: <Cpu className="w-10 h-10 text-[#1D3557]" /> },
  ];

  return (
    <div className="bg-gray-100 pt-7 pb-12 px-8 text-center mt-1">
  <h2 className="text-5xl font-bold text-[#1D3557] mb-10">
    Catagories
  </h2>


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            {skill.icon}
            <p className="mt-3 text-lg font-semibold text-[#1D3557]">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
