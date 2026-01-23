import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, default: "" },
    email: { type: String, required: true },
    role: { type: String, default: "" },
    location: { type: String, default: "" },
    about: { type: String, default: "" },
    avatar: { type: String, default: "https://via.placeholder.com/150" },
    skillsOffered: [{ type: String }],
    skillsWanted: [{ type: String }],

    stats: {
      connections: { type: Number, default: 0 },
      projects: { type: Number, default: 0 },
      swaps: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
