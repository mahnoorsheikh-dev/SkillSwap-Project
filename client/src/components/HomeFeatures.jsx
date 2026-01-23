import { Search, ArrowLeftRight, MessageSquare, Users } from "lucide-react";

export default function HomeFeatures() {
  const features = [
    {
      title: "Find Connections",
      description:
        "Search for people who want to teach or learn skills, and connect instantly.",
      icon: <Search className="w-14 h-14 text-[#1D3557]" />,
    },
    {
      title: "Swap Skills",
      description:
        "Teach what you know and learn what you don’t — a free exchange of knowledge.",
      icon: <ArrowLeftRight className="w-14 h-14 text-[#1D3557]" />,
    },
    {
      title: "Chat & Collaborate",
      description:
        "Use our built-in chat to share knowledge, resources, and ideas.",
      icon: <MessageSquare className="w-14 h-14 text-[#1D3557]" />,
    },
    {
      title: "Grow Together",
      description:
        "Build a global network of learners and experts across different fields.",
      icon: <Users className="w-14 h-14 text-[#1D3557]" />,
    },
  ];

  return (
    <div className="bg-gray-100 pt-10 pb-20 px-8 text-center mt-7">
  <h2 className="text-5xl font-bold text-[#1D3557] mb-10">
    Features
  </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center hover:scale-105 transition-transform min-h-[280px]"
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold text-[#1D3557] mb-3 mt-6">
              {feature.title}
            </h3>
            <p className="text-[#212529] text-base leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
