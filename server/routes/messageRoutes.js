import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:chatId", getMessages);

router.post("/", sendMessage);

export default router;
