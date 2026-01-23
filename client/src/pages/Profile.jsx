import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInfo from "../components/ProfileInfo";
import ProfileAbout from "../components/ProfileAbout";
import ProfileSkills from "../components/ProfileSkills";
import ProfileStats from "../components/ProfileStats";

export default function Profile() {
  const { userId } = useParams(); 

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <ProfileHeader userId={userId} />
        <ProfileInfo userId={userId} />
        <ProfileAbout userId={userId} />
        <ProfileSkills userId={userId} />
        <ProfileStats />
      </div>
    </div>
  );
}

