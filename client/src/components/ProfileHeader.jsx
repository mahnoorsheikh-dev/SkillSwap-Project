import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ProfileHeader({ userId }) {
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        if (response.data?.user?.avatar) {
          setAvatar(`http://localhost:5000${response.data.user.avatar}`);
        }
      } catch (error) {
        console.log("Error fetching avatar:", error);
      }
    };
    fetchAvatar();
  }, [userId]);


  const handleImageClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.put(`http://localhost:5000/api/profile/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.user?.avatar) {
        setAvatar(`http://localhost:5000${res.data.user.avatar}`);
        console.log("✅ Avatar updated successfully");
      }
    } catch (error) {
      console.error("❌ Error uploading avatar:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[rgb(222,233,240)] relative">
      <img
        src={avatar || "https://via.placeholder.com/150"}
        alt="User Avatar"
        className="w-40 h-40 rounded-full border-4 border-white shadow-md object-cover mt-6 cursor-pointer hover:opacity-80 transition"
        onClick={handleImageClick}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
