import express from "express";
import { createChat, getUserChats } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", createChat);

router.get("/:userId", getUserChats);

export default router;
