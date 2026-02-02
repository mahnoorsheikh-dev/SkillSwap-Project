import { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, MoreVertical } from "lucide-react";
import ChatMessage from "./ChatMessage";
import socket from "../socket";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ChatWindow({ selectedContact }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const userId = localStorage.getItem("userId");
  const endRef = useRef(null);

  const chatId = selectedContact?.chatId || null;

  useEffect(() => {
    if (!chatId) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/messages/${chatId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    loadMessages();
    socket.emit("join_chat", chatId);
  }, [chatId]);

  useEffect(() => {
    const handleIncoming = (msg) => {
      if (msg.chatId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive_message", handleIncoming);
    return () => socket.off("receive_message", handleIncoming);
  }, [chatId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedContact) {
    return (
      <div className="w-2/3 flex items-center justify-center text-gray-400">
        Select a chat
      </div>
    );
  }

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const msgData = {
      chatId,
      sender: userId,
      text: newMsg,
    };

    try {
      const res = await axios.post(`${API_URL}/api/messages`, msgData);
      socket.emit("send_message", res.data);
      setMessages((prev) => [...prev, res.data]);
      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="w-2/3 flex flex-col">
      <div className="flex items-center justify-between border-b p-4 bg-[#fdfdfd]">
        <div className="flex items-center gap-3">
          <img
            src={
              selectedContact.avatar
                ? `${API_URL}/uploads/${selectedContact.avatar}`
                : "https://via.placeholder.com/150"
            }
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h2 className="font-bold text-[#1D3557]">{selectedContact.name}</h2>
            <p className="text-sm text-green-500">● Active Now</p>
          </div>
        </div>

        <div className="flex gap-5 text-gray-600">
          <Phone />
          <Video />
          <MoreVertical />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            text={msg.text}
            sender={msg.sender}
            avatar={
              msg.sender?._id === userId
                ? "https://via.placeholder.com/40/457B9D"
                : selectedContact.avatar
                ? `${API_URL}/uploads/${selectedContact.avatar}`
                : "https://via.placeholder.com/40"
            }
            isOwn={msg.sender?._id === userId} 
          />
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t bg-[#fafafa] flex gap-3">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 border rounded-full"
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-[#457B9D] text-white rounded-full"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}
