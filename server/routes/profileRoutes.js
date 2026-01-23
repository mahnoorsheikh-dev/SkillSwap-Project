import express from "express";
import {
  getProfile,
  updateProfile,
  getAllProfiles,
} from "../controllers/profileController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:userId", getProfile);
router.put("/:userId", upload.single("avatar"), updateProfile);

export default router;
