import Profile from "../models/profileModel.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ user: profile });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body || {};

    let profile = await Profile.findOne({ userId });
    if (!profile) profile = new Profile({ userId });

    if (updates.name) profile.name = updates.name;
    if (updates.role) profile.role = updates.role;
    if (updates.email) profile.email = updates.email;
    if (updates.location) profile.location = updates.location;
    if (updates.about) profile.about = updates.about;
    if (updates.skills) {
      profile.skills = Array.isArray(updates.skills)
        ? updates.skills
        : [updates.skills];
    }
    if (updates.skillsOffered) {
  profile.skillsOffered = Array.isArray(updates.skillsOffered)
    ? updates.skillsOffered
    : [updates.skillsOffered];
}

if (updates.skillsWanted) {
  profile.skillsWanted = Array.isArray(updates.skillsWanted)
    ? updates.skillsWanted
    : [updates.skillsWanted];
}


    if (req.file) {
      profile.avatar = `/uploads/${req.file.filename}`;
    }

    await profile.save();
    res.json({ message: "✅ Profile updated successfully", user: profile });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
      ? {
          $or: [
            { skillsOffered: { $regex: search, $options: "i" } },
            { skillsWanted: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const profiles = await Profile.find(query).sort({ createdAt: -1 });
    res.json({ users: profiles });
  } catch (err) {
    console.error("❌ Error fetching all profiles:", err);
    res.status(500).json({ message: "Server error" });
  }
};
