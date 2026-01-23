import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return console.log("No userId found in localStorage.");

        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        const data = response.data;

        if (data?.user) {
          setFormData({
            name: data.user.name || "",
            role: data.user.role || "",
            email: data.user.email || "",
            location: data.user.location || "",
          });
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("User not found. Please log in again.");

      await axios.put(`http://localhost:5000/api/profile/${userId}`, formData);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(" Failed to update profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center text-center px-6 py-6 bg-[rgb(222,233,240)]">

{!formData.name ?( 
  <h1 className="text-2xl font-bold text-[#1D3557] uppercase tracking-wide">Full Name </h1> 
  ) : null} 
  <h1 className="text-4xl font-bold text-[#1D3557]">{formData.name}</h1> 

{!formData.role ?(
   <h3 className="text-gray-600 text-lg mt-1 uppercase tracking-wide" > Role </h3>
   ) : null}
   <h3 className="text-gray-600 text-lg mt-1">{formData.role}</h3>

      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 px-6 py-2 bg-[#457B9D] hover:bg-[#1D3557] text-white rounded-lg shadow-md transition"
      >
        Edit Profile
      </button>

      <hr className="w-[80%] border-gray-300 my-8" />

      <div className="flex justify-around items-center w-full max-w-3xl text-gray-700">

       <div className="text-center">
          <p className="font-light text-[#1D3557]">Email</p>
          <p className="font-medium">{formData.email}</p>
        </div>

        <div className="text-center">
          <p className="font-light text-[#1D3557]">Location</p>
          <p className="font-medium">{formData.location}</p>
        </div>

      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />


              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#457B9D] text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
