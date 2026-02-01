import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Chats() {
  const location = useLocation();
  const [selectedContact, setSelectedContact] = useState(null);
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);

    const loadChats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/chats/${id}`);
        setChats(res.data);

        if (!selectedContact && res.data.length > 0) {
          const otherUser = res.data[0].users.find(u => u._id !== id);
          setSelectedContact({
            chatId: res.data[0]._id,
            _id: otherUser._id,
            name: otherUser.name,
            avatar: otherUser.avatar,
          });
        }
      } catch (err) {
        console.error("Failed to load chats:", err);
      }
    };

    loadChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    if (location.state?.selectedContact) {
      setSelectedContact(location.state.selectedContact);
    }
  }, [location.state]);

  const reloadChats = async () => {
    const id = localStorage.getItem("userId");
    try {
      const res = await axios.get(`${API_URL}/api/chats/${id}`);
      setChats(res.data);
    } catch (err) {
      console.error("Failed to reload chats:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 font-inter">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex h-[85vh] border">
        <ChatSidebar
          chats={chats}
          selectContact={setSelectedContact}
          userId={userId}
        />
        <ChatWindow
          selectedContact={selectedContact}
          reloadChats={reloadChats}
        />
      </div>
    </div>
  );
}
