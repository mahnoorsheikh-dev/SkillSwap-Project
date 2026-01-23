import HomeHero from "../components/HomeHero";
import HomeFeatures from "../components/HomeFeatures";
import HomePopularSkills from "../components/HomePopularSkills";
import HomeCallToAction from "../components/HomeCallToAction";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-[#212529] p-8 space-y-6">
      <HomeHero />
      <HomeFeatures />
      <HomePopularSkills />
      <HomeCallToAction />
    </div>
  );
}
