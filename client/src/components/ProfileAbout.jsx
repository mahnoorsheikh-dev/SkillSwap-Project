import { useState, useEffect } from "react";
import { Save, Edit3 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileAbout({ userId: propUserId }) {
  const [about, setAbout] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const userId = propUserId || localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchAbout = async () => {
      try {
        const res = await fetch(`${API_URL}/api/profile/${userId}`);
        const data = await res.json();

        if (data?.user?.about) {
          setAbout(data.user.about);
          setIsSaved(true);
        }
      } catch (err) {
        console.error(" Error fetching about:", err);
      }
    };

    fetchAbout();
  }, [userId]);

  const handleSave = async () => {
    if (!about.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/profile/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ about }),
      });

      if (res.ok) {
        setIsSaved(true);
        console.log(" About saved successfully");
      } else {
        console.error("Failed to save about");
      }
    } catch (err) {
      console.error("Error saving about:", err);
    }
  };

  return (
    <div className="px-8 py-6 border-t border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800">About</h2>

        {isSaved ? (
          <button
            onClick={() => setIsSaved(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-black"
          >
            <Edit3 className="w-4 h-4" />
          
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-2 text-sm text-black"
          >
            <Save className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isSaved ? (
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell the world who you are, your journey, and your passion!"
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="4"
        />
      ) : (
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {about || "No about info added yet."}
        </p>
      )}
    </div>
  );
}
