import Message from "../models/messageModel.js";

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendMessage = async (req, res) => {
  const { chatId, sender, text } = req.body;

  const message = await Message.create({
    chatId: new mongoose.Types.ObjectId(chatId),
    sender: new mongoose.Types.ObjectId(sender),
    text,
  });

  const populated = await Message.findById(message._id)
    .populate("sender", "name avatar");

  res.json(populated);
};
