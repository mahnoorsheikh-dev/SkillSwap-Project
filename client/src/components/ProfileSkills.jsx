import { useState, useEffect } from "react";
import { Edit3, Save } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL; 

export default function ProfileSkills() {
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [skillsInput, setSkillsInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [selectedType, setSelectedType] = useState("offered"); 

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${API_URL}/api/profile/${userId}`);
        const data = await res.json();
        if (data.user) {
          setSkillsOffered(data.user.skillsOffered || []);
          setSkillsWanted(data.user.skillsWanted || []);
          setIsSaved(true);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    if (userId) fetchSkills();
  }, [userId]);

  const handleSave = async () => {
    if (!skillsInput.trim()) return;

    const skillList = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const body =
        selectedType === "offered"
          ? { skillsOffered: skillList }
          : { skillsWanted: skillList };

      const res = await fetch(`${API_URL}/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        if (selectedType === "offered") setSkillsOffered(skillList);
        else setSkillsWanted(skillList);

        setSkillsInput("");
        setIsSaved(true);
      } else {
        console.error("Failed to save skills");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = () => setIsSaved(false);

  return (
    <div className="px-8 pb-10 border-t border-gray-200">
      <div className="flex justify-between items-center mb-5 mt-5">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        {isSaved ? (
          <button onClick={handleEdit} className="p-2" title="Edit Skills">
            <Edit3 className="w-4 h-4 text-[#1D3557]" />
          </button>
        ) : (
          <button onClick={handleSave} className="p-2" title="Save Skills">
            <Save className="w-4 h-4 text-[#1D3557]" />
          </button>
        )}
      </div>

      {!isSaved && (
        <>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => setSelectedType("offered")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                selectedType === "offered"
                  ? "bg-[#457B9D] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Offered
            </button>
            <button
              onClick={() => setSelectedType("wanted")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                selectedType === "wanted"
                  ? "bg-[#457B9D] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Wanted
            </button>
          </div>

          <textarea
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder={`Enter ${selectedType} skills separated by commas (e.g. React, UI/UX, SEO)`}
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#457B9D]"
            rows="3"
          ></textarea>
        </>
      )}

      {isSaved && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#1D3557] mb-2">
              Offered Skills
            </h3>
            {skillsOffered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skillsOffered.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[rgb(231,249,244)] text-[#457B9D] rounded-lg text-center shadow-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No offered skills yet.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1D3557] mb-2">
              Wanted Skills
            </h3>
            {skillsWanted.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skillsWanted.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[#c9defd] text-[#1D3557] rounded-lg text-center shadow-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No wanted skills yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
